---

	{
		"title": "第一章",
		"ctime": "2016-11-04 12:30:00",
		"mtime": "2016-11-04 12:30:00"
	}

---

# 第一章

***

## 字符串、数字、类和对象

关于 Ruby 语言，首先要知道的是它是易于使用的。为了证明这一点，让我们来看一看经典的 "Hello world" 程序代码：

<div class="code-file clearfix"><span>1helloworld.rb</span></div>

	puts 'hello world'

这就是完整的代码。用到了一个 `puts` 方法和一个 `'Hello world'` 字符串。没有文件头或者类定义，也不需要导入其他代码和 `main` 方法。这真的就是那么简单。（自己）加载这段代码，**1helloworld.rb**，试着运行一下。

### 获取并保存输入信息

首先将一个提示字符串输出后（这里是命令行窗口），显然下一步就是获取一个字符串。正如你可能猜到的，Ruby 为此提供的是 `gets` 方法。**2helloname.rb** 这段程序提示用户输入他们的名字，假设输入的是 'Fred'，随后将显示一句问候语："Hello Fred"。

<div class="code-file clearfix"><span>2helloname.rb</span></div>

	print( 'Enter your name: ' )
	name = gets()
	puts( "Hello #{name}" )

虽然说这仍然非常地简单，但有一些重要的细节需要说明。首先，注意我输出提示的时候使用的是 `print` 方法而不是 `puts` 方法。这是因为 `puts` 方法会在末尾自动添加一个换行符，但 `print` 方法则不会；而当前我希望光标和提示能在同一行显示。

在下一行，当用户按下 <kbd>Enter</kbd> 键时，我使用 `gets()` 方法读取用户的输入并以字符串类型保存。该字符串会被赋值给 `name` 变量（variable）。我没有预先声明该变量，也没有指定它的类型。在 Ruby 中，你可以根据需要去创建变量，并且 Ruby 会自动去推断该变量的类型。现在我将一个字符串赋值给了 `name`，因此 Ruby 推断 `name` 变量的类型一定是字符串（String）。

<div class="note">
	<b>注意：Ruby 是大小写敏感的。</b>一个名为 <code>myvar</code> 的变量和名为 <code>myVar</code> 的变量是不同的。一个和示例程序中 <code>name</code> 一样的变量，它的名字必须以小写字母开头（如果以大写字母开头，Ruby 会认为它是一个常量（constant），关于常量在后面的章节我会详细说明。）
</div>

顺便说一下，`gets()` 方法的括号是可选的，它与 `print` 和 `puts` 方法用来包围字符串的括号是一样的，如果你移除了括号，仍然会得到相同的结果。但是，括号可以帮助你解决某些语义冲突，并且在某些情况下，如果你省略它们，解释器将会发出警告。

### 字符串与内嵌表达式

在我们的示例代码中，最后一行是相当有趣的。

	puts( "Hello #{name}" )

这里的 `name` 变量被嵌入到字符串（String）本身中。这是通过将变量放置于两个花括号中并在花括号前面加一个 # 字符实现，也就是 `#{}` 。这种嵌入式表达式仅限于使用双引号分隔的字符串中起作用。如果你尝试在单引号分隔的字符串中使用它，该变量将不会被执行（解释），恰恰显示的将会是字符串 **'Hello #{name}'**。

不仅仅只有变量可以嵌入到双引号分隔的字符串中。你也可以嵌入非打印（转义）字符，例如换行符 `\n` 和制表符 `\t` 。你甚至也可以嵌入程序代码和数学表达式。让我们假设你拥有一个方法 `showname` ，它的返回值为字符串 'Fred'。

下面这个字符串在执行过程中将会调用 `showname` 方法，因此，最终结果将会显示为 "Hello Fred"：

	puts "Hello #{showname}"

看你是否能弄清楚下面这段程序将会显示什么结果：

<div class="code-file clearfix"><span>3string_eval.rb</span></div>

	puts("\n\t#{(1 + 2) * 3}\nGoodbye")

现在运行一下 **3string_eval.rb** 程序看看你对了吗。

### 数字

数字（Numbers）和字符串一样容易使用。例如，你想基于税率值和合计值来计算一些东西的销售价格或者总的合计值。为此，你需要将合计值乘以合适的税率并将结果加上合计值。假设合计值为 100 美元，税率为 17.5% ，这个 Ruby 程序会进行计算并显示结果：

