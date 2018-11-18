---

	{
		"title": "第五章",
		"ctime": "2016-11-17 23:13:00",
		"mtime": "2016-11-17 23:13:00"
	}

---

# 第五章

***

## 循环（Loop）和迭代器（Iterator）

大部分程序都是与重复行为相关的。也许你希望你的程序发出十次嘟嘟（beep）声，读取一个长文件的更多行直到用户按下某个键，显示一个警告信息。Ruby 提供了许多执行此类重复行为的方式。

### for 循环

在许多编程语言中，当你想将一些代码运行一定的次数时你可以把它放在 `for` 循环中。在大多数语言中，为 `for` 循环可以提供一个初始化的变量作为起始值，该起始值在每个循环中递增 1，循环到直到它满足某个特定的结束值。当满足结束值时，`for` 循环停止运行。这是用 Pascal 写的常规类型的 `for` 循环：

	(* This is Pascal code, not Ruby! *)
	for i := 1 to 3 do
		writeln( i );

<div class="code-file clearfix"><span>for_loop.rb</span></div>

您可能还记得上一章中 Ruby 的 `for` 循环根本不是这样的！我们会给 `for` 循环一个元素列表，而不是一个起始值和结束值，然后逐个迭代它们，将每个元素值依次分配给一个循环变量，直到它到达列表的末尾。

例如，这是一个 `for` 循环，它迭代数组中的项目，并依次显示：

	# This is Ruby code…
	for i in [1,2,3] do
		puts( i )
	end

`for `循环更像是其它编程语言中提供的 'for each' 迭代器。循环迭代的项目不必是整数（integers）。这也可以...

	for s in ['one','two','three'] do
		puts( s )
	end

Ruby 的作者描述 `for` 循环是集合类型，例如 Arrays、Sets、Hashes 和 Strings（字符串实际上是一个字符集合）中实现的 `each` 方法的语法糖（syntax sugar）。为了便于比较，这是上面的 `for` 循环使用 `each` 方法进行重写的：

<div class="code-file clearfix"><span>each_loop.rb</span></div>

	[1,2,3].each do |i|
		puts( i )
	end

正如你所看到的，并没有太大的区别。要将 `for `循环转换为 `each` 迭代器，所要做的就是删除 `for` 和 `in`，并将 `.each` 附加到数组中。然后把迭代变量 `i` 放在 `do` 后的两条竖线中。比较一下其它示例，看看 `for` 循环和 `each` 迭代器的相似程度：

<div class="code-file clearfix"><span>for_each.rb</span></div>

	# --- Example 1 ---
	# i) for
	for s in ['one','two','three'] do
		puts( s )
	end

	# ii) each
	['one','two','three'].each do |s|
		puts( s )
	end

	# --- Example 2 ---
	# i) for
	for x in [1, "two", [3,4,5] ] do puts( x ) end

	# ii) each
	[1, "two", [3,4,5] ].each do |x| puts( x ) end

顺便提一下，请注意，`do` 关键字在跨越多行的 `for` 循环中是可选的，但是当它写在一行上时是必须的：

	# Here the "do" keyword can be omitted
	for s in ['one','two','three']
		puts( s )
	end

	# But here it is required
	for s in ['one','two','three'] do puts( s ) end

<div class="code-file clearfix"><span>for_to.rb</span></div>

<div class="note">
	<p class="h4"><b>如何编写一个“普通（normal）”的 for 循环...</b></p>

如果你习惯了常规类型的 `for` 循环，你可以随时通过使用 Ruby 中的 `for` 循环迭代范围中的值来实现。例如，这显示了如何使用一个 `for` 循环变量从 1 到 10 计数，并在每次循环过程中显示其值：

	for i in (1..10) do
		puts( i )
	end
</div>

<div class="code-file clearfix"><span>for_each2.rb</span></div>

