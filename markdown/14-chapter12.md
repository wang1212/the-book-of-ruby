---

	{
		"title": "第十二章",
		"ctime": "2018-12-13 15:57:00",
		"mtime": "2018-12-13 15:57:00"
	}

---

# 第十二章

***

## 模块（Modules）和混入（Mixins）

在 Ruby 中，每个类只有一个直接的“父类”（parent），尽管每个父类可能有许多“子类”（children）。通过将类层次结构限制为单继承，Ruby 避免了那些允许多继承的编程语言（如 C++）中可能出现的一些问题。当类有很多父类和子类，而且它们的父类、子类还有其它父类和子类，你最终会面临一个难以理解的网络（或者“结”？），而不是你可能想要的整洁，有序的层次结构。

然而，有时候（多继承）对于与实现某些共享特征并不密切相关的类是有用的。例如，剑可能是一种武器（Weapon），但也会是一种珍宝（Treasure）；PC 可能是一种计算机（Computer），但也会是一种投资（Investment）等等。

但是，由于定义武器（Weapons）和珍宝（Treasures）或计算机（Computers）和投资（Investments）的类继承自不同的祖先类，因此它们的类层次结构使它们没有明显的方式来共享数据和方法。这个问题的 Ruby 解决方案由 Modules 提供。

### 模块像一个类...

模块（module）的定义看起来非常类似于类（class）。事实上，模块和类密切相关 -  `Module` 类是 `Class` 类的直接祖先。就像一个类一样，模块可以包含常量，方法和类。 这是一个简单的模块：

	module MyModule
	  GOODMOOD = "happy"
	  BADMOOD = "grumpy"

	  def greet
		return "I'm #{GOODMOOD}. How are you?"
	  end

	end

如你所见，它包含一个常量 `GOODMOOD` 和一个'实例方法'（instance method） `greet`。

### 模块方法

模块除了有实例方法（instance methods）之外，还可以具有模块方法（module methods）。就像类方法以类的名称为前缀一样，模块方法也以模块名称为前缀：

	def MyModule.greet
	  return "I'm #{BADMOOD}. How are you?"
	end

尽管它们有相似之处，但是有两个重要特征，类有而模块没有：**实例（instances）**和**继承（inheritance）**。类可以有实例（对象），超类（父类）和子类（子类）；模块没有这些。

<div class="note">

Module 类确实有一个超类 - 即 Object。 但是，你创建的任何命名模块都没有超类。有关模块（Modules）和类（Classes）之间关系的更详细说明，请参阅本章末尾的“**深入探索**”部分。
</div>

这为我们引出了下一个问题：如果你不能从模块创建一个对象，那么模块可以用来干什么？这可以用两个词来回答：**命名空间（namespaces）**和**混入（mixins）**。Ruby 的 'mixins' 机制提供了一种处理多重继承存在的问题的方法。我们很快就会遇到 mixins。首先，我们来看看命名空间（namespaces）。

### 模块作为命名空间

你可以将模块视为一种围绕一组方法，常量和类的命名“包装器”（wrapper）。模块内部的各种代码共享相同的“命名空间”（namespaces），因此它们彼此都可见，但对模块外部的代码不可见。

Ruby 类库定义了许多模块，如 Math 和 Kernel。Math 模块包含数学方法（例如 `sqrt` 以返回平方根）和常量（例如 `PI`）。Kernel 模块包含我们从一开始就使用的许多方法，例如 `print`，`puts` 和 `gets`。

假设我们前面看过的模块：

<div class="code-file clearfix"><span>modules1.rb</span></div>

	module MyModule
	  GOODMOOD = "happy"
	  BADMOOD = "grumpy"

	  def greet
		return "I'm #{GOODMOOD}. How are you?"
	  end

	  def MyModule.greet
		return "I'm #{BADMOOD}. How are you?"
	  end
	end

我们可以访问模块常量，就像我们使用 `::` 作用域解析运算符访问类常量一样，如下所示：

	puts(MyModule::GOODMOOD)