<div class="code-file clearfix"><span>4calctax.rb</span></div>

	subtotal = 100.00
	taxrate = 0.175
	tax = subtotal * taxrate
	puts "Tax on $#{subtotal} is $#{tax}, so grand total is $#{subtotal+tax}"

显然，如果这个程序可以计算不同的合计值的话，相比于计算相同的合计值是更有用的。这是一个简单的可以提示用户输入合计值的计算程序：

	taxrate = 0.175
	print "Enter price (ex tax): "
	s = gets
	subtotal = s.to_f
	tax = subtotal * taxrate
	puts "Tax on $#{subtotal} is $#{tax}, so grand total is $#{subtotal+tax}"

这里的 `s.to_f` 是 String 类的一个方法，它会尝试将该字符串转换成一个浮点数。例如，字符串 "145.45" 将被转换成浮点数 145.45 。如果字符串不能被转换，将会返回 0.0 。所以，对于 **"Hello world".to_f** 将会返回 0.0 。

<div class="note">
	<dl>
		<dt>注释</dt>
		<dd>本书附带的许多示例源代码都有会被 Ruby 解释器忽略的注释。注释可以放置于 <b>#</b> 字符之后，该字符之后的一行文本都将会被视为注释：</dd>
	</dl>

	# this is a comment

	puts( "hello" ) # this is also a comment

如果你想注释掉多行文本你可以在文本的首行添加 **=begin** 以及在末行添加 **=end**（**=begin** 与 **=end** 必须左对齐顶格写）：

	=begin
	  This is a
	  multiline
	  comment
	=end
</div>

### 测试条件语句：if ... then

上面的税率值计算代码的问题是允许负的合计值和税率，这种情况在政府看来可能是不利的。因此，我需要测试负数，如果出现负数将其置为 0 。这是我的新版代码：

<div class="code-file clearfix"><span>5taxcalculator.rb</span></div>

	taxrate = 0.175
	print "Enter price (ex tax): "
	s = gets
	subtotal = s.to_f

	if (subtotal < 0.0) then
	subtotal = 0.0
	end

	tax = subtotal * taxrate
	puts "Tax on $#{subtotal} is $#{tax}, so grand total is $#{subtotal+tax}"

Ruby 中的 `if` 测试语句与其他编程语言中的 `if` 相似。注意，这里的括号也是可选的，`then` 也一样。但是，你如果在测试条件之后没有换行符的情况下继续写代码，那么 `then` 不能省略：

	if (subtotal < 0.0) then subtotal = 0.0 end

将所有代码写在同一行不会增加代码的清晰度，我会避免这么写。我长期习惯于 Pascal 书写风格所以导致我经常在 `if` 条件之后添加 `then`，然而这真的是不需要的，你可以将其看成我的一个癖好。`if` 代码块末尾的 `end` 关键字不是可选的，忘记添加它的话你的代码将不会运行。

### 局部变量与全局变量

在前面的示例中，我将值赋给了变量，例如 `subtotal`、`tax` 和 `taxrate` 。这些以小写字母开头的变量都是局部变量（Local variables），这意味着它们只存在于程序的特定部分。换句话说，它们被限制一个定义明确的作用域（scope）内。这是一个实例：

<div class="code-file clearfix"><span>variables.rb</span></div>

	localvar = "hello"
	$globalvar = "goodbye"

	def amethod
	  localvar = 10
	  puts(localvar)
	  puts($globalvar)
	end

	def anotherMethod
	  localvar = 500
	  $globalvar = "bonjour"
	  puts(localvar)
	  puts($globalvar)
	end

这里有三个名为 `localvar` 的局部变量，一个在 main 作用域内被赋值为 "hello" ;其它的两个分别在独立的方法作用域内被赋值为整数（Integers）：因为每一个局部变量都有不同的作用域，赋值并不影响在其它作用域中同名的局部变量。你可以通过调用方法来验证：

	amethod           #=> localvar = 10
	anotherMethod     #=> localvar = 500
	amethod           #=> localvar = 10
	puts( localvar )  #=> localvar = "hello"

