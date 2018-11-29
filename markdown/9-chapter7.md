---

	{
		"title": "第七章",
		"ctime": "2018-11-26 21:26:00",
		"mtime": "2018-11-26 21:26:00"
	}

---

# 第七章

***

## 方法（Methods）

我们在本书中使用了很多方法（methods）。总的来说，它们并不是特别复杂的东西，因此你可能会想那么该章节关于方法的一切东西却如此之长。正如我们将要发现的一样，关于方法的远不止你眼前看到的那些。

### 类方法

到目前为止我们使用的方法都是'实例方法'（instance methods）。实例方法属于类（class）的特定实例（instance） - 换句话说，属于单个对象（object）。也可以编写“类方法”（class methods）。类方法属于类（class）本身。为了定义类方法，你可以在方法名称前面加上类名和句号：

<div class="code-file clearfix"><span>class_methods1.rb</span></div>

	class MyClass
	  def MyClass.classMethod
		puts( "This is a class method" )
	  end

	  def instanceMethod
		puts( "This is an instance method" )
	  end
	end

调用类方法时必须使用类名：

	MyClass.classMethod

特定对象不能调用类方法，同样的类也不能调用实例方法：

	MyClass.instanceMethod   #=> Error! This is an „undefined method‟
	ob.classMethod           #=> Error! This is an „undefined method‟

### 类变量

类方法可能会让你想到类变量（也就是名称以 `@@` 开头的变量）。你可能还记得我们之前在一个简单的冒险游戏中使用了类变量（参见第 2 章中的 **2adventure.rb**）来记录游戏中对象的总数; 每次创建一个新的 Thing 对象时，都会在 `@@num_things` 类变量中增加 1：

	class Thing
	  @@num_things = 0

	  def initialize(aName, aDescription)
		@@num_things +=1
	  end
	end

与实例变量（在从类派生的对象中）不同，类变量必须在首次声明时给出一个值：

	@@classvar = 1000   # class variables must be initialized

在类内初始化实例或类变量只会影响类本身存储的值。类变量（class variable）既可用于类本身，也可用于从该类创建的对象。但是，每个实例变量都是唯一的；每个对象都有属于自己的任何实例变量的副本 - 而类本身也可能有自己的实例变量。

<div class="note">
	<p class="h4"><b>类变量、实例变量以及方法的总结</b></p>

实例变量以 `@` 开头：

	@myinstvar    # instance variable

类变量以 `@@` 开头：

	@@myclassvar  # class variable

实例方法由以下定义：`def` <*MethodName*>

	def anInstanceMethod
	  # some code
	end

类方法则由以下定义：`def` <*ClassName*>.<*MethodName*>

	def MyClass.aClassMethod
	  # some code
	end
</div>

<div class="code-file clearfix"><span>class_methods2.rb</span></div>

要了解一个类怎样才会拥有实例变量，请查看 **class_methods2.rb** 程序。这里声明并初始化了一个类变量和一个实例变量：

	@@classvar = 1000
	@instvar = 1000

它定义了一个类方法 `classMethod`，将这两个变量递增 10，还有一个实例方法 `instanceMethod`，将两个变量递增 1。请注意，我还为实例变量 `@instvar` 赋了值。我之前说过，初始值通常不会以这种方式分配给实例变量。该规则的例外是将值赋给*类本身*的实例变量，而不是从该类派生的对象的实例变量。不久之后，这个区别将变得更加明显。

我编写了几行代码来创建 MyClass 类的三个实例（`ob` 变量在每个循环中初始化一个新实例），然后调用类和实例方法：

	for i in 0..2 do
	  ob = MyClass.new
	  MyClass.classMethod
	  ob.instanceMethod
	  puts( MyClass.showVars )
	  puts( ob.showVars )
	end

我还编写了另一个类方法 `MyClass.showVars` 和一个实例方法 `showVars`，以便在每个循环中显示 `@instvar` 和 `@@classvar` 的值。当你运行代码时，将会显示的值：

	(class method) @instvar = 1010, @@classvar = 1011
	(instance method) @instvar = 1, @@classvar = 1011
	(class method) @instvar = 1020, @@classvar = 1022
	(instance method) @instvar = 1, @@classvar = 1022
	(class method) @instvar = 1030, @@classvar = 1033
	(instance method) @instvar = 1, @@classvar = 1033

