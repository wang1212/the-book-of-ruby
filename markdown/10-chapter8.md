---

	{
		"title": "第八章",
		"ctime": "2018-12-01 10:30:00",
		"mtime": "2018-12-01 10:30:00"
	}

---

# 第八章

***

## 传递参数和返回值

在本章中，我们将研究传递参数和给方法返回值以及从方法获得返回值的许多效果和副作用。首先，让我们花点时间总结一下我们现在使用的方法类型：

<div class="code-file clearfix"><span>methods.rb</span></div>

### 1. 实例方法

实例方法（instance method）在类定义中声明，旨在供类的特定对象或“实例”（instance）使用，如下所示：

	class MyClass
	  # declare instance method
	  def instanceMethod
		puts( "This is an instance method" )
	  end
	end

	# create object
	ob = MyClass.new
	# use instance method
	ob.instanceMethod

### 2. 类方法

在这两种情况下，类方法（class method）可以在类定义中声明：a）类名在方法名之前；b）`class << self` 块包含'普通'（normal）的方法声明。无论哪种方式，类方法都是由类本身使用，而不是由特定对象使用，如下所示：

	class MyClass
	  # a class method
	  def MyClass.classmethod1
		puts( "This is a class method" )
	  end

	  # another class method
	  class << self
		def classmethod2
		  puts( "This is another class method" )
		end
	  end
	end

	# call class methods from the class itself
	MyClass.classmethod1
	MyClass.classmethod2

### 3. 单例方法

单例方法（singleton method）是添加到单个对象的方法，不能被其他对象使用。单例方法可以通过将方法名称附加到对象名称后跟一个点或者通过将“普通”（normal）方法定义放在 `<ObjectName> << self` 块中来定义，如下所示：

	# create object
	ob = MyClass.new

	# define a singleton method
	def ob.singleton_method1
	  puts( "This is a singleton method" )
	end

	# define another singleton method
	class << ob
	  def singleton_method2
		puts( "This is another singleton method" )
	  end
	end

	# use the singleton methods
	ob.singleton_method1
	ob.singleton_method2

### 返回值

在许多编程语言中，一个差异是函数（function）或方法（method）是否会将值返回给调用代码。例如，在 Pascal 中，函数（function）会返回一个值，但例程（procedure）不会。在 Ruby 中没有这样的区别差异。所有方法总是返回一个值，当然，你不一定使用它。

<div class="code-file clearfix"><span>return_vals.rb</span></div>

如果未指定返回值，则 Ruby 方法返回最后一个计算表达式的结果。考虑这个方法：

	def method1
	  a = 1
	  b = 2
	  c = a + b # returns 3
	end

计算的最后一个表达式是 `a + b`，它恰好返回 3，因此这是该方法返回的值。有时候你可能不想要返回最后计算的表达式的结果。在这种情况下，你可以使用 `return` 关键字显式指定返回值：

	def method2
	  a = 1
	  b = 2
	  c = a + b
	  return b # returns 2
	end

方法不一定要进行任何赋值操作以提供返回值。一些简单的数据（即，对其自身求值），如果这恰好是方法中计算的最后一个操作，这将作为返回值。如果没有计算任何东西，则返回 `nil`：

	def method3
	  "hello" # returns "hello"
	end

	def method4
	  a = 1 + 2
	  "goodbye" # returns "goodbye"
	end

	def method5
	end # returns nil

我自己的编程习惯是编写尽可能清晰明确的代码。出于这个原因，每当我打算使用方法的返回值时，我更喜欢使用 `return` 关键字显式指定它；只有当我不打算使用返回值时，我才会省略它。但是，这不是强制性的 - Ruby 给了你选择的权利。

### 返回多个值

但是当你需要一个方法来返回多个值时呢？在其它编程语言中你可以通过传递一个引用（reference）参数（指向原始数据的指针）而不是值参数（数据的副本）来间接实现；当你更改了引用参数的值时，你在没有显式的返回值给调用代码的情况下就修改了原始值。

Ruby 没有对"引用"（by reference）和"值"（by value）进行区分，所以我们无法使用这种技术（大多数时候，尽管我们很快会看到规则的一些例外）。但是，Ruby 能够一次性返回多个值，如下所示：

