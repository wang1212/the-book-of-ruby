---

	{
		"title": "第十四章",
		"ctime": "2018-12-25 00:02:00",
		"mtime": "2018-12-25 00:02:00"
	}

---

# 第十四章

***

## YAML

在某些时候，大多数桌面应用程序都希望在磁盘上保存和读取结构化数据。我们已经看到了如何使用简单的 IO 例程（如 `gets` 和 `puts`）读取和写入数据。但是，如何编写保存和恢复混合对象类型列表中的数据？使用 Ruby 执行此操作的一种简单方法是使用 YAML。

<div class="note">

**YAML** 是 "Yet An-other Markup Language"（仍是一种标记语言，有争议）或 "YAML Ain't Markup Language" （不是标记语言，递归的）的首字母缩写。
</div>

### 转换成 YAML

YAML 定义了一种序列化（数据保存）格式，它将信息存储为人类可读的文本。YAML 可以与各种编程语言一起使用，为了在 Ruby 中使用它，你的代码需要使用 **yaml.rb** 文件。通常，这可以通过在代码单元的顶部加载或“引入”（requiring）文件来完成，如下所示：

	require 'yaml'

完成此操作后，你将可以访问各种方法将 Ruby 对象转换为 YAML 格式，以便将其数据写入文件。随后，你将能够回读已保存的数据并使用它来重新构造 Ruby 对象。

要将对象转换为 YAML 格式，可以使用 `to_yaml` 方法。它可以转换任何对象 - 字符串，整数，数组，哈希等。例如，这是转换字符串的方式：

<div class="code-file clearfix"><span>to_yaml1.rb</span></div>

	"hello world".to_yaml

这是如何转换数组：

	["a1", "a2" ].to_yaml

这是你通过此数组转换获得的 YAML 格式：

	---
	- a1
	- a2

请注意定义新 YAML '文档'的开头的三个破折号以及定义列表中每个新元素的单个破折号。有关 YAML 格式的更多信息，请参阅本章末尾的“深入探索”部分。

你还可以将非标准类型的对象转换为 YAML。例如，假设你创建了此类和对象...

<div class="code-file clearfix"><span>to_yaml2.rb</span></div>

	class MyClass
	  def initialize( anInt, aString )
		@myint = anInt
		@mystring =aString
	  end
	end

	ob1 = MyClass.new( 100, "hello world" ).to_yaml

此对象的 YAML 表示形式将以文本 `!ruby/object:` 开头，后跟类名，每行一个变量名称附加冒号（但减去 `@`）及其值：

	--- !ruby/object:MyClass
	myint: 100
	mystring: hello world

如果要打印出对象的 YAML 表示，可以使用方法 `y()`，它是一种 YAML 的方法，等同于我们熟知的用来查看并打印正常的 Ruby 对象的 `p()` 方法：

<div class="code-file clearfix"><span>yaml_test1.rb</span></div>

	y( ['Bert', 'Fred', 'Mary'] )

这将显示：

	---
	- Bert
	- Fred
	- Mary

你可以同样的显示一个哈希对象...

	y( { 'fruit' => 'banana', :vegetable => 'cabbage', 'number' => 3 } )

...在这种情况下，每个键/值对都放在一个新行上：

	---
	number: 3
	fruit: banana
	:vegetable: cabbage

或者你可以显示自己的“自定义”对象...

	t = Treasure.new( 'magic lamp', 500 )
	y( t )

...它显示的数据，如前面我使用 `to_yaml` 的示例一样，顶部是类名以及连续行上是一对变量名和值：

	--- !ruby/object:Treasure
	name: magic lamp
	value: 500

<div class="code-file clearfix"><span>yaml_test2.rb</span></div>

你甚至可以使用 `y()` 来显示非常复杂的对象，例如嵌套数组：

	arr1 = [ ["The Groovesters", "Groovy Tunes", 12 ],
			[ "Dolly Parton", "Greatest Hits", 38 ]
		]

	y( arr1 )

