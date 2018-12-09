---

	{
		"title": "第十章",
		"ctime": "2018-12-06 21:50:00",
		"mtime": "2018-12-03 21:50:00"
	}

---

# 第十章

***

## Blocks, Procs and Lambdas

当程序员谈论“块”（Block）时，它们通常意味着一些独立的“代码块”（chunks）。但是，在 Ruby 中一个 block 是特殊的。它是一个代码单元，有点像方法，但与方法不同的是它没有名称。为了有效的使用 block，您需要了解它们的特殊性和原因。这就是本章的全部内容...

### 什么是 Block？

思考这些代码：

<div class="code-file clearfix"><span>1blocks.rb</span></div>

	3.times do |i|
	  puts( i )
	end

很明显，这段代码实际上会执行三次。在每次连续的循环中 `i` 的值可能不是那么的明显。实际上，在这种情况下，`i` 的值将为 0,1 和 2。这是上面代码的另一种形式。这一次，block 由花括号限定，而不是由 `do` 和 `end`：

	3.times { |i|
	  puts( i )
	}

根据 Ruby 文档，`times` 是 Integer 类的一个方法（让我们称 Integer 为 `int`），它迭代一个块 `int` 次，并且传入从 0 到 `int` -1 的值'。所以，这里 block 中的代码运行 3 次；第一次运行时，变量 `i` 其值为 0；在后序循环中，`i` 将增加 1 直到达到最终值 2（即 `int`-1）。

请注意，上面的两个代码示例在功能上是相同的。Block 可以用花括号或 `do` 和 `end` 关键字括起来，程序员可以根据个人喜好使用任一语法。

<div class="note">

**注意：**一些 Ruby 程序员喜欢在当块的整个代码只有单行时用花括号来限定，而当块跨越多行时使用 `do..end`。我个人的意见是要统一，不管代码布局如何，我通常在分隔块时都使用花括号。通常，你选择的限定符对代码的行为没有任何影响 - 但请参阅本章后面有关“优先级规则”（precedence rules）的部分。
</div>

如果你熟悉类似 C 的语言（如 C# 或 Java），你应该会使用 Ruby 的花括号，就像在这些语言中一样，只需将独立的“块”（blocks）代码组合在一起 - 例如，条件计算结果为 true 时要执行的代码块。但情况并非如此。在 Ruby 中，块是一种特殊的结构，只能在非常特殊的情况下使用。

### 换行值得注意

Block 的开（opening）限定符必须与其关联的方法放在同一行。

这些是可以的...

	3.times do |i|
	  puts( i )
	end

	3.times { |i|
	  puts( i )
	}

但这些包含了语法错误...

	3.times
	do |i|
	  puts( i )
	end

	3.times
	{ |i|
	  puts( i )
	}

### 匿名函数

Ruby 的 block 可以被视为一种匿名函数（nameless function）或方法（method），并且其最常用于提供迭代列表项或范围值的一种方式。如果你之前从未遇到过匿名函数，这可能听起来像官方话（gobbledygook）。幸运的是，到本章结束时，事情会变得更加清晰。让我们回顾一下前面给出的简单示例。我说一个 block 就像一个匿名函数。以此块为例：

	{ |i|
	  puts( i )
	}

如果它作为普通的 Ruby 方法来编写，它看起来可能像这样：

	def aMethod( i )
	  puts( i )
	end

要调用该方法三次并将从 0 到 2 的值传递给它，我们可能会这样写：

	for i in 0..2
	  aMethod( i )
	end

当你创建一个匿名方法（即 block），在竖线之间声明的变量（例如 `|i|`）可以像命名方法的参数一样对待。我们将这些变量称为“块参数”（block parameters）。

再看看我之前的示例：

	3.times { |i|
	  puts( i )
	}

整数的 `times` 方法将从 0 到具体整数值减去 1 的值传递给块。

所以：

	3.times{ |i| }

...非常像：

	for i in 0..2
	  aMethod( i )
	end

主要区别在于第二个示例必须调用其它一些命名方法来处理 `i` 的值，而第一个示例使用匿名方法（花括号之间的代码）来处理 `i`。

### 看起来眼熟？

既然你现在知道 Block 是什么了，你可能会注意到你之前见过它们很多次。

例如，我们之前使用 `do..end` 块来迭代范围（ranges）：

	(1..3).each do |i|
	  puts(i)
	end

我们还使用了 `do..end` 块来迭代数组（参见第 5 章中的 **for_each2.rb**）：

	arr = ['one','two','three','four']
	arr.each do |s|
	  puts(s)
	end

我们通过将它传递给 `loop` 方法来重复执行一个 block（参见第 5 章中的 **3loops.rb**）：

	i=0
	loop {
	  puts(arr[i])
	  i+=1
	  if (i == arr.length) then
		break
	  end
	}

