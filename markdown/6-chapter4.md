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

### 数组（Array）

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

<div class="code-file clearfix"><span>array_copy.rb</span></div>

注意，如果你使用赋值运算符 `=` 将一个数组变量赋值给另一个变量时，你实际上只是将该数组的引用赋值给了另一个变量，并没有真正复制该数组。你可以使用 `clone` 方法来为该数组创建一个副本：

	arr1 = ['h','e','l','l','o',' ','w','o','r','l','d']
	arr2 = arr1
		# arr2 is now the same as arr1. Change arr1 and arr2 changes too!
	arr3 = arr1.clone
		# arr3 is a copy of arr1. Change arr1 and arr2 is unaffected

#### 数组比较

<div class="code-file clearfix"><span>array_compare.rb</span></div>

关于比较运算符 `<=>` 需要额外说几句。这里我们比较两个数组，称之为 `arr1` 和 `arr2`；如果 `arr1` 小于 `arr2`，则返回 -1; 如果 `arr1` 和 `arr2` 相等，它返回 0; 如果 `arr2` 大于 `arr1`，则返回 1。但是，Ruby 是如何确定一个数组是“大于”还是“小于”另一个数组？事实证明，Ruby 会将两个数组中相同索引位置上的元素进行比较。当遇到两个元素值不相等时，将返回其比较结果。换句话说，如果进行了这种比较：

	[0, 10, 20] <=> [0, 20, 20]

将会返回 -1（第一个数组小于第二个数组），因为在索引为 1 时第一个数组中的值（10）小于第二个数组中的值（20）。

如果要比较字符串数组，则对字符串的 ASCII 值进行比较。如果一个数组比另一个数组长，并且两个数组中的元素都相等，那么较长的数组被认为“更大”。但是，如果短数组中的元素值有比长数组的元素值大的，则认为短数组更大。

#### 数组排序

<div class="code-file clearfix"><span>array_sort.rb</span></div>

`sort` 方法使用比较运算符 `<=>` 来比较相邻的数组元素。该运算符在许多 Ruby 类中都有定义，包括数组（Array）、字符串（String）、浮点数（Float）、日期（Date）和 Fixnum。但是，sort 运算并没有为所有类定义（也就是说，派生出其它所有类的 Object 类中 sort 没有定义）。其中令人遗憾的是，它不能用于对包含 `nil`  值的数组进行排序。但是，这个可以通过定义你自己的排序例程来解决。通过给 sort 方法发生一个块（block）来实现。我们将在第 10 章详细介绍块（blocks）。现在，只需要知道这里的块（block）是一段决定了 `sort` 方法如何进行元素比较的代码就足够了。

这是我的 `sort` 例程：

	arr.sort {
	  |a,b|
		a.to_s <=> b.to_s
	}

这里的 `arr` 代表一个数组，变量 `a` 和 `b` 代表两个连续的元素。我已经使用 `to_s` 方法将每个变量转换成了字符串；这样就会将 `nil` 转换成一个排序时认为更小的空字符串。注意，虽然我的 block 定义了数组的排序顺序，但不会改变数组元素自身。所以，`nil` 依然为 `nil`，整数（integers）依然为整数。字符串的转换操作只用于实现元素比较，不会改变数组元素。

#### 比较值

这个比较运算符 `<=>`（实际上是一个方法）在 Ruby 名为 Comparable 的模块中定义的。现在，你可以将模块（module）视为一种可重用的排序代码库。我们将在第 12 章中更详细地研究模块。

你可以在自己的类中包含（include）Comparable 模块。这样你就可以覆盖掉 `<=>` 方法，去实现特定类型对象之间比较的准确方式。例如，你可能想子类化 Array，以便仅基于两个数组的长度进行比较，而不是数组中的每个元素值（如前所述，这是默认的）。下面来看看如何做到这一点：

<div class="code-file clearfix"><span>comparisons.rb</span></div>

	class MyArray < Array
	  include Comparable

	  def <=> ( anotherArray )
		self.length <=> anotherArray.length
	  end
	end

现在，你可以初始化两个 MyArray 对象：

	myarr1 = MyArray.new([0,1,2,3])
	myarr2 = MyArray.new([1,2,3,4])

你可以使用在 MyArray 类中定义的 `<=>` 方法来进行比较：

					   # Two MyArray objects
	myarr1 <=> myarr2  # returns 0