我们可以使用点表示法访问模块方法 - 即，指定模块名称后跟句点和方法名称。 以下会打印出来 "I'm grumpy. How are you?"：

	puts( MyModule.greet )

### 模块的“实例方法”

但是如何访问实例方法，`greet`？ 由于模块定义了一个封闭的命名空间，模块外的任何代码都无法“看到” `greet` 方法，所以这不起作用：

	puts( greet )

如果这是一个类而不是一个模块，我们当然可以使用 `new` 方法从类创建对象 - 每个单独的对象，类的每个'实例' - 都可以访问实例方法。但是你无法创建模块的实例。那么我们如何使用它们的实例方法呢？这是引入 mixins 的时候了...

### 包含模块或混入（Mixins）

对象可以通过使用 `include` 方法包含该模块来访问模块的实例方法。如果你要将 MyModule 包含到程序中，则该模块内的所有内容都会突然出现在当前作用域内。因此，现在可以访问 MyModule 的 `greet` 方法：

<div class="code-file clearfix"><span>modules2.rb</span></div>

	include MyModule
	puts( greet )

注意，只会包含实例方法。在上面的示例中，已经包含了 `greet`（实例）方法，但是 `MyModule.greet`（模块）方法没有被包含...

	module MyModule
	  GOODMOOD = "happy"
	  BADMOOD = "grumpy"

	  def greet
		return "I'm #{GOODMOOD}. How are you?"
	  end

	  def MyModule.greet
		return "I'm #{BADMOOD}. How are you?"
	  end
	end

正如它所包含的那样，`greet` 方法可以像使用当前作用域中的普通实例方法一样被使用...

	puts( greet )

包含模块的过程也称为“混入”（mixing in） - 这解释了为什么包含的模块通常被称为 "mixins"。将模块混入到类定义中时，从该类创建的任何对象都将能够使用被混入模块的实例方法，就像它们在类本身中定义一样。

<div class="code-file clearfix"><span>modules3.rb</span></div>

	class MyClass
	  include MyModule

	  def sayHi
		puts( greet )
	  end
	end

不仅这个类的方法可以访问 MyModule 模块的 `greet` 方法，而且从类中创建的任何对象也是如此：

	ob = MyClass.new
	ob.sayHi
	puts(ob.greet)

模块（Modules）可以被认为是离散的代码单元，可以简化可重用代码库的创建。另一方面，你可能更感兴趣的是使用模块作为实现多继承的替代方式。

回到我在本章开头提到的一个示例，让我们假设你有一个剑（Sword）类，它不仅是一种武器（Weapon），也是一种珍宝（Treasure）。或许 Sword 是 Weapon 类的后代（因此继承了 Weapon 的 `deadliness` 属性），但它也需要具有 Treasure 的属性（例如 `value` 和 `owner`），并且这是拥有魔法（MagicThing）的精灵之剑。如果你在 Treasure 和 MagicThing *模块*（`modules`）而不是*类*（`classes`）中定义这些属性，则 Sword 类将能够以“混入”（mix in）方式包含这些模块其方法或属性：

<div class="code-file clearfix"><span>modules4.rb</span></div>

	module MagicThing
	  attr_accessor :power
	end

	module Treasure
	  attr_accessor :value
	  attr_accessor :owner
	end

	class Weapon
	  attr_accessor :deadliness
	end

	class Sword < Weapon
	  include Treasure
	  include MagicThing
	  attr_accessor :name
	end

Sword 对象现在可以访问 Sword 类本身，它的祖先类 Weapon，以及它的混入（mixed-in）模块 Treasure 和 MagicThing 的方法和属性：

	s = Sword.new
	s.name = "Excalibur"
	s.deadliness = "fatal"
	s.value = 1000
	s.owner = "Gribbit The Dragon"
	s.power = "Glows when Orcs Appear"
	puts(s.name)
	puts(s.deadliness)
	puts(s.value)
	puts(s.owner)
	puts(s.power)

顺便提一下，无法从模块外部访问模块中作为局部变量的任何变量。即使模块内部的方法试图访问局部变量并且该方法是由模块外部的代码调用的 - 例如，当包含混入模块时，情况也是如此：