上面的 `loop` 示例在两方面是很明显的：1）它没有要迭代的项目列表（例如数组或范围值）；2）它非常难看。这两个特点并非完全不相关！`loop` 方法是 Kernel 类的一部分，它可以“直接”（automatically）用于你的程序。由于它没有'结束值'（end value），它将永远执行该 block，除非你明确地使用 `break` 关键字中断它。通常有更优雅的方式来执行这种迭代 - 通过迭代一系列有限范围的值。

### 块和数组

块（Blocks）通常用于迭代数组（Array）。 因此，Array 类提供了许多可以传递块的方法。

一个有用的方法 `collect`；会将数组的每个元素传递给一个 block，并创建一个新数组以包含该 block 返回的每个值。例如，这里的一个 block 会被传入一个数组中的每个整数（每个整数被分配给变量 `x`），它将其值加倍并返回它。

`collect` 方法会创建一个包含了每个按顺序返回的整数的新数组：

<div class="code-file clearfix"><span>2blocks.rb</span></div>

	b3 = [1,2,3].collect{|x| x*2}

上面的示例返回这个数组：`[2,4,6]`。

在下一个示例中，block 返回原始字符串每个首字母大写的一个版本：

	b4 = ["hello","good day","how do you do"].collect{|x| x.capitalize }

所以 `b4` 现在是...

	["Hello", "Good day", "How do you do"]

Array 类的 `each` 方法看起来与 `collect` 类似；它也依次传递每个数组元素以由 block 处理。但是，与 `collect` 不同，`each` 方法不会创建包含返回值的新数组：

	b5 = ["hello","good day","how do you do"].each{|x| x.capitalize }

这一次，`b5` 没有变化...

	["hello", "good day", "how do you do"]

回想一下，有些方法 - 特别是以感叹号（`!`）结尾的方法 - 实际上改变了原始对象而不是产生新值。如果你想使用 `each` 方法来将原始数组中的字符串首字母大写，你可以使用 `capitalize!` 方法：

	b6 = ["hello","good day","how do you do"].each{|x| x.capitalize! }

所以 `b6` 现在是...

	["Hello", "Good day", "How do you do"]