...或包含任意类型对象的数组：

	arr2 = [ CD.new("The Beasts", "Beastly Tunes", 22),
			CD.new("The Strolling Bones", "Songs For Senior Citizens", 38)
		]

	y( arr2 )

### 嵌套序列

当相关的数据序列（例如数组）嵌套在其它数据序列中时，这种关系由缩进表示。所以，例如，假设我们在 Ruby 中声明了这个数组...

<div class="code-file clearfix"><span>nested_arrays.rb</span></div>

	arr = [1,[2,3,[4,5,6,[7,8,9,10],"end3"],"end2"],"end1"]

当呈现为 YAML（例如，通过 `y(arr)`）时，这变为：

	---
	- 1
	- - 2
	  - 3
	  - - 4
	    - 5
	    - 6
	    - - 7
	      - 8
	      - 9
	      - 10
	    - end3
	  - end2
	- end1

### 保存 YAML 数据

`dump` 方法提供了另一种方便的方式将 Ruby 对象转换为 YAML 格式。最简单的是，它会将你的 Ruby 数据转换为 YAML 格式并将其转储为字符串：

<div class="code-file clearfix"><span>yaml_dump1.rb</span></div>

	arr = ["fred", "bert", "mary"]
	yaml_arr = YAML.dump( arr )	# yaml_arr is now: "--- \n- fred\n- bert\n- mary\n"

更有用的是，`dump` 方法可以接收第二个参数，它是某种 IO 对象，通常是文件（file）。你可以打开文件并将数据转储给它...

<div class="code-file clearfix"><span>yaml_dump2.rb</span></div>

	f = File.open( 'friends.yml', 'w' )
	YAML.dump( ["fred", "bert", "mary"], f )
	f.close

...或者你可以打开文件（或其它类型的 IO 对象）并将其传递到关联的块中：

	File.open( 'morefriends.yml', 'w' ){ |friendsfile|
		YAML.dump( ["sally", "agnes", "john" ], friendsfile )
	}

如果使用块，则退出块时文件将自动关闭，否则应使用 `close` 方法显式关闭文件。顺便提一下，你也可以以类似的方式使用块来打开文件并读入 YAML 数据：

	File.open( 'morefriends.yml' ){ |f|
		$arr= YAML.load(f)
	}

### 保存时忽略变量

如果由于某种原因，在序列化对象时要省略某些实例变量，可以通过定义名为 `to_yaml_properties` 的方法来实现。

在此方法的主体中，放置一个字符串数组。每个字符串应与要保存的实例变量的名称匹配。任何未指定的变量都不会被保存。看看这个示例：

<div class="code-file clearfix"><span>limit_y.rb</span></div>

	class Yclass
	  def initialize(aNum, aStr, anArray)
		@num = aNum
		@str = aStr
		@arr = anArray
	  end

	  def to_yaml_properties
		["@num", "@arr"] #<= @str will not be saved!
	  end
	end

这里 `to_yaml_properties` 限制了当你调用 `YAML.dump` 时被保存的变量仅为 `@num` 和 `@arr`。字符串变量 `@str` 将不会被保存。如果你以后希望根据保存的 YAML 数据重建对象，则你有义务确保“缺失”变量是不被需要的（在这种情况下可以忽略它们），或者如果需要，它们应该用一些有意义的值初始化：

	ob = Yclass.new( 100, "fred", [1,2,3] )	# ...creates object with @num=100, @str="fred", @arr=[1,2,3]

	yaml_ob = YAML.dump( ob ) #...dumps to YAML only the @num and @arr data (omits @str)

	ob2 = YAML.load( yaml_ob )	#...creates ob2 from dumped data with @num=100, @arr=[1,2,3] , but without @str

### 一个文件中多个文档

早些时候，我提到过三个破折号用于标记新的 YAML “文档”（document）的开头。在 YAML 术语中，文档是离散的组或片段。单个文件可能包含许多此类“文档”。