你可能需要仔细查看这些结果才能看到发生了什么。总之，这就是发生的事情：类方法 `MyClass.classMethod` 和实例方法 `instanceMethod` 中的代码都在递增类和实例变量，`@@classvar` 和 `@instvar`。

你可以清楚地看到类变量通过这两种方法都在递增（无论何时创建新对象，类方法都会向 `@@classvar` 添加 10，实例方法为它添加 1）。但是，每当创建新对象时 `instanceMethod` 都会将其实例变量初始化为 1。这是预期的行为 - 因为每个对象都有自己的实例变量的副本，但所有对象共享一个唯一的类变量。

也许不太明显的是，类本身也有自己的实例变量 `@instvar`。这是因为，在 Ruby 中，类也是一个对象，因此可以包含实例变量，就像任何其它对象一样。MyClass 变量 `@instvar` 由类方法 `MyClass.classMethod` 递增：

	@instvar += 10

注意当实例方法 `showVars` 打印 `@instvar` 的值时，它打印存储在特定对象 `ob` 中的值; `ob` 的 `@instvar` 的值最初是 `nil`（并非像 MyClass 的变量 `@instvar` 一样初始值为 1000）并且此值在 `instanceMethod` 中递增 1。

当类方法 `MyClass.showVars` 打印 `@instvar` 的值时，它打印存储在类本身中的值（换句话说，MyClass 的 `@instvar` 与来自 `ob` 的 `@instvar` 是不同的变量）。但是当任一方法打印出类变量 `@@classvar` 的值时，值是一样的。

请记住，只会有一个类变量的副本，但可能会有许多实例变量的副本。如果这仍然令人困惑，请看看 **inst_vars.rb** 程序：

<div class="code-file clearfix"><span>inst_vars.rb</span></div>

	class MyClass
	  @@classvar = 1000
	  @instvar = 1000

	  def MyClass.classMethod
	    if @instvar == nil then
	      @instvar = 10
	    else
		  @instvar += 10
	    end
	  end

	  def instanceMethod
		if @instvar == nil then
		  @instvar = 1
		else
		  @instvar += 1
		end
	  end
	end

	ob = MyClass.new
	puts MyClass.instance_variable_get(:@instvar)

	puts( '--------------' )
	for i in 0..2 do
	  # MyClass.classMethod
	  ob.instanceMethod
	  puts("MyClass @instvar=#{MyClass.instance_variable_get(:@instvar)}")
	  puts("ob @instvar= #{ob.instance_variable_get(:@instvar)}")
	end

这一次，我们在一开始就创建了一个实例（`ob`），而不是通过循环每次创建一个新的对象实例。当 `ob.instanceMethod` 调用时，`@instvar` 增加 1。

在这里，在类和方法中我使用了一个小技巧，使用 Ruby 的 `instance_get_variable` 方法获取 `@instvar` 的值：

	puts("MyClass @instvar=#{MyClass.instance_variable_get(:@instvar)}")
	puts("ob @instvar= #{ob.instance_variable_get(:@instvar)}")

因为我们只增加属于对象 `ob` 的 `@instvar`，所以当 `for` 循环执行时，`@instvar` 的值从 1 上升到 3。但是属于 MyClass 类的 `@instvar` 永远不会增加; 它保持在初始值（1000）...

	1000
	--------------
	MyClass @instvar= 1000
	ob @instvar= 1
	MyClass @instvar= 1000
	ob @instvar= 2
	MyClass @instvar= 1000
	ob @instvar= 3

但现在，取消掉这一行的注释...

	MyClass.classMethod

现在调用一个类方法，它将 `@instvar` 增加 10。这次当你运行程序时，你会看到，像以前一样，`ob` 的 `@instvar` 变量在每次循环中增加 1 而 MyClass 的 `@instvar` 变量则会增加 10 ...

	1000
	--------------
	MyClass @instvar= 1010
	ob @instvar= 1
	MyClass @instvar= 1020
	ob @instvar= 2
	MyClass @instvar= 1030
	ob @instvar= 3