<div class="code-file clearfix"><span>return_many.rb</span></div>

	def ret_things
	  greeting = "Hello world"
	  a = 1
  	b = 2.0
	  return a, b, 3, "four", greeting, 6 * 10
	end

多个返回值会被放入数组中。如果您要运行 `ret_things.class`，Ruby 会告诉你返回的对象是一个 Array。

但是，你可以显式的指定一个不同类型的集合，例如 Hash：

	def ret_hash
	  return {'a'=>'hello', 'b'=>'goodbye', 'c'=>'fare thee well'}
	end

### 默认参数和多参数

Ruby 允许你指定参数的默认值。可以使用通常的赋值运算符在方法的参数列表中指定默认值：

	def aMethod( a=10, b=20 )

如果将未赋值的变量传递给该方法，则将为其分配默认值。但是，如果传递了赋值的变量，则为其赋的值优先于默认值：

	def aMethod( a=10, b=20 )
	  return a, b
	end

	p( aMethod )        #=> displays: [10, 20]
	p( aMethod( 1 ))    #=> displays: [1, 20]
	p( aMethod( 1, 2 )) #=> displays: [1, 2]

在某些情况下，方法可能需要能够接收不确定数量的参数 - 例如，处理可变长度的项列表的方法。在这种情况下，您可以“删除”任意数量的尾随参数，然后在最后一个参数前面加上星号：

<div class="code-file clearfix"><span>default_args.rb</span></div>

	def aMethod( a=10, b=20, c=100, *d )
	  return a, b, c, d
	end

	p( aMethod( 1,2,3,4,6 ) ) #=> displays: [1, 2, 3, [4, 6]]

### 赋值和参数传递

大多数情况下，Ruby 方法有两个接入点 - 比如进出房间的门。参数列表提供了入口；返回值提供了出口。对输入参数的修改不会影响原始数据，原因很简单，当 Ruby 计算表达式时，该计算结果会创建一个新对象 - 因此对参数所做的任何更改只会影响新对象，而不会影响原始对象数据。但是这个规则有例外，我们稍后会看到这样的示例。

<div class="code-file clearfix"><span>in_out.rb</span></div>

让我们从最简单的情况开始：一个方法，它将获取一个值，其作为命名参数，并返回另一个值：

	def change( x )
	  x += 1
	  return x
	end

从表面上看，你可能会认为我们正在处理单个对象 `x`，这里：对象 `x` 进入 `change` 方法并返回同一个对象 `x`。事实上，情况并非如此。一个对象进入（参数），出来的是一个不同的对象（返回值）。你可以轻松验证这一点，使用 `object_id` 方法以显示程序中每个对象的唯一标识数字：

	num = 10
	puts( "num.object_id=#{num.object_id}" )
	num = change( num )
	puts( "num.object_id=#{num.object_id}" )

在调用 `change` 方法之前和之后，变量 `num` 的标识符是不同的。这表明，即使变量名保持不变，`change` 方法返回的 `num` 对象也不同于发送给它的 `num` 对象。

<div class="code-file clearfix"><span>method_call.rb</span></div>

方法调用本身与对象的更改无关。你可以通过运行 **method_call.rb** 来验证这一点。这只是将 `num` 对象传递给 `change` 方法并返回它：

	def nochange( x )
	  return x
	end

在这种情况下，返回之后的 `num` 与发送到方法之前的 `num` 的 `object_id` 相同。换句话说，进入方法的对象与再次出来的对象完全相同。这产生了一个必然的结论，即在 `change` 方法（`x += 1`）中有一些关于*赋值（assignment）*的行为导致创建了新的对象。

但是赋值行为本身并不能解释这个问题。如果只是为自己分配一个变量，则不会创建新对象...

<div class="code-file clearfix"><span>assignment.rb</span></div>

	num = 10
	num = num # a new num object is not created

那么，如果你为对象分配的值与已有的值相同怎么办？

	num = 10
	num = 10  # a new num object is not created

这表明单独的赋值必定不会创建新的对象。现在让我们尝试分配一个新值...

	num = 10
	num += 1  # this time a new num object is created

通过查看 `object_id`，我们可以确定当为现有的变量分配新值时，会创建一个新对象。

大多数数据项被视为是唯一的，因此一个字符串，"hello" 被认为与其它另一个字符串 "hello" 不同，以及一个浮点数 10.5 被认为与其它另一个浮点数 10.5 不同。因此，任何字符串（string）或浮点数（float）赋值操作都将创建一个新对象。