返回 0 表示两个数组相等（因为我们的 `<=>` 方法仅根据长度来进行比较是否相等）。另一方面，我们也可以用相同的整数初始化两个标准数组（Arrays），用 Array 类自己的 `<=>` 方法来执行比较：

				   # Two Array objects
	arr1 <=> arr2  # returns -1

这里的 -1 代表第一个数组小于第二个数组，因为 Array 类的 `<=>` 比较得出 `arr1` 中的元素数值小于 `arr2` 中相同索引位置上的元素数值。

但是，如果你想直接使用“小于”、“等于”、“大于”这些常规运算符进行比较：

	<   # less than
	==  # equal to
	>   # greater than

在 MyArray 类中，我们可以在不编写任何额外代码的情况下进行比较。这是由于已包含在 MyArray 类中的 Comparable 模块自动提供了这三种比较方法; 每种方法都根据 `<=>` 方法的定义进行比较。因为我们的 `<=>` 方法基于元素数量进行判断，所以 '<' 方法在第一个数组较短时返回 true，`==` 在两个数组长度相等时返回 true，`>` 方法在第二个数组较短时返回 true。

	p( myarr1 < myarr2 )  #=> false
	p( myarr1 == myarr2 ) #=> true

但是，标准 Array 类不包含 Comparable 模块。因此，如果您尝试使用 `<`，`==` 或 `>` 比较两个普通数组，Ruby 将显示一个错误消息，告诉您该方法未定义。

事实证明，很容易将这三种方法添加到 Array 的子类中。 所有你要做的就是包含（include）Comparable 模块，像这样：

	class Array2 < Array
	  include Comparable
	end

现在 Array2 类将基于 Array 的 `<=>` 方法进行比较，也就是比较数组中的每一个元素，而不是数组的长度。假设有 Array2 对象，`arr1` 和 `arr2`，用之前我们用于 `myarr1` 和 `myarr2` 的同样的数组进行初始化，我们可以看到这些结果：

	p( arr1 < arr2 )  #=> true
	p( arr1 > arr2 )  #=> false

#### 数组方法

<div class="code-file clearfix"><span>array_methods.rb</span></div>

一些标准数组方法会修改数组本身，而不是返回修改了的数组副本。这些不仅包括那些标有末尾感叹号的方法，例如 `flatten!` 和 `compact!`，还有 `<<` 方法通过添加右边的数组到左边的数组来改变原数组，`clear` 方法会移除数组中的所有元素，以及 `delete` 和 `delete_at` 方法将会移除所选元素。

### 哈希表（Hash）

虽然数组提供了一种好的方式来通过数字索引集合中的元素，但有时候以其它方式进行索引会更方便。例如，如果你正在创建一个食谱集合，那么按名称索引每个食谱会更有意义，例如 “Rich Chocolate Cake” 和 “Coq au Vin”，而不是数字 23、87 等等。

Ruby 有一个类可以让你做到这一点。它被称为哈希（Hash）。在其它语言中被称为字典（Dictionary）。就像真正的字典一样，条目由一些唯一键（在字典中，这将是一个单词）索引，该键与一个值相关联（在字典中，这将是单词的定义）。

#### 创建哈希表

<div class="code-file clearfix"><span>hash1.rb</span></div>

就像数组一样，您可以通过创建 Hash 类的新实例来创建一个哈希表：

	h1 = Hash.new
	h2 = Hash.new("Some kind of ring")

上面的两个例子都创建了一个空的哈希表。Hash 对象始终具有一个默认值，即在给定索引处未找到特定值时返回的值。在这些例子中，`h2` 用 “Some kind of ring” 作为初始化的默认值，`h1` 没有指定初始化的默认值，因此其默认值为 `nil`。

创建 Hash 对象后，可以使用类似数组的语法向其添加元素，也就是说将索引放在方括号中，使用 `=` 号来赋值。这里明显的区别是，对于数组来说索引必须是整数; 而对于哈希表，它可以是任何唯一的数据项：

	h2['treasure1'] = 'Silver ring'
	h2['treasure2'] = 'Gold ring'
	h2['treasure3'] = 'Ruby ring'
	h2['treasure4'] = 'Sapphire ring'

通常，键（key）可以是数字，或者如上面的代码中那样是字符串。 但是，原则上键可以是任何类型的对象。

<div class="note">
	<p class="h4"><b>唯一键（keys）？</b></p>