<div class="code-file clearfix"><span>mod_vars.rb</span></div>

	x = 1 						 # local to this program

	module Foo
	  x = 50 					 # local to module Foo

	  # This can be mixed in but the variable x won't then be visible
	  def no_bar
		return x
	  end

	  def bar
		@x = 1000
		return @x
	  end

	  puts( "In Foo: x = #{x}" ) # this can access the „module local‟ x
	end

	include Foo

	puts(x)
	puts( no_bar ) 				 # Error! This can't access the module-local variable
								 # needed by the no_bar method
	puts(bar)

请注意，*实例变量（instance variables）*可用于混入方法（例如 `bar`）。但是，即使在混入方法的当前作用域中存在具有相同名称的局部变量时，局部变量也不可用（因此，即使 `x` 在当前作用域中已经声明，`no_bar` 也无法访问名为 `x` 的变量）。

模块可以具有其自己的实例变量，这些变量仅仅属于模块“对象”。这些实例变量存在于模块方法的作用域内：

<div class="code-file clearfix"><span>inst_class_vars.rb</span></div>

	module X
	  @instvar = "X's @instvar"

	  def self.aaa
		puts(@instvar)
	  end
	end

	X.aaa #=> "X's @instvar"

但实例对象中引用的实例变量“属于”包含该模块的作用域：

	module X
	  @instvar = "X's @instvar"
	  def amethod
		@instvar = 10 			# creates @instvar in current scope
	    puts(@instvar)
	  end
	end

	include X

	X.aaa 					#=> X's @instvar
	puts( @instvar ) 		#=> nil
	amethod #=> 10
	puts( @instvar ) 		#=> 10
	@instvar = "hello world"
	puts( @instvar ) 		#=> "hello world"

类变量也会被混入，和实例变量一样，它们的值可以在当前作用域内重新分配：

	module X
	  @@classvar = "X's @@classvar"
	end

	include X

	puts( @@classvar ) 		#=> X's @@classvar
	@@classvar = "bye bye"
	puts( @@classvar ) 		#=> "bye bye"

你可以使用 `instance_variables` 方法获取实例变量的名称数组：

	p( X.instance_variables )
	p( self.instance_variables )


### 命名冲突

模块方法（特定的前缀为模块名称的那些方法）可以让你的代码免受意外命名冲突的影响。但是，模块中的实例方法没有这样的保护措施。假设你有两个模块 - 一个叫做 Happy，另一个叫做 Sad。它们每个都包含一个名为 `mood` 的模块方法和一个名为 `expression` 的实例方法。

<div class="code-file clearfix"><span>happy_sad.rb</span></div>

	module Happy
	  def Happy.mood # module method
		return "happy"
	  end

	  def expression # instance method
		return "smiling"
	  end
	end

	module Sad
	  def Sad.mood  # module method
		return "sad"
	  end

	  def expression # instance method
		return "frowning"
	  end
	end

现在，一个类 Person 包含了这两个模块：

	class Person
	  include Happy
	  include Sad
	  attr_accessor :mood

	  def initialize
		@mood = Happy.mood
	  end
	end

Person 类的 `initialize` 方法需要使用被包含模块之一的 `mood` 方法设置其 `@mood` 变量的值。实际上他们都有一个 `mood` 方法，但这没有问题；作为一个模块方法，`mood` 必须以模块名称开头，因此 `Happy.mood` 不会与 `Sad.mood` 混淆。

但 Happy 和 Sad 模块也都包含一个名为 `expression` 的方法。这是一个实例方法，当两个模块都包含在 Person 类中时，可以不带任何限定地调用 `expression` 方法：

	p1 = Person.new
	puts(p1.expression)

对象 `p1` 使用哪个 `expression` 方法？事实证明它使用最后定义的方法。在目前的情况下，这恰好是 Sad 模块中定义的方法，原因很简单，在 Happy 之后包含了 Sad 模块。如果更改包含顺序以在 Sad 之后包含 Happy，则 `p1` 对象将使用 Happy 模块中定义的 `expression` 方法的版本。