但是在处理整数（integer）时，只有当分配的值与前一个值不同时才会创建一个新对象。你可以在赋值运算符的右侧执行各种复杂的操作，但如果生成的值与原始值相同，则不会创建新对象...

	num = (((num + 1 - 1) * 100) / 100)  # a new object is not created!

<div class="code-file clearfix"><span>object_ids.rb</span></div>

### 整数是特殊的

在 Ruby 中，整数（integer，亦 Fixnum）具有固定的标识。数字 10 的每个实例或者赋值为 10 的每个变量将具有相同的 object_id。其它数据类型并非如此。浮点数（例如 10.5）或者字符串（例如 "hello world"）的每个实例都是具有唯一 object_id 的不同对象。请注意，当你为变量分配整数（integer）值时，该变量将具有整数值本身 object_id。但是，当你将某些其它类型的数据分配给变量时，即使每次分配的数据值本身相同，也会创建一个新对象：

	# 10 and x after each assignment are the same object
	puts( 10.object_id )
	x = 10
	puts( x.object_id )
	x = 10
	puts( x.object_id )

	# 10.5 and x after each assignment are 3 different objects!
	puts( 10.5.object_id )
	x = 10.5
	puts( x.object_id )
	x = 10.5
	puts( x.object_id )

但为什么这些都很重要？

答案是，因为该规则的一些罕见例外是相当重要的。正如我之前所说，大部分情况下，方法都有明确定义的入口和明确定义的出口。一旦参数进入方法，它就会进入一个封闭的空间。该方法之外的任何代码都无法了解对参数所做的任何更改，直到它以返回值的形式再次出来。事实上，这是“纯粹”（pure）的面向对象的深层秘密之一。原则上，方法的实现细节应该隐藏起来 - “封装”（encapsulated）。这可以确保对象外部的代码不能依赖于该对象内发生的事情。

### 进出原则

在大多数现代 OOP（面向对象编程）语言（如 Java 和 C#）中，封装（encapsulation）和信息隐藏并未严格执行。另一方面，在 Smalltalk 中 - 最著名和最有影响力的 OOP 语言 - 封装和信息隐藏是基本原则：如果将变量 `x` 发送到方法 `y`，并且在 `y` 内部更改 `x` 的值，则无法从方法外部获取 `x` 的更改值 - *除非方法显式返回该值*。

<div class="note">
	<p class="h4"><b>“封装”（Encapsulation）或“信息隐藏”（Information Hiding）？</b></p>

通常这两个术语可互换使用。但是，要进行挑选的话，则是存在差异的。

*封装（Encapsulation）*是指将对象的“状态”（state，其数据）与可能改变或询问其状态（方法）的操作组合在一起。

*信息隐藏（Information Hiding）*是指数据被封锁并且只能使用明确定义的路径进出访问这一事实 - 在面向对象的术语中，这意味着获取或返回值的“访问器方法”（accessor methods）。

在面向过程语言中，信息隐藏可能采取其它形式 - 例如，你可能必须定义接口以从代码“单元”或“模块”而不是对象中检索数据。

在 OOP 术语中，封装和信息隐藏几乎是同义词 - 真正的封装必然意味着隐藏了对象的内部数据。但是，许多现代的“OOP语言”，例如 Java，C#，C++ 和 Object Pascal，在强制执行信息隐藏的程度上（如果有的话）是非常宽容的。
</div>

通常，Ruby 遵循这个原则：参数进入方法，除非 Ruby 返回更改的值，否则无法从外部访问方法内的对该参数的任何更改：

<div class="code-file clearfix"><span>hidden.rb</span></div>

	def hidden( aStr, anotherStr )
	  anotherStr = aStr + " " + anotherStr
	  return aStr + anotherStr.reverse
	end

	str1 = "dlrow"
	str2 = "olleh"
	str3 = hidden(str1, str2) # str3 receives returned value
	puts( str1 )              # input args: original values unchanged
	puts( str2 )
	puts( str3 )              # returned value ( "dlrowhello world" )

事实证明，有时候传递给 Ruby 方法的参数可以像其它语言的'引用'（by reference）参数一样使用（也就是说，在方法内部进行的更改可能会影响方法之外的变量）。这是因为某些 Ruby 方法修改了原始对象，而不是生成值并将其分配给新对象。