<div class="note">
	<p class="h4"><b>一个类是一个对象</b></p>

要理解这一点，只需记住*一个类是一个对象*（实际上，它是 `Class` 类的一个实例！）。MyClass '类对象'（class object）有自己的实例变量（`@instvar`），就像 `ob` 对象有自己的实例变量（在这里，也恰好称为 `@instvar`）。实例变量对于对象实例始终是唯一的 - 因此没有两个对象（甚至像 MyClass 这样恰好是一个类的对象！）可以共享一个实例变量。
</div>

### 类方法的用途？

但是，有人可能会问，为什么你想要创建一个类方法而不是更常用的实例方法呢？有两个主要原因：首先，类方法可以用作“准备运行的函数”，而省去了为了使用它而创建对象的麻烦；其次，它可以在那些需要在创建对象实例之前运行方法的场合使用。

有关将方法用作“准备运行函数”的几个示例，请查看 File 类。它的许多方法都是类方法。这是因为，在大多数情况下，你将使用它们对现有文件执行操作或返回信息。你不需要创建一个 File 对象来执行这些操作，将文件名作为参数传递给类方法即可。这里有一些示例：

<div class="code-file clearfix"><span>file_methods.rb</span></div>

	fn = 'file_methods.rb'

	if File.exist?(fn) then
	  puts(File.expand_path(fn))
	  puts(File.basename(fn))
	  puts(File.dirname(fn))
	  puts(File.extname(fn))
	  puts(File.mtime(fn))
	  puts("#{File.size(fn)} bytes")
	else
	  puts( "Can't find file!")
	end

在创建对象之前需要使用方法的情况下，类方法是至关重要的。最重要的例子是 `new` 方法。

你在每次创建对象时都会调用 `new` 方法。在创建对象实例之前，你显然无法调用其任一实例方法 - 因为你只能从已存在的对象中调用实例方法。当你使用 `new` 时，你正在调用类本身的方法并告诉类创建自己的新实例。

### Ruby 构造方法：new 还是 initialize？

负责使对象生成的方法称为构造方法。在 Ruby 中，构造方法称为 `new`。`new` 方法是一个类方法，一旦创建了一个对象，如果名为 `initialize` 的实例方法存在的话，就会运行它。

简而言之，`new` 方法是构造方法，并使用 `initialize` 方法在创建对象后立即初始化任意变量的值。但是为什么你不能编写自己的 `new` 方法并在其中初始化变量？让我们尝试一下：

<div class="code-file clearfix"><span>new.rb</span></div>

	class MyClass
	  def initialize(aStr)
		@avar = aStr
	  end

	  def MyClass.new(aStr)
		super
		@anewvar = aStr.swapcase
	  end
	end

	ob = MyClass.new("hello world")
	puts(ob)
	puts(ob.class)

在这里，我使用 `super` 关键字调用默认的 `new` 构造方法，超类的 `new` 方法。然后我创建了一个字符串实例变量 `@anewvar`。那么我最终会得到什么呢？正如你可能想的那样，不是包含几个字符串变量的新 MyClass 对象。请记住，Ruby 中的方法计算的最后一个表达式是该方法返回的值。这里 `new` 方法计算的最后一个表达式是一个字符串。所以，当我计算这...

	ob = MyClass.new("hello world")

... `MyClass.new` 返回一个字符串；并且它是这个被分配给 `ob` 的字符串（不是 MyClass 对象）。因为你不太可能想要做这样的事情，所以通常明智的做法是避免尝试覆盖（override）`new` 方法。

### 单例方法

<div class="code-file clearfix"><span>class_classes.rb</span></div>

单例方法（singleton method）是属于单个对象而不是整个类的方法。Ruby 类库中的许多方法都是单例方法。如前所述，这是因为每个类都是 Class 类型的对象。或者，简单地说：每个类的类都是 Class。所有类都是如此 - 无论是你自己定义的类还是 Ruby 类库提供的类：

	class MyClass
	end
	puts( MyClass.class )  #=> Class
	puts( String.class )   #=> Class
	puts( Object.class )   #=> Class
	puts( Class.class )    #=> Class
	puts( IO.class )       #=> Class