另一方面，一个以 **$** 字符开头的全局变量拥有全局作用域。当在一个方法中对一个全局变量进行赋值，同时也会影响程序中其它任意作用域中的同名全局变量：

	amethod          #=> $globalvar = "goodbye"
	anotherMethod    #=> $globalvar = "bonjour"
	amethod          #=> $globalvar = "bonjour"
	puts($globalvar) #=> $globalvar = "bonjour"

### 类与对象

现在先跳过其余的 Ruby 语法，例如类型（type）、循环（loops）、模块（modules）等等（不要怕，我们会很快回过头来），让我们迅速去看看如何创建类（class）和对象（object）。

<div class="note">
	<dl>
		<dt>类、对象和方法</dt>
		<dd>
			类是对象的大纲蓝图，它定义对象包含的数据以及行为方式。许多不同的对象可以从单一的类创建，所以你可能有一个 Cat 类（<code>class</code>），但是有三个 cat 对象（<code>objects</code>）：<em>tiddles</em>、<em>cuddles</em> 和 <em>flossy</em>。一个方法（<code>method</code>）就像一个定义在类中的函数或子例程。
		</dd>
	</dl>
</div>

Ruby 是面向对象（object oriented）的似乎没什么特别可说的，现代所有的语言不是如此吗？好吧，说一点。大多数现代的“面向对象”语言（Java、C++、C#、Object  Pascal 等等）或多或少都具有面向对象编程（OOP）的特性。另一方面，Ruby 是纯粹面向对象的。事实上，除非你使用过 Smalltalk 或  Eiffel （比 Ruby 更纯粹的面向对象的语言），否则 Ruby 就是你曾经使用过的语言中最面向对象的语言。从简单的数字和字符串到复杂的文件和模块，每一块数据都被视为一个对象。并且你用对象做的每一件事都是通过方法来完成，甚至“运算符”（operators）也是一个方法，例如加 + 和减 - 。看下面这个程序：

	x = 1 + 2

这里的 `+` 是 Fixnum (Integer) 对象 1 的一个方法，值 2 被传入该方法；结果 3 被返回并赋值给 x 对象。顺便地说一下，运算符 `=` 是“使用对象做任何事情都是通过方法来完成”这条规则的罕见例外。赋值运算符是一个内置的东西（这不是一个术语，我没有添加）并且它不是用来完成任何事情的一个方法。

现在让我们来看看如何创建我们自己的对象。和大多数其它 OOP（面向对象编程）的语言一样，一个 Ruby 对象由类来定义，这个类就像一个从中构建多个单个对象的蓝图。例如，这个类定一只狗：

	class Dog
      def set_name( aName )
        @myname = aName
      end
	end

注意，类的定义以关键字 `class`（全部小写）和类名开始，并且类名必须以大写字母开头。这个类包含一个 `set_name` 方法，它需要传入一个参数 `aName`，方法体则是将 `aName` 赋值给一个 `@myname` 变量。

### 实例变量

以 `@` 符号开头的变量就是“实例变量”——这意味着它们属于单独的对象或者类的实例。实例变量不需要提前声明。我可以通过调用类的 `new` 方法来创建 Dog 类的实例（即 dog 对象）。在这里我创建两个两个 dog 对象（注意，虽然类名是以大写字母开头的，而实例对象名则是以小写字母开头的）：

	mydog = Dog.new
	yourdog = Dog.new

目前，这两只狗还没有名字。所以，接下来我将要做的是调用 `set_name` 方法来给它们起个名字：

	mydog.set_name( 'Fido' )
	yourdog.set_name( 'Bonzo' )

现在每只狗都有了名字，但是我以后需要通过某些途径能获知它们的名字。我该怎么办？我不能在对象内部获取 `@name` 变量，因为每个对象的内部细节只能被它自己所知道。这是纯粹的面向对象的根本：每个对象内部的数据是私有的。每个对象都有其对应的被定义的输入（例如，`set_name` 方法）和输出接口。只有对象自身才能让它的内部状态变得混乱，外部世界是不能做到的。这被称为“数据隐藏”，并且它是“封装”（encapsulation）原理的一部分。

<div class="note">
	<dl>
		<dt>封装（Encapsulation）</dt>
		<dd>
			在 Ruby 中，封装并不像最初它出现时的那么严格地被遵守，有一些不好的技巧可以让你使一个对象内部变得混乱。为了清楚起见（并确保你和我不会有恶梦），现在我们默默的了解下面这些语言的特性。
		</dd>
	</dl>