此示例显示了 `for` 和 `each` 两者如何用于迭代范围内的值：

	# for
	for s in 1..3
		puts( s )
	end

	# each
	(1..3).each do |s|
		puts(s)
	end

顺便提一下，要注意在使用 `each` 方法时，范围（range）表达式，例如 `1..3` 必须使用圆括号包围，否则 Ruby 会假设你试图使用整数（一个 Fixnum）作为 `each` 方法的最终值，而不是整个表达式（范围，Range）。range 用在 `for` 循环中时圆括号是可选的。

### 多迭代参数

<div class="code-file clearfix"><span>multi_array.rb</span></div>

你可能还记得在上一章中我们使用了一个带有多个循环变量的 `for` 循环。我们这样做是为了迭代一个多维数组。在每次进入 `for` 循环中，一个变量将被赋值为外层数组中的一行数据（子数组）：

	# Here multiarr is an array containing two "rows"
	# (sub-arrays) at index 0 and 1
	multiarr = [
		['one','two','three','four'],
		[1,2,3,4]
	]

	# This for loop runs twice (once for each "row" of multiarr)
	for (a,b,c,d) in multiarr
		print("a=#{a}, b=#{b}, c=#{c}, d=#{d}\n" )
	end

上面的循环将会打印出：

	a=one, b=two, c=three, d=four
	a=1, b=2, c=3, d=4

我们可以使用 `each` 方法来迭代四个元素的数组，将四个“块参数” `a`，`b`，`c`，`d` 传入 `do` 和 `end` 限定的块中：

	multiarr.each do |a,b,c,d|
	  print("a=#{a}, b=#{b}, c=#{c}, d=#{d}\n" )
	end

<div class="note">
	<p class="h4"><b>块参数（Block Parameters）</b></p>

在 Ruby 中，迭代器的主体称为“块”（block），在块顶部的两个竖直线中声明的任何变量都称为“块参数”（block parameters）。在某种程度上，块的工作方式类似于函数（function），块参数的工作方式类似于函数的参数列表（argument list）。`each` 方法运行块（block）内的代码，并将集合（例如数组，`multiarr`）提供的参数传递给块。在上面的示例中，`each` 方法重复地将有四个元素的数组传递给块，并且这四个数组内的元素初始化为四个块参数 `a`，`b`，`c`，`d`。除了迭代集合之外，块还可以用于其它方面。 我将在第 10 章中对块（block）进行更多说明。
</div>

### 块（Blocks）

<div class="code-file clearfix"><span>block_syntax.rb</span></div>

Ruby 有一种用于限定块的替代语法。你可以不使用 `do..end`，而是像这样使用花括号 `{..}`：

	# do..end
	[[1,2,3], [3,4,5], [6,7,8]].each do
	  |a,b,c|
	  puts( "#{a}, #{b}, #{c}" )
	end

	# curly braces {..}
	[[1,2,3], [3,4,5], [6,7,8]].each {
	  |a,b,c|
	  puts( "#{a}, #{b}, #{c}" )
	}

无论你使用哪个块限定符，都必须确保开放限定符，`'{'` 或 `'do'` 与 `each` 方法放在同一行。 在 `each` 和开放块限定符之间插入一个换行符是错误的语法。

### while 循环

Ruby 也有一些其它的循环结构。这是一个 `while` 循环：

	while tired
	  sleep
	end

或者，以另一种方式：

	sleep while tired

即使这两个示例的语法不同，它们也会执行相同的操作。在第一个示例中，`while` 和 `end` 之间的代码（这里是一个名为 `sleep` 方法的调用）会在布尔测试（在这里，是一个名为 `tired` 的方法的返回值）为 true 时执行。与 `for` 循环一样，关键字 `do` 可选的可以放置于出现在不同行的测试条件与要执行的循环体代码中间，当测试条件与循环代码出现在同一行时关键字 `do` 则是必须的。

### while 修饰符