现在，一些类也有类方法 - 即属于 Class 对象本身的方法。从这个意义上讲，这些是 Class 对象的单例方法。实际上，如果你执行以下代码，将显示一个与 IO 类的类方法名称匹配的方法名称数组：

	p(IO.singleton_methods)

如前所述，当你编写自己的类方法时，可以通过在方法名前加上类的名称来实现：

	def MyClass.classMethod

事实证明，在为特定对象创建单例方法时，你可以使用类似的语法。这次你在方法名称前加上对象的名称：

	def myObject.objectMethod

<div class="code-file clearfix"><span>class_hierarchy.rb</span></div>

<div class="note">
	<p class="h4"><b>所有 Ruby 对象都是 Object 类的后代...</b></p>

...也包括 `Class` 类！初看起来很奇怪，实际上创建对象的每个类本身就是一个从 `Object` 类继承的对象。要证明这一点，请尝试 **class_hierarchy.rb** 程序：

	def showFamily( aClass )
	  if (aClass != nil) then
		puts( "#{aClass} :: about to recurse with aClass.superclass = #{aClass.superclass}" )
		showFamily( aClass.superclass )
	  end
	end
</div>

让我们看一个具体的示例。假设你有一个程序包含许多不同物种的生物对象（也许你是兽医，或者动物园管理员，或者像本书的作者一样，是一个热情的冒险游戏玩家）；每个生物都有一个名为 `talk` 的方法，它显示每个生物通常发出的声音。

这是我的 Creature 类和一些生物对象：

<div class="code-file clearfix"><span>singleton_meth1.rb</span></div>

	class Creature
	  def initialize( aSpeech )
		@speech = aSpeech
	  end

	  def talk
		puts( @speech )
	  end
	end

	cat = Creature.new("miaow")
	dog = Creature.new("woof")
	budgie = Creature.new("Who's a pretty boy, then!")
	werewolf = Creature.new("growl")

然后你突然意识到其中一个生物有额外的特殊行为。在满月之夜，狼人（werewolf）不仅会说话（咆哮）；它也会嚎叫（“How-oo-oo-oo-oo！”）。它确实需要一个 `howl` 方法。

你可以回头向 Creature 类添加一个这样的方法，但是你最终也会得到会嚎叫的狗，猫和虎皮鹦鹉 - 这并不是你想要的。你可以创建一个新的继承自 Creature 的 Werewolf 类，但是你只会有一个狼人（唉，它们是濒临灭绝的物种），所以为什么你要创建一个完整的类呢？一个 werewolf 对象除了它有一个 `howl` 方法之外，与其它生物对象都一样是不是更有意义？好吧，让我们通过给狼人（werewolf）提供它自己的单例方法来做到这一点。来吧：

	def werewolf.howl
	  puts("How-oo-oo-oo-oo!")
	end

哎呀，我们可以做得更好！它只会在满月时嚎叫（howls），所以让我们确定如果要求在新月时嚎叫，它就会咆哮（growls）。这是我的完成方法：

	def werewolf.howl
	  if FULLMOON then
		puts( "How-oo-oo-oo-oo!" )
	  else
		talk
	  end
	end

请注意，即使此方法已在 Creature 类之外声明，它也可以调用实例方法 `talk`。那是因为 `howl` 方法现在存在于 werewolf 对象内部，因此在该对象中具有与 `talk` 方法相同的作用域。然而，它不会存在于任何狼人（werewolf）的同伴生物之中; `howl` 方法属于它并仅属于它一个。尝试执行 `budgie.howl`，Ruby 会告诉你 `howl` 是一个未定义（undefined）的方法。

现在，如果你正在调试供自己使用的代码，那么由于未定义的方法导致程序奔溃可能是可以接受的；但如果你的程序在“终端用户”这个庞大而恶劣的环境中发生这样的情况，那绝对是不可接受的。