给哈希表分配键（key）时要小心。如果你在一个 Hash 中使用了两次同样的键（key），你最终将覆盖原来的值。这就像为数组中的同一索引赋值两次一样。思考这个例子：

	h2['treasure1'] = 'Silver ring'
	h2['treasure2'] = 'Gold ring'
	h2['treasure3'] = 'Ruby ring'
	h2['treasure1'] = 'Sapphire ring'

在这里 “treasure1” 键使用了两次。因此，原来的值 “Silver ring” 被 “Sapphire ring” 替换，该 Hash 为：

	{"treasure1" => "Sapphire ring", "treasure2" => "Gold ring", "treasure3" => "Ruby ring"}
</div>

给定一些类 `X`，以下的赋值是合法的：

	x1 = X.new('my Xobject')
	h2[x1] = 'Diamond ring'

有一种创建哈希表并初始化一些键值对的简写方式。只需要在键（key）后跟 `=>` 和关联的值（value），每个键值对使用逗号分割，整体放在一对花括号中：

	h1 = {  'room1'=>'The Treasure Room',
			'room2'=>'The Throne Room',
			'loc1'=>'A Forest Glade',
			'loc2'=>'A Mountain Stream' }

#### 哈希表索引

要访问值，将键（key）放在方括号中：

	puts(h1['room2']) #=> "The Throne Room"

如果指定不存在的键，则返回默认值。回想一下，之前我们没有为 `h1` 指定默认值，但为 `h2` 指定了默认值：

	p(h1['unknown_room'])  #=> nil
	p(h2['unknown_treasure'])  #=> 'Some kind of ring'

使用 `default` 方法获取默认值，并用 `default=` 方法可以设置默认值（有关 *get* 和 *set* 存取器方法的详细信息，请参见第 2 章）：

	p(h1.default)
	h1.default = 'A mysterious place'

#### 哈希表拷贝

<div class="code-file clearfix"><span>hash2.rb</span></div>

与数组一样，可以将一个 Hash 变量赋值给另一个变量，在这种情况下两个变量将引用相同的 Hash，使用任何一个变量的修改都会影响到该 Hash：

	h4 = h1
	h4['room1'] = 'A new Room'
	puts(h1['room1']) #=> 'A new Room'

如果你希望两个变量引用拥有相同元素的不同的 Hash 对象，使用 `clone` 方法创建一个新副本：

	h5 = h1.clone
	h5['room1'] = 'An even newer Room'
	puts(h1['room1']) #=> 'A new room' (i.e. its value is unchanged)

#### 哈希表排序

<div class="code-file clearfix"><span>hash_sort.rb</span></div>

和数组一样，你可能会发现 Hash 的 `sort` 方法也存在一些问题。该方法期望处理的键（keys）具有相同的数据类型，因此，你将一个使用数字索引和另一个使用字符串索引的数组合并后，你无法对该 Hash 进行正确排序。和数组一样，解决该问题的方法是通过编写一些代码来进行自定义类型的比较并将其传递给 `sort` 方法。你可能会定义一个方法，如下所示：

	def sorted_hash( aHash )
	  return aHash.sort {
		|a,b|
		  a.to_s <=> b.to_s
	  }
	end

这将会根据 Hash 中每个键（key）的字符串（`to_s`）形式进行排序。实际上，Hash 的 `sort` 方法是将 Hash 转换为嵌套数组 *\[key，value\]* 后使用 Array 的 `sort` 方法对它们进行排序。

#### 哈希表方法

<div class="code-file clearfix"><span>hash_methods.rb</span></div>

Hash 类有许多内置方法。例如，哈希表 `aHash` 通过元素的键来删除元素使用 `aHash.delete( someKey )`。测试一个键（key）或者（value）是否存在则使用 `aHash.has_key?( someKey )` 和 `aHash.has_value?( someValue )`。要返回一个使用原始哈希表的值（values）作为键（keys）创建的新哈希表，并将其键作为值使用则通过 `aHash.invert` 方法；返回一个填充了哈希键（keys）或其值（values）的数组使用 `aHash.keys` 和 `aHash.values`，等等。

**hash_methods.rb** 中有许多这些方法的示例。

## 深入探索

### 以数组方式操作哈希表

<div class="code-file clearfix"><span>hash_ops.rb</span></div>