在第二个版本的循环中（`sleep while tired`），要执行的循环代码（`sleep`）优先于测试条件（`while tired`）。该语法被称为“while 修饰符”（while modifie）。如果你想要使用此语法执行多个表达式，可以将它们放在 `begin` 和 `end` 关键字之间：

	begin
	  sleep
	  snore
	end while tired

<div class="code-file clearfix"><span>1loops.rb</span></div>

这个示例展示了各种替代语法：

	$hours_asleep = 0

	def tired
	  if $hours_asleep >= 8 then
	    $hours_asleep = 0
		return false
	  else
		$hours_asleep += 1
		return true
	  end
	end

	def snore
	  puts('snore....')
	end

	def sleep
	  puts("z" * $hours_asleep )
	end

	while tired do sleep end   # a single-line while loop

	while tired                # a multi-line while loop
	  sleep
	end

	sleep while tired          # single-line while modifier

	begin                      # multi-line while modifier
	  sleep
	  snore
	end while tired

上面的最后一个示例（多行 `while` modifier）需要多加注意，因为它引入了一些重要的新特性。当使用 `begin` 和 `end` 限定的代码块优先于 `while` 测试时，该代码总是至少执行一次。在其它类型的 `while` 循环中，代码可能永远都不会执行，除非布尔测试开始为 true。

<div class="note">
	<p class="h4"><b>确保循环至少执行一次</b></p>

通常 `while` 循环会执行 0 次或多次，因为布尔测试*先于*循环体执行；如果布尔测试在开始时就返回 false，则循环体内的代码永远不会运行。

但是，当 `while` 循环属于 `begin` 和 `end` 包裹的代码块类型时，循环将执行 1 次或多次，因为循环体内的代码*先于*布尔表达式执行。
</div>

<div class="code-file clearfix"><span>2loops.rb</span></div>

<div class="note">
要了解这两种类型的 <code>while</code> 循环的行为差异，请运行 <b>2loops.rb</b>。

这些示例应该有助于阐明该问题：

	x = 100

	# The code in this loop never runs
	while (x < 100) do puts('x < 100') end

	# The code in this loop never runs
	puts('x < 100') while (x < 100)

	# But the code in loop runs once
	begin puts('x < 100') end while (x < 100)
</div>

### until 循环

Ruby 也有一个 `until` 循环，可以被认为是 *'while not'* 循环。它的语法和选项与应用于 `while` 的那些相同——即测试条件与循环体代码可以放置于同一行中（此时 `do` 关键字是必须的），或者也可以放在不同行中（这时 `do` 是可选的）。

还有一个 `until` 修饰符，可以让你将循环体代码放置于测试条件之前，以及可选的是可以将循环体代码包含在 `begin` 和 `end` 之间来确保循环体代码块至少运行一次。

<div class="code-file clearfix"><span>until.rb</span></div>

这里有一些 `until` 循环的简单示例：

	i = 10

	until i == 10 do puts(i) end # never executes

	until i == 10                # never executes
	  puts(i)
	  i += 1
	end

	puts(i) until i == 10        # never executes

	begin                        # executes once
	  puts(i)
	end until i == 10

`while` 和 `until` 循环都可以像 `for` 循环一样用于迭代数组和其他集合。例如，这是迭代数组中所有元素的方法：

	while i < arr.length
	  puts(arr[i])
	  i += 1
	end

	until i == arr.length
	  puts(arr[i])
	  i +=1
	end

### 循环（Loop）

<div class="code-file clearfix"><span>3loops.rb</span></div>

**3loops.rb** 中的示例应该看起来都很熟悉 - 除了最后一个：

	loop {
	  puts(arr[i])
	  i+=1

	  if (i == arr.length) then
	    break
	  end
	}