如果你认为未定义的方法可能是一个问题，你可以采取避免措施，在使用单例方法之前测试是否存在该单例方法。Object 类有一个 `singleton_methods` 方法，它返回一个包含单例方法名称的数组。你可以使用 Array 类的 `include?` 方法来测试方法名称是否包含在数组中。例如，在 **singleton_meth2.rb** 中，我编写了一个“打开盒子”的游戏，有许多 Box 对象，只有其中一个在打开时获得星星奖励。我已经将这个特殊的 Box 对象命名为 **star-prize** 并给它一个单例方法 `congratulate`：

<div class="code-file clearfix"><span>singleton_meth2.rb</span></div>

	starprize = Box.new( "Star Prize" )
	def starprize.congratulate
	  puts( "You've won a fabulous holiday in Grimsby!" )
	end

当 **starprize** 盒子被打开时 `congratulate` 方法会被调用。这段代码（其中 `item` 是一个 Box 对象）确保了当其它盒子被打开时这个方法（在其它对象中不存在）不会被调用。

	if item.singleton_methods.include?("congratulate") then
	  item.congratulate
	end

检查方法有效性的另一种方法是将该方法名称作为符号（以冒号开头的标识符）传递给 Object 类的 `respond_to?` 方法：

	if item.respond_to?(:congratulate) then
	  item.congratulate
	end

<div class="note">
我们将在第 20 章中讨论处理不存在的方法的另一种方式。
</div>

### 单例类

单例方法是属于单个对象的方法。另一方面，单例类（singleton class）则是定义单个对象的类。感到困惑？我也是。那么让我们仔细看看这些令人讨厌的东西...

假设你创建了几十个对象，每个对象都是 Object 类的一个实例。自然的，它们都可以访问 Object 类的常用方法，例如 `inspect` 和 `class`。但是现在你决定只想要一个特殊的对象（为了区别，让我们称之为 `ob`），它有一个特殊的方法（让我们称之为 `blather`）。

你不希望为此对象定义一个全新的类，因为你永远不会再创建更多拥有 `blather` 方法的对象。 所以你特别针对 `ob` 创建了一个类。

你无需为该类命名。你只需要通过在 class 关键字和对象名之间放置一个 `<<` 符号将它本身附加到 `ob` 上。然后你可以以通常的方式在类中添加代码：

<div class="code-file clearfix"><span>singleton_class.rb</span></div>

	ob = Object.new
	# singleton class
	class << ob
	  def blather( aStr )
		puts("blather, blather #{aStr}")
	  end
	end

现在 `ob`，并且只有 `ob`，不仅拥有 Object 类的所有常用方法；它也拥有了（这里只有 `blather` 方法，但原则上可以有更多）自己特殊的匿名类（anonymous class）中的方法：

	ob.blather( "weeble" )  #=> “blather, blather weeble”

如果你一直在密切关注，你可能已经注意到单例类（singleton class）似乎正在做一些与单例方法（singleton method）类似的事情。使用单例类，我可以创建一个对象，然后在匿名类中打包添加额外的方法。使用单例方法，我可以创建一个对象，然后逐个添加方法：

	ob2 = Object.new

	def ob2.blather( aStr ) # <= this is a singleton method
	  puts( "grippity, grippity #{aStr}" )
	end

	ob2.blather( "ping!" )  #=> grippity, grippity ping!

<div class="code-file clearfix"><span>singleton_class2.rb</span></div>

同样地，我可以重写 "star prize" 程序。在之前的版本中一个名为 `starprize` 的对象添加了一个单例方法，`congratulate`。我也可以很容易地创建一个包含 `congratulate` 方法的单例类：

	starprize = MyClass.new( "Star Prize" )

	class << starprize
	  def congratulate
		puts( "You've won a fabulous holiday in Grimsby!" )
	  end
	end

事实上，相似性不仅限于表面。上面代码的最终结果是 congratulate 成为 `starprize` 的单例方法，并且我已经使用此测试进行了验证：

	if item.singleton_methods.include?("congratulate")

<div class="note">
	<p class="h4"><b>单例方法，单例类 - 有什么区别？</b></p>

简单的说：区别不大。这两种语法提供了向特定对象添加方法，而不是将这些方法构建到其定义类中的不同实现方式。
</div>

### 重写方法（Overriding）