在开始创建大型而且复杂的模块并将其混入到你的常规基类中之前，请记住这个潜在的问题 - 即包含相同名称的实例方法将“覆盖”彼此。在我的小程序中发现问题可能是显而易见的。但在一个巨大的应用程序中它可能不那么明显！

### Alias 方法

当你使用来自多个模块有类似命名的方法时，避免歧义的一种方式是给这些方法一个“别名”（alias）。别名是具有新名称的现有方法的副本。你可以使用 `alias` 关键字后跟新名称，以及旧名称：

<div class="code-file clearfix"><span>alias_methods.rb</span></div>

	alias happyexpression expression

你还可以使用别名（alias）来创建一个已被覆盖方法的副本，以便你可以在定义被覆盖之前指定引用其版本：

	module Happy
	  def Happy.mood
		return "happy"
	  end

	  def expression
		return "smiling"
	  end
	  alias happyexpression expression
	end

	module Sad
	  def Sad.mood
		return "sad"
	  end

	  def expression
		return "frowning"
	  end
	  alias sadexpression expression
	end

	class Person
	  include Happy
	  include Sad
	  attr_accessor :mood

	  def initialize
		@mood = Happy.mood
	  end
	end

	p2 = Person.new
	puts(p2.mood)				#=> happy
	puts(p2.expression) 		#=> frowning
	puts(p2.happyexpression) 	#=> smiling
	puts(p2.sadexpression) 		#=> frowning

### 谨慎使用 Mix-in！

虽然每个类只能从继承自一个超类，但它可以混入（mix in）许多模块。实际上，完全允许将一批模块混入到另一批模块中，并将这些其它模块混入到类中，再将这些类混入到更多模块中。下面是一些代码的示例，这些代码将子类混入在模块中，甚至是混入到模块中的子类中。此代码已被有意简化。有关示例的完整代码，请参阅示例程序 **multimods.rb**：

<div class="code-file clearfix"><span>multimods.rb</span></div>

	module MagicThing # module
	  class MagicClass # class inside module
	  end
	end

	module Treasure   # module
	end

	module MetalThing
	  include MagicThing 			# mixin
	  class Attributes < MagicClass # subclasses class from mixin
	  end
	end

	include MetalThing				# mixin
	class Weapon < MagicClass 		# subclass class from mixin
	  class WeaponAttributes < Attributes # subclass
	  end
	end

	class Sword < Weapon # subclass
	  include Treasure 		# mixin
	  include MagicThing 	# mixin
	end

简而言之，虽然模块在使用时可能有助于避免与 C++ 一样的多重继承相关的一些复杂性，但它们仍可能被滥用。如果程序员真的想要创建复杂的类层次结构，并且在模块中的多个级别上具有难以理解的依赖性，那么他或她当然可以这样做。在 **multimods.rb** 中，我已经展示了用几行代码编写一个难以理解的程序是多么容易。想象一下，你可能将成千上万行这样的代码分散在数十个代码文件中！可以说，这不是我推荐的编程风格，因此你可能需要在混入模块之前仔细考虑一下。

### 从文件中包含模块

到目前为止，我已经混入了在单个源文件中定义的模块。通常，在单独的文件中定义模块并根据需要将它们混入更有用。要使用其它文件中的代码，你必须要做的第一件事是使用 `require` 方法加载该文件，如下所示：

	require( "testmod.rb" )

（可选）你可以省略文件扩展名：

	require( "testmod" )  # this works too

所需文件必须位于当前目录，搜索路径或预定义数组变量 `$:` 中列出的文件夹中。你可以使用常用的 array-append 方法 `<<` 向此数组变量添加元素，以这种方式：

	$: << "C:/mydir"

<div class="note">

全局变量 `$:`（美元符号和冒号）包含一个字符串数组，表示 Ruby 在查找加载或引入文件时搜索的目录。
</div>

如果成功加载指定的文件，`require` 方法返回 `true` 值；否则返回 `false`。如果有疑问，你只需显示结果：

	puts(require( "testmod.rb" ))