例如，一些以感叹号结尾方法会修改原始对象。类似的，字符串的附加（append）方法 `<<` 将其右侧的字符串与左侧字符串连接起来的过程中没有创建新的对象：因此左侧字符串的值被修改，但字符串对象本身保留其原始的 `object_id`。

这样做的结果是，如果在方法中使用 `<<` 运算符而不是 `+` 运算符，则结果将更改：

<div class="code-file clearfix"><span>not_hidden.rb</span></div>

	def nothidden( aStr, anotherStr )
	  anotherStr = aStr << " " << anotherStr
	  return aStr << anotherStr.reverse
	end

	str1 = "dlrow"
	str2 = "olleh"
	str3 = nothidden(str1, str2)
	puts( str1 ) # input arg: changed ("dlrow ollehhello world")
	puts( str2 ) # unchanged
	puts( str3 ) # returned value("dlrow ollehhello world")

<div class="code-file clearfix"><span>str_reverse.rb</span></div>

**str_reverse.rb** 示例程序应该有助于解释清楚这一点。例如，这表明当你使用 `reverse` 方法时，不会对'接收对象'（receiver object，即 `str1` 这样的对象：`str1.reverse`）进行更改。但是当你使用 `reverse!` 方法对对象进行更改（使其字母顺序反转）。即便如此，也没有创建新对象：`str1` 是调用 `reverse!` 方法前后的同一个对象。

这里 `reverse` 像大多数 Ruby 方法一样运行 - 它产生一个值，为了使用该值，你必须将它分配给一个新对象。所以...

	str1 = "hello"
	str1.reverse

这里，`str1` 不受调用 `reverse` 的影响。它仍然具有值 'hello'，它仍然具有原始的 `object_id`。但是...

	str1 = "hello"
	str1.reverse!

这次，`str1` 改变了（变成了，'olleh'）。即便如此，也没有创建新对象：`str1` 具有与之前相同的 `object_id`。然后再次...

	str1 = "hello"
	str1 = str1.reverse

这次，`str1.reverse` 产生的值被分配给 `str1`。生成的值是一个新对象，因此 `str1` 现在被分配了反向字符串（'olleh'），现在它有一个新的 `object_id`。

有关字符串连接方法 `<<` 的示例，请参阅示例程序 **concat.rb**，像那些以 `!` 结尾的方法一样，会修改接收对象（receiver object）而不创建新对象：

<div class="code-file clearfix"><span>concat.rb</span></div>

	str1 = "hello"
	str2 = "world"
	str3 = "goodbye"
	str3 = str2 << str1

在这个示例中，`str1` 永远不会被修改，所以它始终具有相同的 `object_id`；`str2` 通过连接操作被修改。

但是，`<<` 运算符不会创建新对象，因此 `str2` 也会保留其原始 `object_id`。但 `str3` 最后是一个与开始不同的对象：这是因为它被赋值由这个表达式产生的值：`str2 << str1`。这个值恰好是 `str2` 对象本身，因此 `str3` 的 `object_id` 现在与 `str2` 的 `object_id` 相同（即 `str2` 和 `str3` 现在引用相同的对象）。

总之，以 `!` 结尾的方法，比如 `reverse!`，再加上一些其它方法，比如 `<<` 连接方法，会改变接收者对象（receiver object）本身的值。大多数其它方法不会修改接收对象的值，并且为了利用因调用方法而产生的任何新值，你必须将该值赋给变量（或将生成的值作为参数传递给一个方法）。

<div class="note">
	<p class="h4"><b>修改接收对象违背封装原则</b></p>

大多数方法看起来不是足够无害的，但事实上只有极少一部分方法会修改接受对象（receiver object）。但请注意：这种行为使你能够通过引用而不是显式的返回值来重新获取参数值。通过允许你的代码依赖于方法内部的实现细节，这样做会破坏封装（encapsulation）原则。这可能会导致不可预测的副作用，在我看来，应该避免这么做。
</div>

<div class="code-file clearfix"><span>side_effects.rb</span></div>