例如，假设你要将两个数组 `arr1` 和 `arr2` 保存到文件 **'multidoc.yml'**。 这里 `arr1` 是一个包含两个嵌套数组的数组，`arr2` 是一个包含两个 CD 对象的数组：

<div class="code-file clearfix"><span>multi_docs.rb</span></div>

	arr1 = [ ["The Groovesters", "Groovy Tunes", 12 ],
			[ "Dolly Parton", "Greatest Hits", 38 ]
		]

	arr2 = [ CD.new("Gribbit Mcluskey", "Fab Songs", 22),
			CD.new("Wayne Snodgrass", "Singalong-a-Snodgrass", 24)
		]

这是我将这些数组转储到 YAML 并将它们写入文件的例程（如第 13 章所述，`'w'` 参数导致文件以写入模式被打开）：

	File.open( 'multidoc.yml', 'w' ){ |f|
		YAML.dump( arr1, f )
		YAML.dump( arr2, f )
	}

查看文件 **'multidoc.yml'**，你将看到数据已保存为两个单独的'文档' - 每个文档以三个破折号开头：

	---
	- - The Groovesters
	  - Groovy Tunes
	  - 12
	- - Dolly Parton
	  - Greatest Hits
	  - 38
	---
	- !ruby/object:CD
	  artist: Gribbit Mcluskey
	  name: Fab Songs
	  numtracks: 22
	- !ruby/object:CD
	  artist: Wayne Snodgrass
	  name: Singalong-a-Snodgrass
	  numtracks: 24

现在，我需要找到一种通过将数据作为两个文档读取来重建这些数组的方法。`load_documents` 方法提供了该解决方式。

`load_documents` 方法调用一个块并将每个连续文档传递给它。下面是一个如何使用此方法从两个 YAML 文档重建两个数组（放在另一个数组 `$new_arr` 中）的示例：

	File.open( 'multidoc.yml' ) {|f|
	  YAML.load_documents( f ) { |doc|
		$new_arr << doc
	  }
	}

你可以通过执行以下操作来验证是否已使用两个数组初始化 `$new_arr`：

	puts( "$new_arr contains #{$new_arr.size} elements" )
	p( $new_arr[0] )
	p( $new_arr[1] )

或者，这是一种更通用的做同样事情的方法，它适用于任何长度的数组：

	$new_arr.each{ |arr| p( arr ) }

### YAML 数据库

有关以 YAML 格式保存和加载数据的稍微复杂的应用程序的示例，你可能需要查看 **cd_db.rb**。这里实现了一个简单的 CD 数据库。它定义了三种类型的 CD 对象 - 一个基本 CD，其中包含有关名称，艺术家和轨道数量的数据以及两个更专业的后代类 - PopCD，它添加了关于类型（例如“摇滚”或“乡村”）的数据以及 ClassicalCD 添加了导师和作曲家的数据。

当程序运行时，用户可以输入数据以创建这三种类型中的任何一种的新 CD 对象。还有一个将数据保存到磁盘的选项。随后运行应用程序时，将重新加载现有数据。

数据本身在代码中被组织得非常简单（甚至微不足道！），在创建对象本身之前将每个对象的数据读入数组。整个 CD 对象数据库被保存到全局变量 `$cd_arr` 中，并将其写入磁盘并使用 YAML 方法重新加载到内存中：

<div class="code-file clearfix"><span>cd_db.rb</span></div>

	def saveDB
	  File.open( $fn, 'w' ) {
		  |f|
		  f.write($cd_arr.to_yaml)
	  }
	end

	def loadDB
	  input_data = File.read( $fn )
	  $cd_arr = YAML::load( input_data )
	end

在现实世界的应用程序中，我确信你希望创建一些更优雅的数据结构来管理你的 Dolly Parton 集合！

### YAML 冒险游戏