当需要该文件时，将执行在文件运行时通常执行的任意代码。因此，如果文件 `testmod.rb` 包含此代码...

<div class="code-file clearfix"><span>testmod.rb</span></div>

	def sing
	  puts( "Tra-la-la-la-la....")
	end

	puts( "module loaded")
	sing

...文件 **require_module.rb** 包含它...

<div class="code-file clearfix"><span>require_module.rb</span></div>

	require( "testmod.rb")

...然后，当运行 **require_module.rb** 时，这将输出：

	module loaded
	Tra-la-la-la-la....

在所需文件中声明的模块，可以将其混入：

	require( "testmod.rb")
	include MyModule #mix in MyModule declared in testmod.rb

<div class="code-file clearfix"><span>load_module.rb</span></div>

Ruby 还允许你使用 `load` 方法加载文件。在大多数情况下，`require` 和 `load` 可视为可互换的。但是有一些微妙的差异。特别是，`load` 可以使用可选的第二个参数，如果为 `true`，则加载并执行代码作为未命名或匿名模块：

	load( "testmod.rb", true)

加载的文件不会将新命名空间（namespace）引入主程序，你将无法访问已加载文件中的所有模块。当 `load` 的第二个参数为 `false` 或没有第二个参数时，你将可以访问已加载文件中的模块。请注意，使用 `load` 时你必须输入完整的文件名（"testmod" 减去 ".rb" 扩展名是不行的）。

另一个区别是 `require` 仅加载一次文件（即使你的代码多次引入该文件），而 `load` 会导致每次调用 `load` 时重新加载指定的文件。我们假设你在文件 **test.rb** 中有这个：

<div class="code-file clearfix"><span>test.rb</span></div>

	MyConst = 1
	if @a == nil then
	  @a = 1
	else
	  @a += MyConst
	end

	puts @a

我们假设你现在引入（require）这个文件三次：

<div class="code-file clearfix"><span>require_again.rb</span></div>

	require "test"
	require "test"
	require "test"

这里将会输出：

	1

但是如果你加载（load）文件三次...

<div class="code-file clearfix"><span>load_again.rb</span></div>

	load "test.rb"
	load "test.rb"
	load "test.rb"

...那么这将会输出：

	1
	./test.rb:1: warning: already initialized constant MyConst
	2
	./test.rb:1: warning: already initialized constant MyConst
	3

## 深入探索

### 模块与类

我们已经研究了模块的行为。现在我们来看看模块的本质是什么。事实证明，与 Ruby 中的大多数其它东西一样，模块是对象（object）。事实上，每个命名模块都是 Module 类的实例：

<div class="code-file clearfix"><span>module_inst.rb</span></div>

	module MyMod
	end

	puts( MyMod.class )  #=> Module

你无法创建命名模块的后代，因此不允许这样做：

	module MyMod
	end

	module MyOtherMod < MyMod
	end

但是，与其它类一样，允许创建 Module 类的后代：

	class X < Module
	end

实际上，`Class` 类本身就是 `Module` 类的后代。它继承了 Module 的行为并添加了一些重要的新行为 - 特别是创建对象的能力。你可以通过运行 **modules_classes.rb** 程序来显示此继承链以验证 Module 是 Class 的超类：

<div class="code-file clearfix"><span>modules_classes.rb</span></div>

	Class
	Module  #=> is the superclass of Class
	Object  #=> is the superclass of Module

### 预定义模块

以下模块内置于 Ruby 解释器中：

	Comparable, Enumerable, FileTest, GC, Kernel, Math, ObjectSpace, Precision, Process, Signal

`Comparable` 是一个 mixin 模块，允许包含类以实现比较运算符。包含类必须定义 `<=>` 运算符，该运算符将接收器对象与另一个对象进行比较，返回 -1，0 或 +1，具体取决于接收器对象是否小于，等于或大于另一个对象。Comparable 使用 `<=>` 来实现常规的比较运算符（`<`，`<=`，`==`，`>=` 和 `>`）和 `between?` 方法。

`Enumerable` 是为枚举（enumeration）提供的 mix-in 模块。包含类必须提供 `each` 方法。