有时你可能想要重新定义某个类中已存在的方法。之前我们已经这样做过了，例如，我们创建了一些类它们自己的 `to_s` 方法来返回字符串的表示。从 Object 向下的每个 Ruby 类都有一个 `to_s` 方法。Object 类的 `to_s` 方法返回类名和对象唯一标识符的十六进制表示形式。但是，许多 Ruby 类都有自己特殊的 `to_s` 版本。例如，Array.to_s 连接并返回数组中的元素值。

当一个类中的方法替换祖先类中的同名方法时，它被称为“重写”（override）该方法。你可以重写标准类库中定义的方法，例如 `to_s`，以及你自己的类中定义的方法。如果你需要向现有方法添加一些新的行为，请记住在重写方法的开头使用 `super` 关键字调用超类的方法。这是一个例子：

<div class="code-file clearfix"><span>override.rb</span></div>

	class MyClass
	  def sayHello
		return "Hello from MyClass"
	  end

	  def sayGoodbye
		return "Goodbye from MyClass"
	  end
	end

	class MyOtherClass < MyClass
	  def sayHello     #overrides (and replaces) MyClass.sayHello
		return "Hello from MyOtherClass"
	  end

	  # overrides MyClass.sayGoodbye but first calls that method
	  # with super. So this version "adds to" MyClass.sayGoodbye
	  def sayGoodbye
		return super << " and also from MyOtherClass"
	  end

	  # overrides default to_s method
	  def to_s
		return "I am an instance of the #{self.class} class"
	  end
	end

### public, private 和 protected

在某些情况下，你可能希望限制方法的“可见性”（visibility），以确保定义方法的类之外的代码不能调用它们。

当你的类定义了它所需的各种“实用的”（utility）工具方法以执行它不打算公开使用的某些功能时，这将是很有用的。通过对这些方法施加访问限制，你可以阻止程序员将它们用于自己的恶意目的。这也意味着你将能够在以后阶段中更改这些方法的实现，而不必担心你将破坏其他人的代码。

Ruby 提供了三个级别的方法可访问性：

	public
	protected
	private

顾名思义，`public` 方法是最容易访问的，`private` 方法是最不易访问的。除非另有说明，否则你编写的所有方法都是公开（public）的。当一个方法是公共（public）的时，它可以被定义该对象的整个类之外的环境使用。

当方法是**私有**（`private`）的时，它只能由定义该对象的类内的其它方法使用。

一个**受保护**（`protected`）的方法通常以与私有方法相同的方式工作，但具有一个微小但重要的区别：除了对当前对象的方法可见之外，受保护的方法对于具有相同类型并且处于第一个对象作用域内的第二个对象也是可见的。

当你看一个可运行的示例时，私有和受保护方法之间的区别可能更容易理解。考虑这个类：

<div class="code-file clearfix"><span>pub_prot_priv.rb</span></div>

	class MyClass

	  private
	  def priv
		puts( "private" )
	  end

	  protected
	  def prot
		puts( "protected" )
	  end

	  public
	  def pub
		puts( "public" )
	  end

	  def useOb( anOb )
		anOb.pub
		anOb.prot
		anOb.priv
	  end
	end

我已经声明了三个方法，每个方法都有一个级别的可访问性。这些级别是通过在一个或多个方法之前放置 `private`，`protected` 或 `public` 来设置的。在指定其它某些访问级别之前，指定的可访问性级别对所有后续方法保持有效。

<div class="note">

**注意**：`public`，`private` 和 `protected` 可能看起来像关键字。但事实上，它们是 Module 类的方法。

</div>

最后，我的类有一个公共方法 `useOb`，它将 `MyOb` 对象作为一个参数并调用该对象的三个方法 `pub`，`prot` 和 `priv`。现在让我们看看如何使用 MyClass 对象。首先，我将创建该类的两个实例：

	myob = MyClass.new
	myob2 = MyClass.new

现在，我尝试依次调用这三个方法...

	myob.pub  # This works! Prints out "public"
	myob.prot # This doesn't work! I get a 'NoMethodError'
	myob.priv # This doesn't work either - another 'NoMethodError'