</div>

因为我们需要每一只狗都能知道它的名字，让我们给 Dog 类提供一个 `get_name` 方法：

	def get_name
  	  return @myname
	end

这里的 `return` 关键字是可选的。当它被省略时，Ruby 会返回最后一个表达式的值。

为了清楚起见（并为了避免发生意外的结果），我习惯于明确的返回我所期望的值。

最后，我们可以让狗拥有说话的能力。这是最终的类定义：

	class Dog
	  def set_name( aName )
		@myname = aName
	  end

	  def get_name
		return @myname
	  end

	  def talk
		return 'woof!'
	  end
	end

现在，我们可以创建一个 dog 对象，给它命名、显示它的名字并且让它说话：

	mydog = Dog.new
	mydog.set_name( 'Fido' )
	puts(mydog.get_name)
	puts(mydog.talk)

<div class="code-file clearfix"><span>6dogs.rb</span></div>

我已经在 **6dogs.rb** 这个文件中编写了这个代码的扩展版本。这个文件也包含了一个类似于 Dog 类的 Cat 类，除过 `talk` 方法不同，很自然的它的返回值是 miaow 而不是 woof 。

<div class="note">
	<p ><b>糟糕！</b>这个程序似乎包含一个错误。</p>
	<p >
		名为 <code>someotherdog</code> 的对象从未给它的 <code>@name</code> 变量赋值。幸运的是，在我们要显示这只狗的名字时 Ruby 并不会发生错误，而只会打印“nil”。我们将很快看到一个简单的方式来确保这样的错误不再发生...
	</p>
</div>

### 消息、方法与多态

顺便的说一句，这是一个基于经典的 Smalltalk 示例程序的例子，说明了如何将相同的“消息”（例如 `talk`）发送给不同的对象（例如 cats 和 dogs），并且每个不同的对象会对相同的消息使用它们自己特有的方法（这里是 `talk` 方法）产生不同的响应。这种不同的类拥有相同的方法的能力有一个面向对象的名字“多态”——这个词可以不用记住。

当你运行一个程序，例如 **6dogs.rb** ，它的代码是顺序执行的。但是，直到类的实例（即对象）被后面的代码创建类的代码本身不会被执行。你会发现，我经常将类定义与程序运行时就会被执行的独立自由地代码混合着写。这可能不是你想写一个应用程序的主要方式，但这仅仅是尝试，而且它非常方便。

<div class="note">
	<p><strong>什么是自由独立的代码？</strong></p>
	<p>
		如果 Ruby 真的是一个面向对象的语言，你可能会因为我们可以写“自由浮动”的方法而感到奇怪。事实上被证明的是，当你运行一个程序时，Ruby 会创建一个 <code>main</code> 对象并且任何出现在其内部的代码不是自由浮动的，实际上是在 <code>main</code> 对象内部运行。你可以很容易的验证这一点，创建一个新的源文件，添加这些代码然后运行它来查看输出信息：
	</p>

	puts self
	puts self.class
</div>

我的程序有一个明显的缺陷就是 Cat 和 Dog 类是高度重复的。也许更有意义的做法是，创建一个包含 `get_name` 和 `set_name` 方法的 Animal 类，并且它有两个仅仅包含特定行为——woofing 或 miaowing——的后代类 Cat 和 Dog。我们将在下一章中找到如何做到这一点。

### 构造方法——new 与 initialize

现在，来看看另一个用户自定义类的例子。加载 **7treasure.rb** ，这是制作了一个冒险游戏。它包含两个类 Thing（东西） 和 Treasure（宝藏），Thing 类与 Cat 和 Dog 类特别的相似，除了它不包含 woof 或者 miaow。

Treasure 类没有 `get_name` 和 `set_name` 方法，相反地它包含一个名为 `initialize` 的方法，这个方法接受两个参数并将参数值分配给 `@name` 和 `@description` 变量：

<div class="code-file clearfix"><span>7treasure.rb</span></div>

	def initialize( aName, aDescription )
  	  @name = aName
  	  @description = aDescription
	end