这里使用 `loop` 方法来重复地执行花括号内的代码块。这就像我们之前在 `each` 方法中使用的迭代器块一样。同样地，我们可以选择块的界定符 - 花括号或者 `do` 和 `end`：

	puts( "\nloop" )
	i=0

	loop do
	  puts(arr[i])
	  i+=1

	  if (i == arr.length) then
	    break
	  end
	end

这段代码通过递增计数器变量 `i` 来遍历数组 `arr`，当 `(i == arr.length)` 条件求值为 true 时，跳出循环。你必须以这种方式跳出循环，因为不同于 `while` 或 `until`
，`loop` 方法执行测试条件以确定是否继续循环。 没有 `break`，它将永远循环。

## 深入探索

Hashes, Arrays, Ranges 和 Sets 都包含（include）了一个名为 Enumerable 的 Ruby 模块（module）。模块是一种代码库（我将在第 12 章中更多地讨论模块）。在第 4 章中，我使用了 Comparable 模块为数组添加比较方法，例如 `<` 和 `>`。你可能还记得我是通过继承 Array 类并将 Comparable 模块 "including" 到子类中来完成此操作：

	class Array2 < Array
	  include Comparable
	end

### Enumerable 模块

<div class="code-file clearfix"><span>enum.rb</span></div>

Enumerable 模块已经被包含进了 Ruby 的 Array 类中，它提供了很多有用的方法，例如 `include?` 方法会在数组中找到一个特定的值时返回 true，`min` 方法则会返回最小的元素值，`max` 方法返回最大的元素值，`collect` 方法会创建一个由块（block）返回的值组成的新数组。

	arr = [1,2,3,4,5]
	y = arr.collect{ |i| i }     #=> y = [1, 2, 3, 4]
	z = arr.collect{ |i| i * i } #=> z = [1, 4, 9, 16, 25]

	arr.include?( 3 ) #=> true
	arr.include?( 6 ) #=> false
	arr.min           #=> 1
	arr.max           #=> 5

<div class="code-file clearfix"><span>enum2.rb</span></div>

只要其它集合类包含 Enumerable 模块，就可以使用这些相同的方法。Hash 就是一个这样的类。但请记住，Hash 中的元素索引是没有顺序的，因此当你使用 `min` 和 `max` 方法时，将根据其数值返回最小和最大元素值 - 当元素值为字符串时，其数值由键（key）中字符的 ASCII 码确定。

### 自定义比较

但是我们假设你更喜欢 `min` 和 `max` 根据一些其它标准（比如字符串的长度）返回元素？最简单的方法是在块（block）内定义比较的本质。这与我在第 4 章中定义的排序块类似。你可能还记得我们通过将块（block）传递给 `sort` 方法来对 Hash（此处为变量 `h`）进行排序，如下所示：

	h.sort{ |a,b| a.to_s <=> b.to_s }

两个参数 `a` 和 `b` 表示来自 Hash 的两个元素，使用 `<=>` 比较方法进行比较。我们可以类似地将块（block）传递给 `max` 和 `min` 方法：

	h.min { |a,b| a[0].length <=> b[0].length }
	h.max { |a,b| a[0].length <=> b[0].length }

当 Hash 将元素传递给块时，它会以包含键值对（key-value）的数组形式传递。所以，如何一个 Hash 包含这样的元素...

	{"one"=>"for sorrow", "two"=>"for joy"}

...两个块参数，`a` 和 `b` 将会被初始化为两个数组：

	a = ["one", "for sorrow"]
	b = ["two", "for joy"]

这解释了为什么我在为 `max` 和 `min` 方法定义的自定义比较中特意比较的是两个块参数中位于索引 0 处的首个元素：

	a[0].length <=> b[0].length

这确保了比较是基于哈希中的*键*（keys）的。

如果你要比较*值*（values），而不是键（keys），只需要将数组的索引设置为 1：

<div class="code-file clearfix"><span>enum3.rb</span></div>

	p( h.min {|a,b| a[1].length <=> b[1].length } )
	p( h.max {|a,b| a[1].length <=> b[1].length } )