从上面可以看出，公共（public）方法在调用的对象之外的环境中（正如预期的那样）是可见的。但私有（private）和受保护（protected）的方法都是不可见的。所以，受保护的方法的用途是什么？另一个示例应该有助于理解这一点：

	myob.useOb( myob2 )

这一次，我调用了 `myob` 对象的公共方法 `useOb`，并且我将第二个对象 `myob2` 作为参数传递给它。需要注意的重要一点是 `myob` 和 `myob2` 是同一个类的实例。现在，回想一下我之前说过的话：

> *除了对当前对象的方法可见之外，受保护的方法对于具有相同类型并且处于第一个对象作用域内的第二个对象也是可见的。*

这可能听起来像官方话（gobbledygook）。让我们看看是否可以分析一下来理解它。

在程序中，第一个 MyClass 对象（此处为 `myob`）在当 `myob2` 作为参数传递给它的方法时，在它的作用域内就有了第二个 MyClass 对象。当发生这种情况时，你可以认为 `myob2` 存在于 `myob` 内部。现在 `myob2` 共享了容器（containing）对象 `myob` 的作用域。在这种特殊情况下 - 当同一个类的两个对象在该类定义的作用域内时 - 该类的任何对象的受保护（protected）方法将变得可见。

在本例中，`myob2`（这里名为 `anob` 的参数 - '接收'了 `myob2`）的受保护方法 `prot` 变得可见并且可以被执行。然而，它的私有方法仍然是不可见的：

	def useOb( anOb )
	  anOb.pub
	  anOb.prot  # protected method can be called
	  anOb.priv  # but calling a private method results in an error
	end

## 深入探索

### 子类中的 protected 和 private

调用父类和子类的对象上的方法时，适用相同的访问规则。也就是说，当你传递给一个方法一个对象（作为一个参数），该对象与接收者对象（即方法所属的对象）具有相同的类，参数对象可以调用类的 public 和 protected 方法，但不能调用其 private 方法。

<div class="code-file clearfix"><span>protected.rb</span></div>

有关此示例，请查看 **protected.rb** 程序。在这里，我创建了一个名为 `myob` 的 MyClass 对象和一个 MyOtherClass 对象 `myotherob`，并且 MyOtherClass 继承自 MyClass。我尝试将 `myotherob` 作为参数传递给 `myob` 的公共方法，`shout`：

	myob.shout( myotherob )

但是 `shout` 方法在参数对象上调用 private 方法 `priv`：

	def shout( anOb ) # calls a private method
	  puts( anOb.priv( "This is a #{anOb.class} - hurrah" ) )
	end

这将不能运行！Ruby 解释 `priv` 方法是私有的。

同样，如果我反过来这样做 - 也就是说，通过将父类对象 `myob`作为参数传递，并在子类对象上调用方法 `shout`，我会得到同样的错误：

	myotherob.shout( myob )

MyClass 类还有另一个公共方法，`exclaim`。这次会调用一个 protected 方法，`prot`：

	def exclaim( anOb ) # calls a protected method
	  puts( anOb.prot( "This is a #{anOb.class} - hurrah" ) )
	end

现在，我可以将 MyClass 对象 `myob` 或 MyOtherClass 对象 `myotherob` 作为参数传递给 `exclaim` 方法，并且在调用 protected 方法时都不会发生错误：

	myob.exclaim( myotherob )  # This is OK
	myotherob.exclaim( myob )  # And so is this…

不用说，这仅在两个对象（接收器和参数）共享相同的继承链时才有效。如果发送不相关的对象作为参数，则无论其保护级别如何，你都无法调用接收器对象所属类的方法。

### 突破 private 方法的隐私限制

私有方法的重点在于它不能从它所属的对象作用域之外被调用。所以这将不起作用：

<div class="code-file clearfix"><span>send.rb</span></div>

	class X
	  private
	  def priv( aStr )
		puts("I'm private, " << aStr)
	  end
	end

	ob = X.new
	ob.priv( "hello" ) # This fails

