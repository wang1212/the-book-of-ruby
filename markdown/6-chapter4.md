---

	{
		"title": "第四章",
		"ctime": "2016-11-13 19:37:00",
		"mtime": "2016-11-13 19:37:00"
	}

---

# 第四章

***

## 数组与哈希表

到目前为止，我们一般一直在使用单个对象。 在这一章中我们将会了解如何创建对象列表。 我们首先来看最常见的列表结构类型——数组。

### 数组

<div class="code-file clearfix"><span>array0.rb</span></div>

<div class="note">
	<p class="h4" style="font-weight: bold">什么是数组(Array）？</p>

数组是每个元素都可以被索引到的有序集合。在 Ruby 中，（与许多其它语言不同）一个 Array 可以包含不同类型的元素，例如字符串、整数和浮点数，甚至是方法的返回值。

	a1 = [1, 'two', 3.0, array_length(a0)]

数组中的第一个项目的索引为 0，这意味着数组中的最后一个元素的索引为数组中元素总数减 1。如上所示，给定一个数组 `a1`，然后访问其第一个和最后一个元素：

	a1[0]  # returns 1st item (at index 0)
	a1[3]  # returns 4th item (at index 3)

</div>

我们已经使用了数次数组，例如在第二章的 **2adventure.rb** 中我们使用了一个数组来存储房间的地图：

	mymap = Map.new([room1, room2, room3])

#### 创建数组

与其他许多编程语言一样，Ruby 使用方括号来界定数组。你可以使用逗号分隔多个值很容易的创建一个数组，并将其赋给一个变量。

	arr = ['one','two','three','four']

<div class="code-file clearfix"><span>array1.rb</span></div>

与 Ruby 中其它的东西一样，数组也是对象。你可能会猜到，正如字符串一样，它由 `Array` 类定义，索引从 0 开始。你可以将索引放在方括号中得到相应元素，如果索引无效，将会返回 `nil`：

	arr = ['a', 'b', 'c']
	puts(arr[0]) # shows "a"
	puts(arr[1]) # shows "b"
	puts(arr[2]) # shows "c"
	puts(arr[3]) # nil

<div class="code-file clearfix"><span>array2.rb</span></div>

在数组中混合数据类型是被允许的，甚至也可以包含一些产生值的表达式。假设你创建了这个方法：

	def hello
	  return "hello world"
	end

你可以这样声明一个数组：

	x = [1+2, hello, `dir`]

这里，第一个元素是整数 3，第二个元素是字符串 “hello world”（由 `hello` 方法返回）。如果你在 Windows 上运行，第三个数组将是一个包含目录列表的字符串。这是因为 <code>`dir`</code> 反引号字符串是可以被操作系统执行的命令（见第三章）。因此，数组中的最后一个位置将被 **dir** 命令返回的文件名字符串填充。如果你是运行在不同的操作系统上，这时候应该替换一个合适的命令。

<div class="code-file clearfix"><span>dir_array.rb</span></div>

<div class="note">
	<p><b>创建一个文件名的数组</b></p>
	<p>
		许多 Ruby 类有返回值为数组的方法。例如，Dir 类用来执行在磁盘上目录操作，拥有<code>entries</code>方法。传递给该方法一个目录名称，将会返回一个包含文件名列表的数组。
	</p>

	Dir.entries('C:\\') # returns an array of files in C:\

</div>

如果你要创建一个包含单引号字符串的数组，但是输入所有引号又很麻烦，一种简洁的方式就是使用 `%w` 和将不带引号的字符串以空格分隔放入圆括号中的形式表示（或者使用 `%W` 表示双引号字符串，如第三章所述）：

<div class="code-file clearfix"><span>array2.rb</span></div>

	y = %w(this is an array of strings)

你也可以使用通常的构造器来（new）创建一个数组，你可以同时将一个整数传递给构造方法，来创建一个特定大小（每个元素值为 `nil`）的数组。当然，你也可以传递两个参数，第一个参数指定数组大小，第二个参数指定要放入数组中的元素：

	a = Array.new # an empty array
	a = Array.new(2) # [nil,nil]
	a = Array.new(2, "hello world")  # ["hello world", "hello world"]

#### 多维数组

要创建一个多维数组，你可以先创建一个数组，然后再将其它数组作为元素放入该数组中。例如，这将创建一个包含两个数组元素的数组。

	a = Array.new(2)
	a[0]= Array.new(2,'hello')
	a[1]= Array.new(2,'world')

<div class="note">
	<p>
		你还可以将数组对象作为参数传递给数组的 <code>new</code> 方法来创建多维数组。不过要注意，虽然在传递数组参数时不适用圆括号是可以的，但你如果不在方法名和参数之间加入空格，Ruby 将认为这是一个语法错误，所以在传递参数时，请一定要使用圆括号。
	</p>
	<p>
		也可以使用方括号将数组嵌套在一起。这是创建了一个包含四个数组元素的 2 维数组，每个数组元素包含四个整数元素：
	</p>
</div>

	a = [   [1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,16]  ]

在上面显示的代码中，我将四个子数组分别放在不同行中，这并不是强制性的，但这样的写法有助于构建多元化的数组结构，通过将每个子数组显示为一行，类似电子表格中的行。当谈到数组中的数组时，可以很方便的将每个子数组引用为外层数组的行。

<div class="code-file clearfix"><span>multi_array.rb</span></div>

有关更多的使用多维数组的示例，请加载 **multi_array.rb** 程序。首先创建了包含另外两个数组的多维数组 `multiarr`，而这两个数组中在多维数组中的索引分别为 0 和 1。

	multiarr = [['one','two','three','four'],[1,2,3,4]]

#### 数组迭代

你可以使用 `for` 循环来遍历数组访问数组中的元素，循环将会遍历位于索引 0 和 1 处的子数组两个元素：

	for i in multiarr
	  puts(i.inspect)
	end

将会输出：

	>["one", "two", "three", "four"]
	[1, 2, 3, 4]

那么，你如何子数组中的元素呢？如果元素数量是固定的，你可以指定多个不同迭代变量，这时将会匹配子数组中对应索引位置的元素。

这两个子数组有四个元素，所以你可以使用四个迭代变量：

	for (a,b,c,d) in multiarr
	  print("a=#{a}, b=#{b}, c=#{c}, d=#{d}\n" )
	end

<div class="note">
	<p class="h4"><b>迭代器和 for 循环</b></p>

`for` 循环中的代码对每一个迭代元素进行执行，语法可以总结如下：

	for <one or more variables> in <expression> do
	  <code to run>
	end

当提供多个变量时，会将这些变量传递给代码里面的 `for...end` 块，如同给方法传递参数一样。在这里，你可以将 `(a,b,c,d)` 作为四个参数进行初始化，每一次匹配 `for` 循环所遍历的多维数组 `multiarr` 的每一行：

	for (a,b,c,d) in multiarr
	  print("a=#{a}, b=#{b}, c=#{c}, d=#{d}\n" )
	end

我们将在下一章中更深入地研究 `for` 循环和其他迭代器。
</div>

<div class="code-file clearfix"><span>multi_array2.rb</span></div>

您还可以使用 for 循环来单独迭代每个子数组中的所有元素：

	for s in multiarr[0]
	  puts(s)
	end
	for s in multiarr[1]
	  puts(s)
	end

以上两种技术（多个迭代变量和多个 `for` 循环）都需要满足两个条件：a）你需要知道多维数组有几行或者几列；b）每个子数组都包含相同数量的元素。

为了更灵活的迭代多维数组，你可以使用嵌套的 `for` 循环。一个外部循环遍历每一行，内部循环则遍历当前行中的元素。这种技术在子数组有不同数量元素时都可以正常运行：

	for row in multiarr
	  for item in row
		puts(item)
	  end
	end

#### 数组索引

与字符串一样（参见第三章），你可以使用负数从末尾开始索引元素，也可以使用范围来索引：

<div class="code-file clearfix"><span>array_index.rb</span></div>

	arr = ['h','e','l','l','o',' ','w','o','r','l','d']

	print( arr[0,5] )  #=> "hello"
	print( arr[-5,5 ] ) #=> "world"
	print( arr[0..4] ) #=> "hello"
	print( arr[-5..-1] ) #=> "world"

注意，与字符串一样，当提供两个整数以返回一个来自数组的连续几项的元素，第一个整数作为起始索引，第二个则是元素数目（并非终止索引）：

	arr[0,5]  # returns 5 chars - ["h", "e", "l", "l", "o"]

<div class="code-file clearfix"><span>array_assign.rb</span></div>

你也可以利用索引来进行数组中元素的赋值，例如，我们首先创建一个空的数组，然后对索引为 0，1 和 3 的位置进行赋值，而没有赋值的索引为 2 的位置将填充一个默认值 `nil`：

	arr = []

	arr[0] = [0]
	arr[1] = ["one"]
	arr[3] = ["a", "b", "c"]

	# arr now contains:
	# [[0], ["one"], nil, ["a", "b", "c"]]

同样地，你也可以使用范围，负索引等：

	arr2 = ['h','e','l','l','o',' ','w','o','r','l','d']

	arr2[0] = 'H'
	arr2[2,2] = 'L', 'L'
	arr2[4..6] = 'O','-','W'
	arr2[-4,4] = 'a','l','d','o'

	# arr2 now contains:
	# ["H", "e", "L", "L", "O", "-", "W", "a", "l", "d", "o"]

#### 数组拷贝

#### 数组的平均数测试

#### 数组排序

#### 比较值

#### 数组方法

### 哈希表

#### 创建哈希表

#### 哈希表索引

#### 哈希表拷贝

#### 哈希表排序

#### 哈希表方法

## 深入探索

### 以数组方式操作哈希表

### 附加和连接

### 矩阵和向量

### Sets