这是一个依赖于修改的参数值而不是显式的返回值，可能会对实现细节引入一些不必要的依赖关系的简单（但在实际编程中，可能是严重的）示例，请参阅 **side_effects.rb**。这里我们有一个名为 `stringProcess` 的方法，它接受两个字符串参数，将它们混淆并返回结果。假设练习的对象接收两个小写字符串并返回一个单独的字符串，该字符串会以空格分隔并且首字母和最后一个字母大写的方式组合这两个字符串。所以两个原始字符串可能是 "hello" 和 "world"，返回的字符串是 "Hello hellD"。

但现在我们有一个不耐烦的程序员，他不想使用返回值。他注意到在方法中进行的修改会改变进入参数的值。他注意到在方法中进行的修改会改变进入参数的值。哎呀！（他决定）他不妨使用参数自己来实现！然后他编写了一个非常复杂的文本处理系统，其中有数千块代码依赖于这两个参数被修改的值。

但是最初编写 `stringProcess` 方法的程序员现在觉得原来的实现是低效且不优雅的，因此决定重写代码，确信返回的值也不会变（如果 "hello" 和 "world" 作为参数发送，"Hello worlD" 将被返回）。

啊哈！但是新实现会导致输入参数的值在方法体内会被更改。所以，这位没有耐心的程序员的这个依赖于这些输入*参数*而不是返回值的文本处理系统，现在输入这些参数时会输出 "hello Dlrow"，而不是他期望的 "Hello worlD"（实际上，他的程序在处理莎士比亚（Shakespeare ）的作品时，最终划时代的艺术家会宣称："To
eb or ton to eb, that si the noitseuq..."）。这是一种意想不到的副作用，可以通过遵循单向输入（one-way-in）和单向输出（one-way-out）原则轻松避免。

### 并行赋值

我前面提到过，一个方法可以返回多个值，用逗号分隔。 通常，你需要将这些返回值分配给一组匹配变量。

在 Ruby 中，这可以通过并行赋值在单个操作中完成。这意味着你可以在赋值运算符的左侧使用多个变量，在右侧使用多个值。右侧的值将按顺序分配给左侧的变量，如下所示：

<div class="code-file clearfix"><span>parallel_assign.rb</span></div>

	s1, s2, s3 = "Hickory", "Dickory", "Dock"

这种能力不仅为你提供了进行多次赋值的快捷方式；它还允许你交换变量的值（你只需在赋值运算符的任一侧更改它们的顺序）：

	i1 = 1
	i2 = 2

	i1, i2 = i2, i1  #=> i1 is now 2, i2 is 1

并且你可以根据方法返回值进行多次赋值：

	def returnArray( a, b, c )
	  a = "Hello, " + a
	  b = "Hi, " + b
	  c = "Good day, " + c
	  return a, b, c
	end

	x, y, z = returnArray( "Fred", "Bert", "Mary" )

如果在左侧指定的变量多于赋值运算符右侧的值，则任何“尾随”变量都将分配为 `nil`：

	x, y, z, extravar = returnArray( "Fred", "Bert", "Mary" ) # extravar = nil

方法返回的多个值将放入数组中。当你将数组放在多变量赋值的右侧时，它的各个元素将分配给每个变量，如果提供的变量太多，则额外的将被分配为 `nil`：

	s1, s2, s3 = ["Ding", "Dong", "Bell"]

## 深入探索

### 引用或值传参

搜索互联网，你很快就会发现 Ruby 程序员经常会讨论 Ruby 是通过'值'（by value）还是'引用'（by reference）传递参数。

在诸如 Pascal 和 C 等许多面向过程编程语言及其衍生物中，通过值或通过引用传递参数之间存在明显的区别。

*'值'（by value）*参数是原始变量的副本；你可以将它传递给一个程序，修改它但是原始变量的值保持不变。

另一方面，*'引用'（by reference）*是一个指向原始变量的指针。当它传递给例程（procedure）时，你传递的不是新的副本，而是原始数据在内存中存储的地址引用。因此，在例程（procedure）中进行的任何更改都将对原始数据进行，并且必然会影响原始变量的值。

<div class="code-file clearfix"><span>arg_passing.rb</span></div>

实际上很容易解决这个问题。如果 Ruby 通过值传递，那么它会生成原始变量的副本，因此该副本将具有不同的 `object_id`。事实上，情况并非如此。尝试运行 **arg_passing.rb** 程序来证明这一点。