Hash 的 `keys` 和 `values` 方法都返回一个数组，以便您可以使用各种数组方法来处理它们。以下是一些简单的例子：

	h1 = {'key1'=>'val1', 'key2'=>'val2', 'key3'=>'val3', 'key4'=>'val4'}
	h2 = {'key1'=>'val1', 'KEY_TWO'=>'val2', 'key3'=>'VALUE_3', 'key4'=>'val4'}

	p( h1.keys & h2.keys ) 	   # set intersection (keys)
	#=> ["key1", "key3", "key4"]

	p( h1.values & h2.values ) # set intersection (values)
	#=> ["val1", "val2", "val4"]

	p( h1.keys+h2.keys )  	   # concatenation
	#=> [ "key1", "key2", "key3", "key4", "key1", "key3", "key4", "KEY_TWO"]

	p( h1.values-h2.values )   # difference
	#=> ["val3"]

	p( (h1.keys << h2.keys) )  # append
	#=> ["key1", "key2", "key3", "key4", ["key1", "key3", "key4", "KEY_TWO"]]

	p( (h1.keys << h2.keys).flatten.reverse )  # 'un-nest' arrays and reverse
	#=> ["KEY_TWO", "key4", "key3", "key1", "key4", "key3", "key2", "key1"]

### 附加和连接

请注意两种数组连接是有区别的，使用 `+` 是将第二个数组的每个元素添加到第一个数组中，使用 `<<` 是将第二个数组作为第一个数组的最后一个元素添加。

<div class="code-file clearfix"><span>append_concat.rb</span></div>

	a =[1,2,3]
	b =[4,5,6]
	c = a + b  #=> c=[1, 2, 3, 4, 5, 6] a=[1, 2, 3]
	a << b     #=> a=[1, 2, 3, [4, 5, 6]]

另外，`<<` 会改变第一个数组（接收者，receiver），而 `+` 会返回一个新的数组，原数组（接收者，receiver）保持不变。

<div class="note">
	<p class="h4"><b>接受者（Receivers），消息（Messages）和方法（Methods）</b></p>

在面向对象术语中，方法所属的对象被称为接收者 **receiver**。这表示不像面向过程的语言中那样“调用函数”（calling functions），而是将“消息”（messages）发送给对象。例如，消息 `+1` 可能会发送给一个整数（integer）对象，而消息 `reverse` 则可能会发送给一个字符串（string）对象。“接收”消息的对象（receives）试图找到响应消息的方式（即“方法”，`method`）。例如，字符串（string）对象拥有一个 `reverse` 方法，所以它可以响应 `reverse` 消息，而整数（integer）对象没有该方法，也就不能响应。

</div>

在使用 `<<` 方法附加数组后，如果你想将每个附加数组的元素都添加到 receiver 数组，而不是将整个附加数组嵌套在 receiver 数组中，你可以使用 `flatten` 方法：

	a=[1, 2, 3, [4, 5, 6]]
	a.flatten  #=> [1, 2, 3, 4, 5, 6]

### 矩阵和向量

Ruby 提供了 Matrix 类，它包含多个行（rows）和列（columns），其每个值都可以表示为向量（vector）（Ruby 也提供 Vector 类）。Matrices 允许您执行矩阵运算。例如，给出两个 Matrix 对象，`m1` 和 `m2`，你可以在矩阵中添加每个对应单元格的值，如下所示：

<div class="code-file clearfix"><span>matrix.rb</span></div>

	m3 = m1+m2

### Sets

Set 类实现了没有重复值的无序集合（collection）。你可以使用数组来初始化一个 `Set`，在这种情况下，重复的元素将会被忽略：

*例如：*

<div class="code-file clearfix"><span>sets.rb</span></div>

	s1 = Set.new( [1,2,3, 4,5,2] )
	s2 = Set.new( [1,1,2,3,4,4,5,1] )
	s3 = Set.new( [1,2,100] )
	weekdays = Set.new( %w( Monday, Tuesday, Wednesday, Thursday,
			Friday, Saturday, Sunday ) )

你可以使用 `add` 方法来添加新的值：

	s1.add( 1000 )

`merge` 方法可以将两个集合（Set）的值组合在一起：

	s1.merge(s2)

你可以使用 `==` 来判断是否相等。包含相同值的两个集合（sets）（记住在创建集合时将删除重复项）被认为是相等的：

	p( s1 == s2 )  #=> true