`FileTest` 是一个包含文件测试功能的模块；它的方法也可以从 File 类访问。

`GC` 模块为 Ruby 的标记和垃圾回收清除机制提供了一个接口。一些底层方法也可以通过 ObjectSpace 模块获得。

`Kernel` 是 Object 类包含的模块；它定义了 Ruby 的“内置”（‘built-in）方法。

`Math` 是一个包含了基本三角函数和超越函数功能的模块函数（module functions）的模块。它具有相同定义和名称的“实例方法”（instance methods）和模块方法。

`ObjectSpace` 是一个包含了与垃圾回收工具交互的例程，并且允许你使用迭代器遍历所有活动对象的模块。

`Precision` 是为有具体精度的数字（numeric）类提供的 mixin 模块。这里，"Precision"　表示近似的实数精度，因此，该模块不应包含在不是　Real（实数）子集的任何类中（因此它不应包含在诸如　Complex（复数）或　Matrix（矩阵）之类的类中）。

`Process ` 是操纵进程（processes）的模块。它的所有方法都是模块方法（module methods）。

`Signal` 是用于处理发送到正在运行的进程的信号的模块。可用信号名称列表及其解释取决于操作系统。

以下是三个最常用的Ruby模块的简要概述...

#### Kernel

最重要的预定义模块是 Kernel，它提供了许多“标准”（standard）Ruby 方法，如 `gets`，`puts`，`print` 和 `require`。与许多 Ruby 类库一样，Kernel 是用 C 语言编写的。虽然 Kernel 实际上是“内置于”（built into）Ruby 解释器，但从概念上讲它可以被视为一个 mixed-in 模块，就像普通的 Ruby mixin 一样，它使得它的方法可以直接用于任何需要它的类。由于它混入到了 Object 类中，所有其它 Ruby 类都继承自该类，因此 Kernel 的方法是全部可访问的。

#### Math

<div class="code-file clearfix"><span>math.rb</span></div>

Math 模块的方法以“模块”（module）和“实例”（instance）方法的形式同时提供，因此可以通过将 Math 混入到类中或从外部通过使用模块名称，点和方法名来访问模块方法；你可以使用双冒号访问常量：

	puts( Math.sqrt(144) )
	puts( Math::PI )

#### Comparable

<div class="code-file clearfix"><span>compare.rb</span></div>

Comparable 模块通过将模块混入到你的类中并定义 `<=>` 方法，来提供一种巧妙的方式定义你自己的比较'运算符'（operators）`<`，`<=`，`==`，`>=` 和 `>`。然后，你可以指定将当前对象中的某些值与其他值进行比较的规则。例如，你可能会比较两个整数，两个字符串的长度或一些更不常用的值（例如数组中字符串的位置）。我在我的示例程序 **compare.rb** 中选择了这种不常用的比较类型。这里使用了一个虚构的数组中的字符串索引，以便将一个人的名字与另一个人的名字进行比较。小的索引（例如位于索引 0 处的 "hobbit"）被认为是小于大的索引（例如位于索引 6 处的 "dragon"）：

	class Being
	  include Comparable
	  BEINGS = ['hobbit','dwarf','elf','orc','giant','oliphant','dragon']

	  attr_accessor :name

	  def <=> (anOtherName)
		BEINGS.index[@name]<=>BEINGS.index[anOtherName]
	  end

	  def initialize( aName )
		@name = aName
	  end
	end

	elf = Being.new('elf')
	orc = Being.new('orc')
	giant = Being.new('giant')

	puts( elf.name < orc.name ) 	#=> true
	puts( elf.name > giant.name ) 	#=> false

### 作用域解析

与类一样，你可以使用双冒号作用域解析运算符（scope resolution operator）来访问模块内声明的常量（包括类和其它模块）。例如，假设你有嵌套的模块和类，如下所示：

	module OuterMod
	  moduleInnerMod
		class Class1
	    end
	  end
	end

你可以使用 `::` 运算符访问 Class1，如下所示：

	OuterMod::InnerMod::Class1

<div class="note">