经过一番思考，你还可以使用 block 来迭代字符串中的字符（characters）。首先，你需要从字符串中拆分每个字符。这可以使用 String 类的 `split` 方法完成，如下所示：

	"hello world".split(//)

`split` 方法基于分隔符将字符串划分为子字符串，并返回包含这些子字符串的数组。这里 `//` 是一个定义零长度字符串的正则表达式；这具有返回单个字符的效果，因此我们最终创建了包含字符串中所有字符的数组。我们现在可以迭代这个字符数组，返回每个字符的大写版本：

	a = "hello world".split(//).each{ |x| newstr << x.capitalize }

因此，在每次迭代时，大写字符将附加到 `newstr`，并显示以下内容...

	H
	HE
	HEL
	HELL
	HELLO
	HELLO
	HELLO W
	HELLO WO
	HELLO WOR
	HELLO WORL
	HELLO WORLD

因为我们在这里使用 `capitalize` 方法（结尾没有 `!` 字符），所以数组中的字符 `a` 保持原样，全部小写，因为 `capitalize` 方法不会改变接收对象（这里接收对象是传入 block 的字符）。

但请注意，如果你使用 `capitalize!` 方法修改原始字符，此代码将不会运行。这是因为 `capitalize!` 如果没有进行任何更改则会返回 `nil`，因此当遇到空格字符时，将返回 `nil`，并且我们尝试向字符串 `newstr` 追加（`<<`）一个 `nil` 值将会失败。

你还可以使用 `each_byte` 方法对字符串进行首字母大写转换。这将遍历字符串的字符，将每个字节（byte）传递给 block。这些字节采用了 ASCII 码的形式。因此，"hello world" 将以这些数值的形式传递：`104` `101` `108` `108` `111` `32` `119` `111` `114` `108` `100`

显然，你不能将整数大写，所以我们需要将每个 ASCII 值转换为一个字符。String 的 `chr` 方法执行此操作：

	a = "hello world".each_byte{|x| newstr << (x.chr).capitalize }

### Procs 与  Lambdas

到目前为止，在我们的示例中块（blocks）都和方法（methods）一起使用。这是必须的，因为匿名块在 Ruby 中不能独立存在。例如，你不能像这样创建一个独立的块：

	{|x| x = x*10; puts(x)}

这是"Ruby中的所有内容都是对象"这一规则的例外情况之一。块显然不是一个对象。每个对象都是从类创建的，你可以通过调用其 `class` 方法来查找对象的类。

例如，使用 Hash 对象执行此操作，会显示类名 "Hash"：

	puts({1=>2}.class)

但是，尝试对块执行此操作，你只会得到一条错误消息：

	puts({|i| puts(i)}.class) #<= error!

<div class="note">
	<p class="h4"><b>Block 还是 Hash？</b></p>

Ruby 使用花括号来限定 block 和 Hash。那你（以及 Ruby）怎么能分辨哪个是哪个？答案基本上就是当它看起来像 Hash 时它是 Hash，否则它就是一个 block。Hash 看起来是在花括号中包含了键值（key-value）对...

	puts( {1=>2}.class ) #<= Hash

...或者，当它们是空（empty）的：

	puts( {}.class ) #<= Hash

但是，又一次的，当你省略括号时，将会出现歧义。这是一个空的 Hash 还是与 `puts` 方法相关联的一个 block？

	puts{}.class

坦率地说，我不得不承认我不知道这个问题的答案，我也无法让 Ruby 告诉我。Ruby 认为这是有效的语法，但事实上，在代码执行时不会显示任何内容。所以，这个...

	print{}.class

...打印为 `nil`（你不会注意到实际的 `nil` 类，即 Nil-Class，而是 `nil` 本身）。如果你发现所有的这些令人困惑（就像我一样！），请记住，通过明确地使用括号可以避免这一点：

	print( {}.class ) #<= Hash
</div>

### 创建块对象

<div class="code-file clearfix"><span>proc_create.rb</span></div>

虽然默认情况下块（blocks）可能不是对象，但它们可以"变成"对象。有三种方式可以创建块对象并将它们分配给变量 - 具体方法如下：

	a = Proc.new{|x| x = x*10; puts(x) }
	b = lambda{|x| x = x*10; puts(x) }
	c = proc{|x| x.capitalize! }

请注意，在上述三种情况下，你最终都会创建一个 Proc 类的实例 - 这是 Ruby 为块提供的'对象包装器'（object wrapper）。让我们仔细看看创建 Proc 对象的三种方法。首先，你可以调用 `Proc.new` 创建一个对象，并将块作为参数传递给它：

<div class="code-file clearfix"><span>3blocks.rb</span></div>

	a = Proc.new{|x| x = x*10; puts(x)}

你可以通过 `a` 引用使用 Proc 类的 `call` 方法执行块中的代码，并将一个或多个参数（匹配块参数）传递给块；在上面的代码中，你可以传递一个整数，如 100，这将被分配给块变量 `x`：

	a.call(100)

你也可以通过调用 `lambda` 或 `proc` 方法来创建 Proc 对象。这些方法（由 Kernel 类提供）是相同的。名称 `lambda` 取自 Scheme（Lisp）语言，是用于描述匿名方法或“闭包”（closure）的术语。

使用 `Proc.new` 创建 Proc 对象和使用 `proc` 或 `lambda` 方法创建 Proc 对象之间有一个重要的区别 - `Proc.new` 不检查传递给块的数字或参数是否与块参数的数量匹配 - 但 `proc` 和 `lambda` 会做检查：

<div class="code-file clearfix"><span>proc_lamba.rb</span></div>

	a = Proc.new{|x,y,z| x = y*z; puts(x) }
	a.call(2,5,10,100) # This is not an error

	b = lambda{|x,y,z| x = y*z; puts(x) }
	b.call(2,5,10,100) # This is an error

	puts('---Block #2---' )
	c = proc{|x,y,z| x = y*z; puts(x) }
	c.call(2,5,10,100) # This is an error

<div class="code-file clearfix"><span>block_closure.rb</span></div>

### 什么是闭包？

'闭包'（Closure）是一类函数的名称，这些函数能够在创建块的作用域（将其视为块的“原作用域”，native scope）内存储（即“封闭”，enclose）局部变量的值。Ruby 的块是闭包。要理解这一点，请看这个示例：

	x = "hello world"

	ablock = Proc.new { puts( x ) }

	def aMethod( aBlockArg )
	  x = "goodbye"
	  aBlockArg.call
	end

	puts( x )
	ablock.call
	aMethod( ablock )
	ablock.call
	puts( x )

这里，在 `ablock` 作用域的内局部变量 `x` 的值是 "hello world"。但是，在 `aMethod` 方法中，名为 `x` 的局部变量具有值，'goodbye'。尽管如此，当 `ablock` 被传递给 `aMethod` 并在 `aMethod` 的作用域内调用时，它打印出 "hello world"（即，在块的 'native scope' 中 `x` 的值，而不是在 `aMethod` 的作用域内 `x` 的值 'goodbye'）。

<div class="note">

有关闭包（closures）的更多信息，请参阅本章末尾的**“深入探索”**。
</div>

### Yield

让我们看看还有更多在使用中的块。**4blocks.rb** 程序引入了一些新东西 - 即一种执行传递给方法的匿名块的方式。这是使用关键字 `yield` 完成的。在第一个示例中，我定义了这个简单的方法：

<div class="code-file clearfix"><span>4blocks.rb</span></div>

	def aMethod
	  yield
	end

它实际上没有任何自己的代码。相反，它期望接收一个块并且 `yield` 关键字会让块执行。这是我传递一个块的方式：

	aMethod{ puts( "Good morning" ) }

请注意，这次块不作为命名参数传递。尝试在圆括号之间传递块是错误的，如下所示：

	aMethod( { puts( "Good morning" ) } ) # This won't work!

相反，我们只是将块放在我们传递它的方法右侧旁边，就像我们在本章的第一个示例中所做的那样。该方法接收没有声明命名参数的块，并用 `yield` 调用块。

这是一个稍微有用的示例：

	def caps( anarg )
	  yield( anarg )
	end

	caps( "a lowercase string" ){ |x| x.capitalize! ; puts( x ) }

这里 `caps` 方法接收一个参数 `anarg`，并将此参数传递给匿名块，然后由 `yield` 执行。当我调用 `caps` 方法时，我使用通常的参数传递语法传递一个字符串参数（"a lowercase string"）。匿名块在参数列表*之后*传递。当 caps 方法用字符串参数调用 `yield(anarg)` 时，"a lowercase string" 会被传递给该块，它被分配给块变量 `x`，它将其首字母大写并用 `puts(s)` 显示它。

### 块之中的块

我们已经看到了如何使用块来迭代数组。在下一个示例中，我使用一个块来迭代一个字符串数组，依次将每个字符串分配给块变量 `s`。然后将第二个块传递给 `caps` 方法，以便将字符串的首字母大写：

	["hello","good day","how do you do"].each{
	  |s|
	  caps( s ){ |x| x.capitalize!
		puts( x )
	  }
	}

输出结果：

	Hello
	Good day
	How do you do

### 传递命名的 Proc 参数

到目前为止，我们已经通过匿名的（在这种情况下使用 `yield` 关键字执行块）或以命名参数的形式将块传递给例程（procedures），在这种情况下，它使用 `call` 方法执行。 还有另一种传递块的方法。当方法的参数列表中的最后一个参数前面有一个 `＆` 符号时，它被认为是一个 Proc 对象。这使你可以选择使用与将块传递给迭代器时相同的语法将匿名块传递给例程。然而，例程本身可以接收块作为命名参数。运行 **5blocks.rb** 以查看此示例。

<div class="code-file clearfix"><span>5blocks.rb</span></div>

首先，这里提醒我们已经看到过传递块的两种方式。 该方法有三个参数，a，b，c：

	def abc( a, b, c )
	  a.call
	  b.call
	  c.call
	  yield
	end

我们用三个命名参数调用这个方法（这里恰好是块，但原则上可以是任何东西）加上一个未命名的块：

	abc(a, b, c ){ puts "four" }

`abc` 方法使用 `call` 方法执行命名的块参数，使用 `yield` 关键字执行未命名的块：

	a.call  #<= call block a
	b.call  #<= call block b
	c.call  #<= call block c
	yield  #<= yield unnamed block: { puts "four" }

下一个方法 `abc2` 接收单个参数，`＆d`：

	def abc2( &d )

此处的 ＆ 符是重要的，因为它表示 `＆d` 参数是一个块。但是，我们不需要将此块作为命名参数发送。相反，我们只需将其附加到方法名称后即可传递未命名的块：

	abc2{ puts "four" }

`abc2` 方法不使用 `yield` 关键字，而是使用参数名称（没有 ＆ 符号）执行块：

	def abc2( &d )
	  d.call
	end

你可以将 ＆ 符号参数视为块参数的类型检查（type-checked）。也就是说，＆ 参数被正式声明，因此与匿名块（那些 'yielded'）不同，块不会在'未通知'（unannounced）的情况下到达方法。但与普通参数（没有 ＆ 符号）不同，它们必须匹配块。你不能将其它类型的对象传递给 `abc2`：

	abc2( 10 ) # This won‟t work!

除了指定第四个正式参数 `(＆d)` 之外，`abc3` 方法与 `abc` 方法基本相同：

	def abc3( a, b, c, &d)

参数 `a`，`b` 和 `c` 被调用，而参数 `＆d` 可以被调用（call）或产生（yield），如你所愿：

	def abc3( a, b, c, &d)
	  a.call
	  b.call
	  c.call
	  d.call #<= block &d
	  yield #<= also block &d
	end

这意味着调用代码必须将三个普通参数和一个块（这可能是匿名的）传递给此方法：

	abc3(a, b, c){ puts "five" }

当接收方法没有匹配的命名参数时，你还可以使用前缀 ＆ 符号将命名块传递给方法，如下所示：

	abc3(a, b, c, &myproc )

当一个 ＆ 符号块变量传递给一个方法时（如上面的代码所示），它可能会被生成（yielded）。这提供了传递匿名块或 Proc 对象的选项：

	xyz{ |a,b,c| puts(a+b+c) }
	xyz( &myproc )

但要小心！请注意，在上面的一个示例中，我使用了块参数（`|a, b, c|`），其名称与我之前分配给 Proc 对象的三个局部变量的名称相同：`a`，`b`，`c`：

	a = lambda{ puts "one" }
	b = lambda{ puts "two" }
	c = proc{ puts "three" }

	xyz{ |a,b,c| puts(a+b+c) }

现在，原则上块参数应仅在块本身内可见。但是，事实证明，对块参数的赋值可以初始化在块的原作用域（native scope，请参阅本章前面的“什么是闭包？”）内具有与块参数相同名称的任何局部变量的值。

尽管 `xyz` 方法中的变量被命名为 `x`，`y` 和 `z`，但事实证明，该方法中的整数赋值实际上是对块中变量 `a`，`b` 和 `c` 进行的。

	{ |a,b,c| puts(a+b+c) }

...传递 `x`，`y` 和 `z` 的值：

	def xyz
	  x = 1
	  y = 2
	  z = 3
	  yield( x, y, z ) # 1,2,3 assigned to block parameters a,b,c
	end

因此，一旦块中的代码运行，块的原作用域（native scope，也是我的程序的 main 作用域）中的变量 `a`，`b` 和 `c` 就会被块变量的值初始化：

	xyz{ |a,b,c| puts(a+b+c) }
	puts( a, b, c ) # displays 1, 2, 3

为了更清楚这一点，请尝试 **6blocks.rb** 中的简单程序：

<div class="code-file clearfix"><span>6blocks.rb</span></div>

	a = "hello world"

	def foo
	  yield 100
	end

	puts( a )
	foo{ |a| puts( a ) }

	puts( a ) #< a is now 100

这是一个容易陷入 Ruby 的陷阱之一的例子。作为一般规则，当变量共享相同的作用域（例如，在此处程序的 main 作用域内声明的块）时，最好使其名称唯一，以避免任何不可预见的副作用。

请注意，此处描述的块作用域适用于 Ruby 1.8.x 以上的版本（包含此版本），在编写本文时，它可能被认为是 Ruby 的“标准”（standard）版本。Ruby 1.9 中正在对作用域进行更改，并将其合并到 Ruby 2.0 中。有关作用域的更多信息，请参阅本章末尾的“深入探索”部分中的“块和局部变量”。

### 优先级规则

花括号内的块比 `do` 和 `end` 中的块具有更高的优先级（precedence）。让我们看看这在实践中意味着什么。思考这两个例子：

	foo bar do |s| puts( s ) end
	foo bar{ |s| puts(s) }

这里，`foo` 和 `bar` 是方法。那么块传递给哪个方法？事实证明，`do..end` 块将被传递给最左边的方法 `foo`，而花括号中的块将被发送到最右边的方法 `bar`。这是因为花括号具有更高的优先级。思考这个程序...

<div class="code-file clearfix"><span>precedence.rb</span></div>

	def foo( b )
	  puts("---in foo---")
	  a = 'foo'
	  if block_given?
		puts( "(Block passed to foo)" )
		yield( a )
	  else
		puts( "(no block passed to foo)" )
	  end
	  puts( "in foo, arg b = #{b}" )
	  return "returned by " << a
	end

	def bar
	  puts("---in bar---")
	  a = 'bar'
	  if block_given?
		puts( "(Block passed to bar)" )
		yield( a )
	  else
		puts( "(no block passed to bar)" )
	  end
	  return "returned by " << a
	end

	foo bar do |s| puts( s ) end  # 1) do..end block

	foo bar{ |s| puts(s) }        # 2) {..} block

这里 `do..end` 块的优先级较低，方法 `foo` 优先。这意味着 `bar` 和 `do..end` 块都传递给 `foo`。因此，这两个表达式是等价的：

	foo bar do |s| puts( s ) end
	foo( bar ) do |s| puts( s ) end

另一方面，花括号块具有更高的优先级，因此它尝试立即执行并传递给第一个可能的接收方法 `(bar)`。然后将结果（即 `bar` 返回的值）作为参数传递给 `foo`；但这一次，`foo` 本身并没有收到块。因此，以下两个表达式是等效的：

	foo bar{ |s| puts(s) }
	foo( bar{ |s| puts(s) } )

如果你对这一切感到困惑，不要难过因为实际上并不是你一个人感到困惑！Ruby 块的行为远非透明的。潜在的歧义是由于在 Ruby 中参数列表周围的括号是可选的。从上面给出的替代版本中可以看出，当使用括号时，模糊性消失了。

<div class="note">
	<p class="h4"><b>提示...</b></p>

一个方法可以使用 `block_given?` 方法测试它是否已经收到一个块。你可以在 **precedence.rb** 程序中找到相关示例。
</div>

### 块作为迭代器

如前所述，Rub y中块的主要用途之一是提供可以传递范围或项列表的迭代器。许多标准类（如 Integer 和 Array）都有方法可以提供块来迭代元素。例如：

	3.times{ |i| puts( i ) }

	[1,2,3].each{|i| puts(i) }

当然，你可以创建自己的迭代器方法，以便为块提供一系列值。在 **iterate1.rb** 程序中，我定义了一个简单的 `timesRepeat` 方法以执行指定次数的块代码。这类似 Integer 类的 `times` 方法，除了它从索引 1 而不是索引 0 开始的事实（这里显示变量 `i` 是正为了证明这一事实）：

<div class="code-file clearfix"><span>iterate1.rb</span></div>

	def timesRepeat( aNum )
	  for i in 1..aNum do
		yield i
	  end
	end

以下是如何调用此方法的示例：

	timesRepeat( 3 ){ |i| puts("[#{i}] hello world") }

我还创建了一个 `timesRepeat2` 方法来迭代数组：

	def timesRepeat2( aNum, anArray )
	  anArray.each{ |anitem|
		yield( anitem )
	  }
	end

这可以通过以下方式调用：

	timesRepeat2( 3, ["hello","good day","how do you do"] ){ |x| puts(x) }

事实上，如果一个对象本身包含它自己的迭代器方法，那么它将更好（面向对象的灵魂更真实）。我在下一个示例中实现了这一点。在这里，我创建了 MyArray，作为 Array 的子类：

<div class="code-file clearfix"><span>iterate2.rb</span></div>

	class MyArray < Array

在创建新的 MyArray 对象时，它使用数组初始化：

	def initialize( anArray )
	  super( anArray )
	end

它向上依赖于它自己的（*self*）`each` 方法，它由它的祖先 Array 提供，以迭代数组中的所有元素，并使用 Integer 的 times 方法执行此操作一定次数。这是完整的类定义：

	class MyArray < Array
	  def initialize( anArray )
		super( anArray )
	  end

	  def timesRepeat( aNum )
		aNum.times{ # start block 1...
		  | num |
		  self.each{ # start block 2...
			| anitem |
			yield( "[#{num}] :: '#{anitem}'" )
		  } # ...end block 2
		} # ...end block 1
	  end
	end

请注意，由于我使用了两个迭代器（`aNum.times` 和 `self.each`），因此 `timesRepeat` 方法包含两个嵌套块。这是一个如何使用它的示例...

	numarr = MyArray.new( [1,2,3] )
	numarr.timesRepeat( 2 ){ |x| puts(x) }

这将输出以下内容：

	[0] :: '1'
	[0] :: '2'
	[0] :: '3'
	[1] :: '1'
	[1] :: '2'
	[1] :: '3'

在 **iterate3.rb** 中，我自己设置了为包含任意数量的子数组的数组定义迭代器的问题，其中每个子数组具有相同数量的项。换句话说，它像一个具有固定行数和固定列数的表或矩阵。例如，这里是一个具有三个“行”（rows，子数组）和四个“列”（columns，元素）的多维数组：

<div class="code-file clearfix"><span>iterate3.rb</span></div>

	multiarr =
	[	['one','two','three','four'],
		[1, 2, 3, 4 ],
		[:a, :b, :c, :d ]
	]

我已经尝试了三个替代版本。第一个版本受到限制，只能使用在预定义数量（这里是索引 [0] 和 [1]）的"行数"（rows）中：

	multiarr[0].length.times{|i|
	  puts(multiarr[0][i], multiarr[1][i])
	}

第二个版本通过迭代 `multiarr` 的每个元素（或'行'，row）然后通过获取行长度并使用 Integer 的 `times` 方法和该值迭代该行中的每个元素来绕过此限制：

	multiarr.each{ |arr|
	  multiarr[0].length.times{|i|
		puts(arr[i])
	  }
	}

第三个版本反转这些操作：外部块沿着行 0 的长度迭代，内部块获得每行中索引 `i` 的元素：

	multiarr[0].length.times{|i|
	  multiarr.each{ |arr|
		puts(arr[i])
	  }
	}

虽然版本 2 和版本 3 以类似的方式工作，但你会发现它们以不同的顺序迭代这些元素项目。运行该程序以验证。你可以尝试创建自己的 Array 子类并添加像这样的迭代器方法 - 一个按顺序迭代行的方法（如上面的版本 2）和一个按顺序遍历列的方法（如版本 3）。

## 深入探索

### 从方法中返回块

早些时候，我解释过 Ruby 中的块可能视为“闭包”（closures）。闭包可以说是封闭声明它的“环境”（environment）。或者，换句话说，它将局部变量的值从其原始作用域带入不同的作用域。我之前给出的示例显示了名为 `ablock` 的块如何捕获局部变量 `x` 的值...

<div class="code-file clearfix"><span>block_closure.rb</span></div>

	x = "hello world"
	ablock = Proc.new { puts( x ) }

...然后它就能够将该变量“携带”到不同的作用域内。例如，这里将块传递给 `aMethod`。当在该方法内部调用 `ablock` 时，它运行代码 `puts(x)`。这里显示，"hello world" 而不是 "goodbye"...

	def aMethod( aBlockArg )
	  x = "goodbye"
	  aBlockArg.call #<= displays "hello world"
	end

在这个特定的例子中，这种行为似乎对好奇心没有太大吸引力。实际上，可以更具创造性地使用块/闭包。

例如，你可以*在方法内*创建一个块并将该块返回给调用代码，而不是创建一个块并将其发送到方法。如果创建块的方法碰巧接收参数，则可以使用该参数初始化块。

这为我们提供了一种从同一“块模板”（block template）创建多个块的简单方法，每个块的实例都使用不同的数据进行初始化。例如，在这里我创建了两个块，分配给变量 `salesTax` 和 `vat`，每个块根据不同的值（0.10）和（0.175）计算结果：

<div class="code-file clearfix"><span>block_closure2.rb</span></div>

	def calcTax( taxRate )
	  return lambda{
		|subtotal|
		subtotal * taxRate
	  }
	end

	salesTax = calcTax( 0.10 )
	vat = calcTax( 0.175 )

	print( "Tax due on book = ")
	print( salesTax.call( 10 ) )  #<= prints: 1.0

	print( "\nVat due on DVD = ")
	print( vat.call( 10 ) )       #<= prints: 1.75

### 块与实例变量

块的一个不太明显的特性是它们使用变量的方式。如果一个块可能真的被视为匿名函数或方法，那么从逻辑上讲，它应该能够：1）包含它自己的局部变量；2）能够访问该块所属的对象的实例变量。

我们先来看实例变量（instance variables）。加载 **closures1.rb** 程序。这提供了块等同于闭包的另一个例子 - 通过捕获创建它的作用域中的局部变量的值。这里我使用 `lambda` 方法创建了块：

<div class="code-file clearfix"><span>closures1.rb</span></div>

	aClos = lambda{
	  @hello << " yikes!"
	}

这个块将一个字符串 "yikes!" 附加到一个实例变量 `@hello`。请注意，在这个过程中，之前没有为 `@hello` 分配任何值。

但是，我创建了一个单独的方法 `aFunc`，它为一个名为 `@hello` 的变量赋值：

	def aFunc( aClosure )
	  @hello = "hello world"
	  aClosure.call
	end

当我将块传递给该方法（`aClosure` 参数）时，`aFunc` 方法将引入 `@hello` 。我现在可以使用 `call` 方法执行块内代码。当然 `@hello` 变量包含字符串 "hello world"。通过调用块也可以使用方法之外相同的变量。实际上，现在，通过反复调用块，我最终会反复追加字符串 "yikes!" 到 `@hello`：

	aFunc(aClos)  #<= @hello = “hello world yikes!”
	aClos.call    #<= @hello = “hello world yikes! yikes!”
	aClos.call    #<= @hello = “hello world yikes! yikes! yikes!”
	aClos.call    # ...and so on
	aClos.call

如果你认为这并不是太令人惊讶。毕竟，`@hello` 是一个实例变量，因此它存在于一个对象的作用域内。当我们运行 Ruby 程序时，会自动创建一个名为 `main` 的对象。所以我们应该期望在该对象（我们的程序）中创建的任何实例变量可用于其中的所有内容。

现在出现的问题是：如果要将块发送到某个*其它*对象的方法会发生什么？如果该对象有自己的实例变量 `@hello`，那么该块会使用哪个变量 - 来自创建块的作用域内的 `@hello`，还是来自调用该块的对象作用域内的 `@hello`？让我们尝试一下。我们将使用与以前相同的块，除了这次它将显示有关块所属对象和 `@hello` 值的一些信息：

	aClos = lambda{
	  @hello << " yikes!"
	  puts("in #{self} object of class #{self.class}, @hello = #{@hello}")
	}

现在从新类（X）创建一个新对象，并为它提供一个接收我们的块 `b` 的方法，并调用该块：

	class X
	  def y( b )
		@hello = "I say, I say, I say!!!"
		puts( " [In X.y]" )
		puts("in #{self} object of class #{self.class}, @hello = #{@hello}")
		puts( " [In X.y] when block is called..." )
		b.call
	  end
	end

	x = X.new

要测试它，只需将块 `aClos` 传递给 `x` 的 `y` 方法：

	x.y( aClos )

这就是显示的内容：

	[In X.y]
	in #<X:0x32a6e64> object of class X, @hello = I say, I say, I say!!!
	[In X.y] when block is called...
	in main object of class Object, @hello = hello world yikes! yikes! yikes! yikes! yikes! yikes!

因此，很明显，块在创建它的对象（main）的作用域内执行，并保留该对象的实例变量，即使在调用块的对象的作用域内有一个具有相同名称和不同值的实例变量。

### 块与局部变量

现在让我们看看块/闭包（block/closure）如何处理局部变量（local variables）。加载 **closures2.rb** 程序。首先，我声明一个变量 `x`，它对程序本身的上下文来说是局部的：

<div class="code-file clearfix"><span>closures2.rb</span></div>

	x = 3000

第一个块/闭包称为 `c1`。每次我调用这个块时，它会获取块本身外部定义的 `x` 值（3000）并返回 `x+100`：

	c1 = lambda{
	  return x + 100
	}

这个块没有块参数（也就是说，竖条之间没有'块局部'（block local）变量）所以当用变量 `someval` 调用它时，该变量被丢弃，未使用。换句话说，`c1.call(someval)` 与 `c1.call()` 具有相同的效果。所以当你调用块 `c1` 时，它返回 `x+100`（即 3100），然后将该值赋给 `someval`。

	someval=1000
	someval=c1.call(someval); puts(someval) #<= someval is now 3100
	someval=c1.call(someval); puts(someval) #<= someval is now 3100

<div class="note">

**注意：**如上所示，你可以将调用放在块中并将其传递给 Integer 的 `times` 方法，而不是重复调用 `c1`，如下所示：

	2.times{ someval=c1.call(someval); puts(someval) }

但是，因为它可能很难在只有一个块（例如这里的 `c1` 块）的情况下工作，以至于我故意避免使用比这个程序中更多本应该必要的块！
</div>

第二个块名为 `c2`。这声明了一个'块参数'（block parameter），`z`。这也返回一个值：

	c2 = lambda{
	  |z|
	  return z + 100
	}

但是，这次返回值可以重复使用，因为块参数就像一个方法的传入参数 - 所以当 `someval` 的值在被赋值为 `c2` 的返回值之后被更改时，这个更改的值随后作为参数传入：

	someval=1000
	someval=c2.call(someval); puts(someval) #<= someval is now 1100
	someval=c2.call(someval); puts(someval) #<= someval is now 1200

乍一看，第三个块 `c3` 与第二个块 `c2` 几乎相同。实际上，唯一的区别是它的块参数被称为 `x` 而不是 `z`：

	c3 = lambda{
	  |x|
	  return x + 100
	}

块参数的名称对返回值没有影响。和以前一样，`someval` 首先被赋值 1100（即，它的原始值 1000，加上块中添加的 100）然后，当第二次调用块时，`someval` 被赋值为 1200（其先前的值 1100，加上在块内分配的 100）。

但现在看一下局部变量 `x` 的值会发生什么。在该单元的顶部分配了 3000。只需给块参数指定相同的名称 `x`，我们就改变了局部变量 `x` 的值。它现在具有值 1100，即块参数 `x` 在调用 `c3` 块时最后具有的值：

	x = 3000

	c3 = lambda{
	  |x|
	  return x + 100
	}

	someval=1000
	someval=c3.call(someval); puts(someval)
	someval=c3.call(someval); puts(someval)
	puts( x )  #<= x is now 1100

顺便提一下，即使块局部变量和块参数可以影响块外部的类似命名的局部变量，块变量本身也不会在块之外存在。你可以使用 `defined?` 关键字对此进行验证，以尝试显示变量的类型（如果确实已定义）：

	print("x=[#{defined?(x)}],z=[#{defined?(z)}]")

Ruby 的创造者 Matz，他将块内局部变量的作用域描述为“抱歉的”（regrettable）。特别是，他认为在一个块中使局部变量对包含该块的方法不可见是错误的。有关此示例，请参阅 **local_var_scope.rb**：

<div class="code-file clearfix"><span>local_var_scope.rb</span></div>

	def foo
	  a = 100
	  [1,2,3].each do |b|
		c = b
		a = b
		print("a=#{a}, b=#{b}, c=#{c}\n")
	  end
	  print("Outside block: a=#{a}\n") # Can't print #{b} and #{c} here!!!
	end

这里，块参数 `b` 和块局部变量 `c` 只有在块本身内部时才可见。该块可以访问这些变量并作用于变量 `a`（`foo` 方法的局部）。但是，在块之外，`b` 和 `c` 是不可访问的，只有`a` 是可见的。

只是为了增加迷惑性，块局部变量 `c` 和块参数 `b` 在上面的示例中都不能在块外部访问，但是当你用一个`for` 块迭代时可以访问它们，如下例所示：

	def foo2
	  a = 100
	  for b in [1,2,3] do
		c = b
		a = b
		print("a=#{a}, b=#{b}, c=#{c}\n")
	  end
	  print("Outside block: a=#{a}, b=#{b}, c=#{b}\n")
	end

在 Ruby 的未来版本中，在块内赋值的局部变量（与 `c` 一样）也将是块外部方法（例如 `foo`）的局部变量。形式上块参数（如 `b`）将是块的局部变量。