当一个类包含名为 `initialize` 的方法，它会在使用 `new` 方法创建对象时自动地被调用。使用 `initialize` 来设置一个对象的实例变量的值是不错的主意。

这相对于使用方法（例如 `set_name`）设置每个实例变量的值有两个明显的好处。首先，一个复杂的类可能包含许多实例变量，你可以通过一个 `initialize` 方法设置它们全部的值，而不是通过许多独立的“set”方法。其次，如果这些变量在对象创建时都被自动的初始化，你就不会以空的变量结束程序（例如在前面的程序中我们尝试显示 `someotherdog` 的名字时会返回 <em>nil</em> 值）。

最后，我创建了一个名为 `to_s` 的方法用来返回一个表示宝物对象的字符串。这个 `to_s` 方法名不是随意的，相同的方法名已被在 Ruby 标准对象库中使用。实际上，`to_s` 方法被定义在 Object 类中，该类是其它类的祖先。通过重新定义 `to_s` 方法，我添加了新的行为，这比默认的方法更适合于 Treasure 类。换句话说，我已经“覆盖”（overridden）了它的 `to_s` 方法。

`new` 方法可以创建一个对象，所以它可以被认为是对象的“构造方法”。然而，你通常不应该实现你自己的 `new` 方法（这是可能的，但它通常不可取）。相反，当你想要执行任何“设置”操作（例如为对象的内部变量赋值）时，应在 `initialize` 方法中完成，Ruby 会在一个新对象创建后立即执行 `initialize` 方法。

<div class="note">
	<dl>
		<dt>垃圾回收（Garbage Collection，GC）</dt>
		<dd >
			在许多语言中（例如 C++ 和 Delphi for Win32），销毁任何已经创建并且不再需要的对象是程序员的职责。换句话说，对象被赋予析构函数以及构造函数。在 Ruby 中，你不必做这些了，因为 Ruby 有一个内置的“垃圾回收器”，它会在你的程序不再引用对象时销毁它并回收内存。
		</dd>
	</dl>
</div>

### 查看对象

顺便提一下，Treasure 对象 **t1** 内部使用了 `inspect` 方法：

	t1.inspect

`inspect` 是为所有的 Ruby 对象定义的，它将返回一个包含人类可读的表示该对象的字符串。在本例中，它显示这样一些信息：

	#<Treasure:0x28962f8 @description="an Elvish weapon forged of gold", @name="Sword">

它是以类名 Treasure 开始，后面跟随一个数字，这是 Ruby 内部用来识别特定对象的的识别码；随后就是对象的名字和变量的值。

Ruby 还提供了<code>p</code>方法作为打印和查看对象细节的快捷语法，像这样：

<div class="code-file clearfix"><span>p.rb</span></div>

	p(anobject)

来看看如何用 `to_s` 方法将各种对象以及测试将一个 Treasure 对象在没有重写 `to_s` 方法的情况下转换成字符串，场试运行 **8to_s.rb** 程序：

<div class="code-file clearfix"><span>8to_s.rb</span></div>

	puts(Class.to_s)     #=> Class
	puts(Object.to_s)    #=> Object
	puts(String.to_s)    #=> String
	puts(100.to_s)       #=> 100
	puts(Treasure.to_s)  #=> Treasure

正如你将看到的，当 `to_s` 方法被调用时，类（如 Class,、Object、String 以及 Treasure ）只是简单的返回它们的名字；而一个对象，例如 Treasure 对象 **t** ，返回与 `inspect` 方法返回值一样的对象标识符：

	t = Treasure.new( "Sword", "A lovely Elvish weapon" )
	puts(t.to_s)
    	#=> #<Treasure:0x3308100>
	puts(t.inspect)
    	#=> #<Treasure:0x3308100 @name="Sword", @description="A lovely Elvish weapon">

虽然 **7treasure.rb** 程序可能作为一个游戏的基础代码包含了不同类型的对象，其代码仍然是重复的。毕竟，为什么 Thing 类有一个 name 而 Treasure 也要包含一个 name 呢？如果把 Treasure 视为一类东西可能是更有意义的。在一个完整的游戏中，其它对象，例如 Rooms（房间） 和 Weapons（武器）可能也是其它的一类东西。是时候应该在一个合适的类层次上开始工作了，这就是我们下一章将要讲到的...