现在，很可能在某些情况下，参数的传递可以（“在幕后”）说是“按值”（by value）*实现*的。但是，这些实现细节应该是 Ruby 解释器和编译器的编写者而不是 Ruby 程序员的义务。事实很明显，如果你以'纯' OOP 方式编程 - 通过将参数传递给方法但只是随后使用这些方法返回的值 - 实现细节（通过值或通过引用）将不会给你带来任何意外后果。

然而，由于 Ruby 有时可以修改参数（例如使用如前所述的 `!` 或 `<<` 方法），一些程序员已经习惯使用参数本身的修改值（相当于在 C 中使用引用（By Reference）参数）而不是使用返回的值。在我看来，这是一种不好的做法。它使你的程序依赖于方法的实现细节，因此应该避免这么做。

### 赋值是拷贝还是引用？

我之前说过，当某个表达式产生一个值时会创建一个新对象。因此，例如，如果为名为 `x` 的变量分配新值，则赋值后的对象将与赋值之前的对象不同（即，它将具有不同的 `object_id`）：

	x = 10  # this x has one object_id
	x +=1   # and this x has a different one

但它不是因为赋值创建了新对象。而是新生成的值导致新对象被创建。在上面的示例中，`+=1` 是一个生成了新值的表达式（`x+=1` 等同于 `x=x+1`）。

简单的将一个变量赋值给另一个变量不会创建新对象。因此，假设你有一个名为 `num` 和另一个名为 `num2` 的变量。如果将 `num2` 赋值给 `num`，则两个变量都将引用同一个对象。你可以用 Object 类的 `equals?` 方法测试验证：

<div class="code-file clearfix"><span>assign_ref.rb</span></div>

	num = 11.5
	num2 = 11.5

	# num and num 2 are not equal
	puts( "num.equal?(num2) #{num.equal?(num2)}" )

	num = num2
	# but now they are equal
	puts( "num.equal?(num2) #{num.equal?(num2)}" )

<div class="code-file clearfix"><span>equal_tests.rb</span></div>

<div class="note">
	<p class="h4"><b>相等测试：`==` 或 `equal?`</b></p>

默认情况下（如 Ruby 的 Kernel 模块中所定义），当测试的两个对象都是同一个对象时，使用 `==` 的测试返回 `true`。因此，如果值相同但对象不同，它将返回 `false`：

	ob1 = Object.new
	ob2 = Object.new
	puts( ob1==ob2 ) #<= false

事实上，`==` 经常被诸如 String 之类的类重写，然后当值相同但对象不同时会返回 `true`：

	s1 = "hello"
	s2 = "hello"
	puts( s1==s2 ) #<= true

出于这个原因，当你想确定两个变量是否引用同一个对象时，最好使用 `equal?` 方法：

	puts( s1.equal?(s2) ) #<= false
</div>

### 什么时候两个对象是相同的？

作为一般规则，如果使用十个值初始化十个变量，则每个变量将引用一个不同的对象。例如，如果你创建两个这样的字符串...

<div class="code-file clearfix"><span>identical.rb</span></div>

	s1 = "hello"
	s2 = "hello"

...然后 `s1` 和 `s2` 将引用独立的对象。两个浮点数（float）也一样...

	f1 = 10.00
	f2 = 10.00

但是，如前所述，整数（integer）是不同的。创建具有相同值的两个整数，它们最终将引用相同的对象：

	i1 = 10
	i2 = 10

对于普通整数值而言就是 true。如果有疑问？请使用 `equal?` 方法测试两个变量或值是否引用完全相同的对象：

	10.0.equal?(10.0) # compare floats – returns false
	10.equal?(10)     # compare integers (Fixnums) – returns true

### 括号避免歧义

方法可以与局部变量共享相同的名称。例如，你可能有一个名为 `name` 的变量和一个名为 `name` 的方法。如果你习惯于在没有括号的情况下调用方法，那么这里是指方法还是变量是不明确的。括号再次避免含糊不清...

<div class="code-file clearfix"><span>parentheses.rb</span></div>

	greet = "Hello"
	name = "Fred"

	def greet
	  return "Good morning"
	end

	def name
	  return "Mary"
	end

	def sayHi( aName )
	  return "Hi, #{aName}"
	end

	puts( greet )            #<= Hello
	puts greet               #<= Hello
	puts( sayHi( name ) )    #<= Hi, Fred
	puts( sayHi( name() ) )  #<= Hi, Mary