有关类中常量的作用域解析的介绍，请参见第 2 章...
</div>

每个模块和类都有自己的作用域，这意味着可以在不同的作用域中使用单个常量名称。既然如此，你可以使用 `::` 运算符在确定的作用域内指定常量：

	Scope1::Scope2::Scope3 	#...etc

如果在常量名称的最开头使用此运算符，则会产生“打破”（breaking out）当前作用域并访问“顶级”（top level）作用域的效果：

	::ACONST 	# refers to ACONST at „top level‟ scope

以下程序提供了作用域运算符的一些示例：

<div class="code-file clearfix"><span>scope_resolution.rb</span></div>

	ACONST = "hello" 		# We'll call this the "top-level" constant

	module OuterMod
	  module InnerMod
		ACONST=10
		class Class1
		  class Class2
			module XYZ
			  class ABC
				ACONST=100
				def xyz
				  puts( ::ACONST ) #<= this prints the „top-level‟ constant
				end
			  end
			end
		  end
		end
	  end
	end

	puts(OuterMod::InnerMod::ACONST)
	#=> displays 10

	puts(OuterMod::InnerMod::Class1::Class2::XYZ::ABC::ACONST)
	#=> displays 100

	ob = OuterMod::InnerMod::Class1::Class2::XYZ::ABC.new
	ob.xyz
	#=> displays hello

### 模块函数

<div class="code-file clearfix"><span>module_func.rb</span></div>

如果你希望函数既可用作实例方法又可用作模块方法，则可以使用 `module_function` 方法，传入与实例方法的名称相匹配的符号（symbol）即可，如下所示：

	module MyModule
	  def sayHi
		return "hi!"
	  end

	  def sayGoodbye
		return "Goodbye"
	  end

	  module_function :sayHi
	end

现在，`sayHi` 方法可以混入到一个类中并用作实例方法：

	class MyClass
	  include MyModule
	  def speak
		puts(sayHi)
		puts(sayGoodbye)
	  end
	end

它可以用作模块方法，使用点符号：

	ob = MyClass.new
	ob.speak
	puts(MyModule.sayHi)

由于这里的 `sayGoodbye` 方法不是模块函数（module function），因此不能以这种方式使用：

	puts(MyModule.sayGoodbye)  #=> Error: undefined
	method

Ruby 在其一些标准模块，例如 Math（在 Ruby 库文件，**complex.rb** 中）），中使用 `module_function` 来创建模块和实例方法的“匹配对”（matching pairs）。

### 扩展对象

你可以使用 `extend` 方法将模块的方法添加到特定对象（而不是整个类），如下所示：

<div class="code-file clearfix"><span>extend.rb</span></div>

	module A
	  def method_a
		puts( 'hello from a' )
	  end
	end

	class MyClass
	  def mymethod
		puts( 'hello from mymethod of class MyClass' )
	  end
	end

	ob = MyClass.new
	ob.mymethod
	ob.extend(A)

现在对象 `ob` 用模块 `A` 进行了扩展（extend），它可以访问该模块的实例方法 `method_a`：

	ob.method_a

实际上，你可以一次用多个模块来扩展对象。这里，模块 `B` 和 `C` 扩展了对象 `ob`：

	ob.extend(B, C)

当使用包含了与对象类中方法同名的方法的模块扩展对象时，模块中的方法将替换该类中的方法。所以，我们假设 `ob` 用这个类来扩展...

	module C
	  def mymethod
		puts( 'hello from mymethod of module C' )
	  end
	end

现在，当你调用 `ob.mymethod` 时，将显示字符串 'hello from mymethod of module C' 而不是之前显示的 'hello from mymethod of class MyClass'。

你可以通过使用 `freeze` 方法来“冻结”（freezing）它，以阻止对象被扩展：

	ob.freeze

任何进一步扩展此对象的尝试都将导致运行时错误（runtime error）。为了避免这样的错误，你可以使用 ` frozen?` 方法来测试对象是否已被冻结：

	if !(ob.frozen?)
	  ob.extend( D )
	  ob.method_d
	else
	  puts( "Can't extend a frozen object" )
	end