然而，事实证明 Ruby 以一种叫做 `send` 方法的形式提供了一个'get out'子句（或者我应该说'get in'子句？）。`send` 方法调用方法名称与符号（一个以冒号开头的标识符，例如 `:priv`）相匹配的方法，该方法名称作为第一个参数传递给 `send`，如下所示：

	ob.send( :priv, "hello" )  # This succeeds

符号后面提供的任何参数（如字符串，"hello"）都以正常方式传递给指定的方法。

可以说使用 `send` 获取私有方法的公共访问权通常不是一个好主意（否则，为什么你首先将该方法设为私有的），所以应谨慎使用或根本不使用...

### 单例类方法

之前，我们通过将方法名称附加到类的名称后面来创建类方法（class method），如下所示：

	def MyClass.classMethod

有一种“快捷”语法。这是个示例：

<div class="code-file clearfix"><span>class_methods3.rb</span></div>

	class MyClass
	  def MyClass.methodA
		puts("a")
	  end

	  class << self
		def methodB
		  puts("b")
		end

		def methodC
		  puts("c")
		end
	  end
	end

这里，`methodA`，`methodB` 和 `methodC` 都是 MyClass 的类方法；`methodA` 是使用我们之前使用的语法声明的：

> def &lt;ClassName&gt;.&lt;methodname&gt;

但是,使用实例方法的语法声明了 `methodB` 和 `methodC`：

> def &lt;methodname&gt;

那么为什么它们最终成为类方法呢？这完全归结于方法声明已放在此代码中：

	class << self
	  # some method declarations
	end

这可能会让你想起用于声明单例类（singleton classe）的语法。例如，在 **singleton_class.rb** 程序中，你可能还记得我们首先创建了一个名为 `ob` 的对象，然后给它声明了一个自己的方法，`blather`：

	class << ob
	  def blather( aStr )
		puts("blather, blather #{aStr}")
	  end
	end

这里的 `blather` 方法是 `ob` 对象的单例方法（singleton method）。类似地，在 **class_methods3.rb** 程序中，`methodB` 和 `methodC` 方法是 `self` 的单例方法，而 `self` 恰好是 MyClass 类。我们可以类似地通过使用 `<<` 后跟类名来从类定义之外添加单例方法，如下所示：

	class << MyClass
	  def methodD
		puts( "d" )
	  end
	end

### 嵌套方法

你可以嵌套（nest）方法（将一个方法嵌套在另一个方法中）。这为你提供了一种将长方法划分为可重用块的方式。因此，例如，如果方法 `x` 需要在几个不同的点进行 `y` 计算，则可以将 `y` 方法放在 `x` 方法中：

<div class="code-file clearfix"><span>nested_methods.rb</span></div>

	class X

	  def x
		print( "x:" )

		def y
		  print("ha! ")
		end

		def z
		  print( "z:" )
		  y
		end

		y
		z
	  end

	end

嵌套方法默认在定义它们的作用域之外是不可见的。因此，在上面的示例中，虽然可以从 `x` 内部调用 `y` 和 `z`，但是任何其它代码都不能调用它们：

	ob = X.new
	ob.y #<= error
	ob.z # <= error

但是，当你运行一个包含嵌套方法的方法时，这些嵌套方法将被带入该方法之外的作用域内！

<div class="code-file clearfix"><span>nested_methods2.rb</span></div>

	class X
	  def x
		print( "x:" )

		def y
		  print("y:")
		end

		def z
		  print( "z:" )
		  y
		end
	  end
	end

	ob = X.new
	ob.x #=> x:
	puts
	ob.y #=> y:
	puts
	ob.z #=> z:y:

### 方法名称

最后一点，值得一提的是 Ruby 中的方法名称几乎总是以小写字符开头，如下所示：

	def fred

但是，这只是一个习惯约定，而非必须的。也可以用大写字母开头的方法名称，如下所示：

	def Fred

由于 `Fred` 方法看起来像一个常量（以大写字母开头），因此你需要在调用它时添加括号来告诉 Ruby，它是一个方法：

<div class="code-file clearfix"><span>method_names.rb</span></div>

	Fred   # <= Ruby complains "uninitialized" constant
	Fred() # <= Ruby calls the Fred method

总的来说，最好坚持使用以小写字符开头的方法名称的约定。