---

	{
		"title": "第二十章",
		"ctime": "2019-01-08 00:03:00",
		"mtime": "2019-01-08 00:03:00"
	}

---

# 第二十章

***

## 动态编程

在前面的 19 章中，我们介绍了 Ruby 语言的大量特性。我们还没有详细研究过的一件事就是 Ruby 的“动态编程”（dynamic programming）功能。

如果你只使用了非动态语言（比如 C 或 Pascal 系列中的一种语言），那么编程中的动态可能需要一点时间来习惯。在进一步讨论之前，让我们用“动态”语言来澄清我的意思。事实上，这个定义有点模糊，并不是所有声称“动态”的语言拥有所有相同的特征。然而，在一般意义上，提供一些可以在运行时修改程序的手段的语言可以被认为是动态的。动态语言的另一个特征是它能够改变给定变量的类型 - 这是我们在本书的例子中无数次做过的事情。

可以区分“动态类型”语言（如 Ruby）和“静态类型语言”（其中变量的类型是预先声明和固定的），如 C，Java 或 Pascal。在本章中，我将集中讨论 Ruby 的自修改（self-modifying）功能。

### 自我修改程序

在大多数编译语言和许多解释语言中，编写和运行程序是两个完全不同的操作。换句话说，你编写的代码是固定的，并且没有程序运行时更改的可能性。

Ruby 的情况并非如此。Ruby程序 - 它的实际代码 - 可以在程序运行时进行修改。甚至可以在运行时输入新的 Ruby 代码并执行新代码而无需重新启动程序。

将数据视为可执行代码的能力称为元编程（ meta-programming）。在本书中，我们一直在进行元编程，尽管是一种相当简单的编程。每次在双引号字符串中嵌入表达式时，你都在进行元编程。毕竟，嵌入式表达式并不是真正的程序代码 - 它是一个字符串 - 然而 Ruby 显然必须“将其转换为”程序代码才能够对其进行计算执行。

大多数情况下，你可能会在双引号字符串中的 `#{` 和 `}` 分隔符之间嵌入相当简单的代码。通常你可以嵌入变量名，或数学表达式：

<div class="code-file clearfix"><span>str_eval.rb</span></div>

	aStr = 'hello world'
	puts( "#{aStr}" )
	puts( "#{2*10}" )

但是你不仅限于这种简单的表达方式。如果你愿意，你可以将任何东西嵌入双引号字符串中。实际上，你可以用字符串编写整个程序。你甚至不需要使用 `print` 或 `puts` 显示最终结果。只需将双引号字符串放入程序中就会使得 Ruby 对其进行计算执行：

	"#{def x(s)
		puts(s.reverse)
	  end;
	(1..3).each{x(aStr)}}"

在字符串中编写整个程序可能是一个非常毫无意义的努力。但是，在其它情况下，这种类似的特性可以更有效地使用。例如，Rails 框架广泛使用元编程。你可以使用元编程来探索人工智能和“机器学习”（machine learning）。实际上，任何因程序执行过程中由于交互而修改程序行为进而受益的应用程序本质上都是元编程。

<div class="note">

动态（元编程）特性在 Ruby 中无处不在。例如，思考属性访问器：将符号（例如 `:aValue`）传递给 `attr_accessor` 方法会最终创建两个方法（`aValue` 和 `aValue=`）。
</div>

### eval 魔法

`eval` 方法提供了一种执行字符串的 Ruby 表达式的简单方法。乍一看，`eval` 可能看起来与双引号字符串中的 `#{}` 标记限定表达式完全相同。以下两行代码产生相同的结果：

<div class="code-file clearfix"><span>eval.rb</span></div>

	puts( eval("1 + 2" ) )
	puts( "#{1 + 2}" )

但是，有时候结果可能不是你所期望的。请看以下内容，例如：

<div class="code-file clearfix"><span>eval_string.rb</span></div>

	exp = gets().chomp()
	puts( eval( exp ))
	puts( "#{exp}" )

假设你输入 `2 * 4` 并将其分配给 `exp`。当你使用 `eval` 计算 `exp` 时，结果为 8，但是当你在双引号字符串中计算 `exp` 时，结果为 **'2 * 4'**。这是因为 `gets()` 读入的任何内容都是字符串，`"＃{exp}"` 将其作为*字符串*而不是表达式进行计算，而 `eval(exp)` 将字符串作为*表达式*求值。