作为使用 YAML 的最后一个示例，我为冒险游戏（**gamesave_y.rb**）提供了一个基本框架。这会创建一些 Treasure 对象和一些 Room 对象。Treasure 对象被放入 Room 对象中（也就是说，它们被放置在 Rooms 包含的数组中），然后 Room 对象被放入 Map 对象中。这具有构造中等复杂数据结构的效果，其中一种类型的对象（Map）包含任意数量的另一种类型的对象（Rooms），每个 Room 对象可以包含零个或多个其它类型的对象（Treasures））。

乍一看，找到一种将混合对象类型的整个网络存储到磁盘并在稍后重建该网络的方法可能看起来像编程噩梦。

事实上，由于 Ruby 的 YAML 库提供的序列化功能，保存和恢复这些数据几乎没有更容易的了。这是因为序列化（serialization）减轻了你逐个保存每个对象的繁琐工作。相反，你只需要“转储”（dump）顶级对象 - 这里就是 Map 对象 `mymap`。

完成此操作后，将自动为你保存顶级对象“包含”的任何对象（如 Rooms）或被包含对象本身包含的对象（如 Treasures）。然后可以通过在单个操作中加载所有已保存的数据并将其分配给“顶级”对象（此处为 map）来重建它们：

<div class="code-file clearfix"><span>gamesave_y.rb</span></div>

	# Save mymap
	File.open( 'game.yml', 'w' ){ |f|
	  YAML.dump( mymap, f )
	}

	# Reload mymap
	File.open( 'game.yml' ){ |f|
	  mymap = YAML.load(f)
	}

## 深入探索

### YAML 的简要指南

在 YAML 中，数据被分成包含“序列”（sequences）数据的“文档”。每个文档以三个短划线字符 `---` 开头，列表中的每个单独元素都以单个短划线字符 `-` 开头。因此，例如，这是一个 YAML 数据文件，包含一个文档和两个列表项：

	---
	- artist: The Groovesters
	  name: Groovy Tunes
	  numtracks: 12
	- artist: Dolly Parton
	  name: Greatest Hits
	  numtracks: 38

在上面的示例中，你可以看到每个列表项由两部分组成 - 名称如 `artist:`（在每个列表项中相同）和右侧的一段数据，例如 `Dolly Parton`，可能因每个列表项而异。这些项类似于 Ruby 的 Hash 中的键值对。YAML 将键值列表称为“映射”（maps）。

下面是一个包含两个项目的列表的 YAML 文档，每个项目包含三个项目 - 换句话说，它是包含两个三项“嵌套”数组的数组的 YAML 表示形式：

	---
	- - The Groovesters
	  - Groovy Tunes
	  - 12
	- - Dolly Parton
	  - Greatest Hits
	  - 38

现在让我们看看 YAML 如何处理嵌套的哈希（Hashes）。

思考这个 Hash：

<div class="code-file clearfix"><span>hash_to_yaml.rb</span></div>

	hsh = { :friend1 => 'mary',
			:friend2 => 'sally',
			:friend3 => 'gary',
			:morefriends => { :chap_i_met_in_a_bar => 'simon',
							  :girl_next_door => 'wanda'
							}
	}

正如我们已经看到的，Hash 在 YAML 中很自然地表示为键值对列表。但是，在上面显示的示例中，关键字 `:morefriends` 与嵌套哈希值相关联。YAML 如何表示？事实证明，与数组一样（参见本章前面的*“嵌套序列”*），它只是缩进嵌套的哈希：

	:friend1: mary
	:friend2: sally
	:friend3: gary
	:morefriends:
	  :chap_i_met_in_a_bar: simon
	  :girl_next_door: wanda

<div class="note">

有关 YAML 的详细信息，请访问 **http://yaml.org**
</div>

随 Ruby 提供的 YAML 库非常庞大且复杂，并且有许多方法可供你使用，而不仅是本章所述的。但是，你现在应该对 YAML 有了足够的了解，以便在你自己的程序中使用它。你可以在闲暇时慢慢地探索 YAML 库。

但事实证明，YAML 并不是在 Ruby 中序列化数据的唯一方法。我们将在下一章中讨论另一种方式。