当然，你可以在块中定义其他类型的自定义比较。例如，假设你希望字符串 'one'，'two'，'three' 等按照我们说它们的顺序进行执行。这样做的一种方法是创建一个有序的字符串数组：

	str_arr=['one','two','three','four','five','six','seven']

现在，如果一个 Hash，`h` 包含这些字符串作为键（key），则块可以使用 `str_array` 作为键的引用以确定最小值和最大值：

	h.min { |a,b| str_arr.index(a[0]) <=> str_arr.index(b[0])}
	#=> ["one", "for sorrow"]

	h.max { |a,b| str_arr.index(a[0]) <=> str_arr.index(b[0])}
	#=> ["seven", "for a secret never to be told"]

上面所有的示例都使用了 Array 和 Hash 类的 `min` 和 `max` 方法。请记住，是 Enumerable 模块给这些类提供了这些方法。

在某些情况下，能够将诸如 `max`，`min` 和 `collect` 之类的 Enumerable 方法应用于不是从现有的实现这些方法的类（例如 Array）中派生出来的类中是有用的。你可以在你的类中包含 Enumerable 模块，然后编写一个名为 `each` 的迭代器方法：

<div class="code-file clearfix"><span>include_enum1.rb</span></div>

	class MyCollection
	  include Enumerable

	  def initialize( someItems )
		@items = someItems
	  end

	  def each
		@items.each { |i|
		  yield( i )
		}
	  end
	end

在这里，你可以使用数组初始化一个 MyCollection 对象，该数组将存储在实例变量 `@items` 中。当你调用 Enumerable 模块提供的方法之一（例如 `min`，`max` 或 `collect`）时，这将“在幕后”（behind the scenes）调用 `each` 方法，以便一次获取一个数据。

	things = MyCollection.new(['x','yz','defgh','ij','klmno'])

	p( things.min )  #=> "defgh"
	p( things.max )  #=> "yz"
	p( things.collect{ |i| i.upcase } )
					 #=> ["X", "YZ", "DEFGH", "IJ", "KLMNO"]

<div class="code-file clearfix"><span>include_enum2.rb</span></div>

你可以类似地使用 `MyCollection` 类来处理数组，例如 Hashes 的键（keys）或值（values）。目前，`min` 和 `max` 方法采用基于数值执行比较的默认行为，因此基于字符的ASCII 值，'xy' 将被认为比 'abcd''更大'。如果你想执行一些其它类型的比较 - 例如，通过字符串长度来比较，以便 'abcd' 被认为大于 'xz' - 你可以覆盖 `min` 和 `max `方法：

<div class="code-file clearfix"><span>include_enum3.rb</span></div>

	def min
	  @items.to_a.min { |a,b| a.length <=> b.length }
	end

	def max
	  @items.to_a.max { |a,b| a.length <=> b.length }
	end

<div class="note">
	<p class="h4"><b>Each and Yield…</b></p>

那么，当 Enumerable 模块中的方法调用你编写的 `each` 方法时，真正发生了什么？事实证明，Enumerable 方法（`min`，`max`，`collect` 等）给 `each` 方法传递了一个代码块（block）。这段代码期望一次接收一个数据（即来自某种集合的每个元素）。你的 `each` 方法以块参数的形式为其提供该项，例如此处的参数 `i`：

	def each
	  @items.each{ |i|
		yield( i )
	  }
	end

关键字 `yield` 是一个特殊的 Ruby 魔术，它告诉代码运行传递给 `each` 方法的块 - 也就是说，运行 Enumerator 模块的 `min`，`max` 或 `collect` 方法传递的代码块。这意味着这些方法的代码块可以应用于各种不同类型的集合。你所要做的就是，i）在你的类中包含 Enumerable 模块；ii）编写 `each` 方法，确定 Enumerable 方法将使用哪些值。
</div>