为了强制在字符串中进行求值，你可以在字符串中放置 `eval`（尽管如此，可能会偏离我们的目标）：

	puts( "#{eval(exp)}" )

这是另一个例子。尝试一下，并在出现提示时按照说明操作：

<div class="code-file clearfix"><span>eval2.rb</span></div>

	print( "Enter the name of a string method (e.g. reverse or upcase): " )   # user enters: upcase
	methodname = gets().chomp()
	exp2 = "'Hello world'."<< methodname
	puts( eval( exp2 ) )  													  #=> HELLO WORLD
	puts( "#{exp2}" ) 														  #=> "Hello world".upcase
	puts( "#{eval(exp2)}" )													  #=> HELLO WORLD

`eval` 方法可以执行计算跨越多行的字符串，从而可以执行嵌入字符串中的整个程序：

<div class="code-file clearfix"><span>eval3.rb</span></div>

	eval( 'def aMethod( x )
	  return( x * 2 )
	end

	num = 100
	puts( "This is the result of the calculation:" )
	puts( aMethod( num ))' )

有了所有这些 `eval` 的能力，现在让我们看看编写一个它自己可以编写程序的程序是多么容易。这里：

<div class="code-file clearfix"><span>eval4.rb</span></div>

	input = ""
	until input == "q"
	  input = gets().chomp()
	  if input != "q" then eval( input ) end
	end

这可能看起来不多，但是这个程序允许你从命令提示符中创建和执行真正可用的 Ruby 代码。试试看。运行程序并一次一行地输入这两个方法（但是*不要点 'q' 来退出* - 我们稍后会写一些代码）：

	def x(aStr); puts(aStr.upcase);end
	def y(aStr); puts(aStr.reverse);end

请注意，你必须在一行中输入每个整个方法代码，因为我的程序在输入时按行执行。我将在后面解释如何解决这个限制。归功于 `eval`，每个方法都变成了真实可行的 Ruby 代码。你可以通过输入以下内容来证明这一点：

	x("hello world")
	y("hello world")

现在，这些表达式本身已被执行，它们将调用我们刚刚编写的两个方法，从而产生以下输出：

	HELLO WORLD
	dlrow olleh

仅仅五行代码很不错了！

### 特殊类型的 eval

`eval` 相关的一些变体以名为 `instance_eval`，`module_eval` 和 `class_eval` 方法的形式出现。可以从特定对象调用 `instance_eval` 方法，并且它提供对该对象的实例变量的访问。它可以用块或字符串调用：

<div class="code-file clearfix"><span>instance_eval.rb</span></div>

	class MyClass
	  def initialize
		@aVar = "Hello world"
	  end
	end

	ob = MyClass.new
	p( ob.instance_eval { @aVar } ) 	#=> "Hello world"
	p( ob.instance_eval( "@aVar" ) ) 	#=> "Hello world"

另一方面，`eval` 方法不能以这种方式从对象调用，因为它是 Object 的私有方法（而 `instance_eval` 是公有方法）。实际上，你可以通过将其名称（符号 `:eval`）发送到 `public` 方法来显式更改 `eval` 的可见性，尽管通常建议不要在基类中没有理由的去更改方法可见性！

<div class="note">

严格地说，`eval` 是 Kernel 模块的一个方法，它是被混入到 Object 类中的。事实上，Kernel 模块提供了大多数可用作 Object 方法的函数。
</div>

你可以通过以这种方式添加到 Object 类定义来更改 `eval` 的可见性：

	class Object
	  public :eval
	end

实际上，请记住，当你编写“独立”的代码时，你实际上是在 Object 的作用域内工作，只需输入此代码（没有类 Object 包装器）就会产生相同的效果：

	public :eval

现在你可以使用 `eval` 作为 `ob` 变量的方法：

	p( ob.eval( "@aVar" ) )  #=> "Hello world"

`module_eval` 和 `class_eval` 方法分别对模块和类而不是对象进行操作。例如，此代码将 `xyz` 方法添加到 X 模块（此处 `xyz` 在块中定义，并通过 `define_method` 作为接收对象的实例方法添加，这是 Module 类的方法）；并将 `abc` 方法添加到 Y 类：

<div class="code-file clearfix"><span>module_eval.rb</span></div>

	module X
	end

	class Y
	  @@x = 10
	  include X
	end

	X::module_eval{ define_method(:xyz){ puts("hello" ) } }
	Y::class_eval{ define_method(:abc){ puts("hello, hello" ) } }

<div class="note">

访问类和模块方法时，你可以使用作用域解析运算符 `::` 或单个点。访问常量时，作用域解析运算符是必需的，访问方法时是可选的。
</div>

所以，现在作为 Y 实例的对象将有权访问 Y 类的 `abc` 方法和已混合到 Y 类中的 X 模块的 `xyz` 方法：

	ob = Y.new
	ob.xyz  #=> "hello"
	ob.abc  #=> "hello, hello"

尽管名称不同，但 `module_eval` 和 `class_eval` 在功能上是相同的，并且每个都可以与模块或类一起使用：

	X::class_eval{ define_method(:xyz2){ puts("hello again" ) } }
	Y::module_eval{ define_method(:abc2){ puts("hello, hello again" ) } }

你也可以以相同的方式将方法添加到 Ruby 的标准类中：

	String::class_eval{ define_method(:bye){ puts("goodbye" ) } }
	"Hello".bye #=> "goodbye"

### 添加变量和方法

`module_eval` 和 `class_eval` 方法也可用于获取类变量的值（但请记住，你越这么做，代码就越依赖于类的实现细节，从而破坏封装性）：

	Y.class_eval( "@@x" )

实际上，`class_eval` 可以计算任意复杂度的表达式。例如，你可以通过计算字符串将其用于向类中添加新方法...

	ob = X.new
	X.class_eval( 'def hi;puts("hello");end' )
	ob.hi  #=> "hello"

回到前面从类外部添加和获取类变量的示例（使用 `class_eval`）；事实证明，还有一些方法可以从类中实现。这些方法称为 `class_variable_get`（这需要一个表示变量名的符号参数，它返回变量的值）和 `class_variable_set`（这需要一个表示变量名的符号参数和一个要赋给变量的值作为第二个参数）。这是这些方法的一个示例：

<div class="code-file clearfix"><span>classvar_getset.rb</span></div>

	class X
	  def self.addvar( aSymbol, aValue )
		class_variable_set( aSymbol, aValue )
	  end

	  def self.getvar( aSymbol )
		return class_variable_get( aSymbol )
	  end
	end

	X.addvar( :@@newvar, 2000 )
	puts( X.getvar( :@@newvar ) ) #=> 2000

要获取类变量名称列表作为字符串数组，请使用 `class_variables` 方法：

	p( X.class_variables )  #=> ["@@abc", "@@newvar"]

你还可以使用 `instance_variable_set` 为类和对象在它们被创建后添加实例变量：

	ob = X.new
	ob.instance_variable_set("@aname", "Bert")

将此与添加方法的能力相结合，大胆的（或者可能是鲁莽的？）程序员可以完全改变“来自外部”类的内部结构。这里我以类 X 中名为 `addMethod` 的方法的形式实现了这个方法，它使用 `send` 方法创建一个新方法 `m`，该方法使用 `define_method` 和由 `&block` 定义的方法体：

<div class="code-file clearfix"><span>dynamic.rb</span></div>

	def addMethod( m, &block )
	  self.class.send( :define_method, m , &block )
	end

<div class="note">

`send` 方法调用第一个参数（符号）标识的方法，并将指定的其它参数传递给它。
</div>

现在，X 对象可以调用 `addMethod` 将新方法插入到 X 类中：

	ob.addMethod( :xyz ) { puts("My name is #{@aname}") }

虽然从类的特定实例（此处为 `ob`）调用此方法，但它会影响类本身，因此新定义的方法也可用于后续从 X 类创建的任何实例（此处为 `ob2`）：

	ob2 = X.new
	ob2.instance_variable_set("@aname", "Mary")
	ob2.xyz

如果你不关心对象中数据的封装性，你还可以使用 `instance_variable_get` 方法获取实例变量的值：

	ob2.instance_variable_get( :@aname )

你可以类似地设置和获取常量：

	X::const_set( :NUM, 500 )
	puts( X::const_get( :NUM ) )

`const_get` 可以返回常量的值，所以你可以使用此方法获取类名的值，然后附加新方法以从该类创建新对象。这甚至可以通过提示用户输入类名和方法名来为你提供在运行时（runtime）创建对象的方法。通过运行此程序试试这个：

<div class="code-file clearfix"><span>dynamic2.rb</span></div>

	class X
	  def y
		puts( "ymethod" )
	  end
	end

	print( "Enter a class name: ")  			#<= Enter: X
	cname = gets().chomp
	ob = Object.const_get(cname).new
	p( ob )
	print( "Enter a method to be called: " ) 	#<= Enter: y
	mname = gets().chomp
	ob.method(mname).call

### 在运行时创建类

到目前为止，我们已经可以修改类并从现有类中创建新对象。但是你如何在运行时（runtime）创建一个全新的类呢？好吧，正如 `const_get` 可用于访问现有类一样，`const_set` 可用于创建新类。下面是一个示例，说明如何在创建该类之前提示用户输入新类的名称，向其中添加方法（`myname`），创建该类的实例 `x`，并调用其 `myname` 方法：

<div class="code-file clearfix"><span>create_class.rb</span></div>

	puts("What shall we call this class? ")
	className = gets.strip().capitalize()
	Object.const_set(className, Class.new)
	puts("I'll give it a method called 'myname'" )
	className = Object.const_get(className)
	className::module_eval{ define_method(:myname){
	  puts("The name of my class is '#{self.class}'" ) }
	}
	x = className.new
	x.myname

### 绑定

`eval` 方法可以接收可选的“绑定”（binding）参数，如果提供该参数，则使得执行计算在特定作用域或“上下文”（context）内完成。在 Ruby 中，发现绑定是 Binding 类的一个实例可能不会让人感到意外。你可以使用 `binding` 方法返回绑定。Ruby 类库中的 `eval` 文档提供了这个示例：

<div class="code-file clearfix"><span>binding.rb</span></div>

	def getBinding(str)
	  return binding()
	end
	str = "hello"
	puts( eval( "str + ' Fred'" ) ) 					#=> "hello Fred"
	puts( eval( "str + ' Fred'", getBinding("bye") ) ) 	#=> "bye Fred"

这里的 `binding` 是 Kernel 的私有方法。`getBinding` 方法能够在当前上下文中调用 `binding` 并返回 `str` 的当前值。在第一次调用 `eval` 时，上下文是 *main* 对象，并使用局部变量 `str` 的值；在第二次调用中，上下文移动到了 `getBinding` 方法内，`str` 的局部值现在是方法的 `str` 参数。

上下文也可以由类定义。在 **binding2.rb** 中，你可以看到实例变量 `@mystr` 和类变量 `@@x` 的值根据类而不同：

<div class="code-file clearfix"><span>binding2.rb</span></div>

	class MyClass
	  @@x = " x"
	  def initialize(s)
		@mystr = s
	  end
	  def getBinding
		return binding()
	  end
	end

	class MyOtherClass
	  @@x = " y"
	  def initialize(s)
		@mystr = s
	  end
	  def getBinding
		return binding()
	  end
	end

	@mystr = self.inspect
	@@x = " some other value"

	ob1 = MyClass.new("ob1 string")
	ob2 = MyClass.new("ob2 string")
	ob3 = MyOtherClass.new("ob3 string")

	puts(eval("@mystr << @@x", ob1.getBinding)) #=> ob1 string x
	puts(eval("@mystr << @@x", ob2.getBinding)) #=> ob2 string x
	puts(eval("@mystr << @@x", ob3.getBinding)) #=> ob3 string y
	puts(eval("@mystr << @@x", binding)) 		#=> main some other value

### Send

你可以使用 `send` 方法调用与指定符号同名的方法：

<div class="code-file clearfix"><span>send1.rb</span></div>

	name = "Fred"
	puts( name.send( :reverse ) )  #=> derF
	puts( name.send( :upcase ) )   #=> FRED

虽然 `send` 方法被记录为需要符号参数，但你也可以使用字符串参数。或者，为了保持一致性，你可以使用 `to_sym` 进行转换，然后使用相同的名称调用该方法：

	name = MyString.new( gets() )
	methodname = gets().chomp.to_sym 	#<= to_sym is not strictly necessary
	name.send(methodname)

下面是在运行时使用 `send` 调用输入的命名方法的示例：

<div class="code-file clearfix"><span>send2.rb</span></div>

	class MyString < String
	  def initialize( aStr )
		super aStr
	  end

	  def show
		puts self
	  end

	  def rev
		puts self.reverse
	  end
	end

	print("Enter your name: ")  	#<= Enter: Fred
	name = MyString.new( gets() )
	print("Enter a method name: " ) #<= Enter: rev
	methodname = gets().chomp.to_sym
	puts( name.send(methodname) )	#=> derF

回想一下我们先前（**dynamic.rb**）如何使用 `send` 来创建一个新方法，通过调用 `define_method` 并向其传递要创建的方法的名称 `m` 和包含新方法代码的块 `&block`：

<div class="code-file clearfix"><span>dynamic.rb</span></div>

	def addMethod( m, &block )
	  self.class.send( :define_method, m , &block )
	end

### 移除方法

除了创建新方法之外，有时你可能希望移除现有方法。你可以通过在特定类作用域内使用 `remove_method` 执行此操作。这将删除特定类中指定符号的方法：

<div class="code-file clearfix"><span>rem_methods1.rb</span></div>

	puts( "hello".reverse )
	class String
	  remove_method( :reverse )
	end
	puts( "hello".reverse )  #=> "undefined method" error!

如果为该类的祖先类定义了具有相同名称的方法，则不会删除祖先类中的同名方法：

<div class="code-file clearfix"><span>rem_methods2.rb</span></div>

	class Y
	  def somemethod
		puts("Y's somemethod")
	  end
	end

	class Z < Y
	  def somemethod
		puts("Z's somemethod")
	  end
	end

	zob = Z.new
	zob.somemethod 		#=> "Z's somemethod"

	class Z
	  remove_method( :somemethod )
	end

	zob.somemethod 		#=> "Y's somemethod"

相反，`undef_method` 阻止指定的类响应方法调用，即使在其一个祖先类中定义了一个具有相同名称的方法：

<div class="code-file clearfix"><span>undef_methods.rb</span></div>

	zob = Z.new
	zob.somemethod 		#=> "Z's somemethod"

	class Z
	  undef_method( :somemethod )
	end

	zob.somemethod 		#=> "undefined method" error

### 处理未定义方法的调用

当 Ruby 尝试执行未定义的方法时（或者，在 OOP 术语中，当一个对象被发送了一个它无法处理的消息时），该错误会导致程序终止退出。你可能更愿意你的程序能从这样的错误中恢复。你可以通过编写一个名为 `method_missing` 的方法来完成此操作，该方法接收一个值为缺失的方法名称的参数。这将在调用不存在的方法时执行：

<div class="code-file clearfix"><span>nomethod1.rb</span></div>

	def method_missing( methodname )
	  puts( "#{methodname} does not exist" )
	end
	xxx 	#=> displays: "xxx does not exist"

`method_missing` 方法还可以在缺失的方法名称后获取传入的参数列表（`args`）：


<div class="code-file clearfix"><span>nomethod2.rb</span></div>

	def method_missing( methodname, *args )
	  puts( "Class #{self.class} does not understand: #{methodname}( #{args.inspect} )" )
	end

`method_missing` 方法甚至可以动态创建未定义的方法：

	def method_missing( methodname, *args )
	  self.class.send( :define_method, methodname, lambda{ |*args| puts( args.inspect) } )
	end

### 在运行时写程序

最后，让我们回到我们之前看过的程序（**eval4.rb**），它提示用户输入字符串以在运行时（runtime）定义代码，执行这些字符串并从中创建新的可运行方法。

该程序的一个缺点是它必须要求每个方法的代码都输入一行中。事实上，编写一个允许用户输入跨越多行的方法的程序非常简单。例如，这里是一个程序，它执行输入的所有代码，直到输入一个空行：

<div class="code-file clearfix"><span>writeprog.rb</span></div>

	program = ""
	input = ""
	line = ""
	until line.strip() == "q"
	  print( "?- " )
	  line = gets()
	  case( line.strip() )
	  when ''
		puts( "Evaluating..." )
		eval( input )
		program += input
		input = ""
	  when 'l'
		puts( "Program Listing..." )
		puts( program )
	  else
		input += line
	  end
	end

你可以通过输入整个方法然后输入空行来尝试一下（当然只输入代码，而不是注释）：

	def a(s) 			# <= press Enter after each line
	  return s.reverse 	# <= press enter (and so on...)
	end
		# <- Enter a blank line here to eval these two methods
	def b(s)
	  return a(s).upcase
	end
		# <- Enter a blank line here to eval these two methods
	puts( a("hello" ) )
		# <- Enter a blank line to eval
		#=> Displays "olleh"
	puts( b("goodbye" ) )
		# <- Enter a blank line to eval
		#=> Displays "EYBDOOG"

输入每行后，会出现提示符（`'?-'`），除非程序正在执行代码的过程中，在这种情况下，它会显示 *"Evaluating"* 或显示执行结果，例如 *"olleh"*。

如果你完全按照上面的说明输入文本，那么你应该看到：

	Write a program interactively.
	Enter a blank line to evaluate.
	Enter 'q' to quit.
	?- def a(s)
	?- return s.reverse
	?- end
	?-
	Evaluating...
	?- def b(s)
	?- return a(s).upcase
	?- end
	?-
	Evaluating...
	?- puts(a("hello"))
	?-
	Evaluating...
	olleh
	?- b("goodbye")
	?-
	Evaluating...
	EYBDOOG

这个程序还很简单。它没有任何基本的错误恢复功能，更不用说花哨的东西，如文件保存和加载功能。即便如此，这个小示例也证明了在 Ruby 中编写自修改（self-modifying）程序是多么容易。使用本章概述的技术，你可以从给定语法规则的自然语言解析器为冒险游戏创造任何东西，这个过程中你可以探索新的困惑。

在本书中，我们涵盖了很多基础内容 - 从 "hello world" 到动态编程（dynamic programming）。剩下的要靠你自己了。

这才是冒险真正开始的地方。

## 深入探索

### 冻结对象

通过了解所有这些修改对象的方法，你可能会担心对象有被无意中修改掉的风险。实际上，你可以通过“冻结”它（使用 `freeze` 方法）来专门固定住对象的状态。一旦冻结，就无法修改对象包含的数据，如果尝试这样做，将抛出 TypeError 异常。然而，在冻结对象时要小心，因为一旦冻结，它就不能“解冻”（unfrozen）。

<div class="code-file clearfix"><span>freeze.rb</span></div>

	s = "Hello"
	s << " world"
	s.freeze
	s << " !!!" # Error: "can't modify frozen string (TypeError)"

你可以使用 `frozen?` 来专门检查对象是否被冻结：

	a = [1,2,3]
	a.freeze
	if !(a.frozen?) then
	  a << [4,5,6]
	end

请注意，虽然无法修改冻结对象的数据，但可以修改定义它的类。假设你有一个类 X，它包含一个方法 `addMethod`，它可以使用给出的符号名称创建新的方法 `m`：

<div class="code-file clearfix"><span>cant_freeze.rb</span></div>

	def addMethod( m, &block )
	  self.class.send( :define_method, m , &block )
	end

现在，如果你有一个从 M 类创建的对象 `ob`，那么调用 `addMethod` 来向 M 类添加一个新方法是完全合法的：

	ob.freeze
	ob.addMethod( :abc ) { puts("This is the abc method") }

当然，如果你想阻止冻结的对象它的所属类，可以使用 `frozen?` 方法来测试它的状态：

	if not( ob.frozen? ) then
	  ob.addMethod( :def ) { puts("'def' is not a good name for a method") }
	end

你也可以冻结类本身（记住，类也是一个对象）：

	X.freeze
	if not( X.frozen? ) then
	  ob.addMethod( :def ) { puts("'def' is not a good name for a method") }
	end
