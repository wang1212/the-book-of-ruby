---

	{
		"title": "第十五章",
		"ctime": "2018-12-27 23:29:00",
		"mtime": "2018-12-27 23:29:00"
	}

---

# 第十五章

***

## Marshal

Ruby 的 Marshal 库提供了另一种保存和加载数据的方式。它有一组类似于 YAML 中的方法，使你可以将数据保存到磁盘上，并可以从磁盘上加载数据。

### 保存与加载数据

将该程序与前一章中的 **yaml_dump2.rb** 进行比较：

<div class="code-file clearfix"><span>marshal1.rb</span></div>

	f = File.open( 'friends.sav', 'w' )
	Marshal.dump( ["fred", "bert", "mary"], f )
	f.close

	File.open( 'morefriends.sav', 'w' ){ |friendsfile|
	  Marshal.dump( ["sally", "agnes", "john" ], friendsfile )
	}

	File.open( 'morefriends.sav' ){ |f|
	  $arr= Marshal.load(f)
	}

	myfriends = Marshal.load(File.open( 'friends.sav' ))
	morefriends = Marshal.load(File.open( 'morefriends.sav' ))

	p( myfriends )
	p( morefriends )
	p( $arr )

除了每次出现的 `YAML`（如 `YAML.dump` 和 `YAML.load`）都已被 Marshal 替换之外，这两个程序几乎完全相同。此外，Marshal 作为标准“内置”（built in）于 Ruby 中，因此你无需“引入”（require）任何额外的文件即可使用它。

但是，如果你查看生成的数据文件（例如 'friends.sav'），你会立即看到存在的重要差异。YAML 文件采用纯文本格式，而 Marshal 文件采用二进制格式。因此，虽然你可以阅读某些字符，例如字符串中的字符，但你不能简单地在文本编辑器中加载已保存的数据并对其进行修改。

与 YAML 一样，大多数数据结构都可以使用 Marshal 自动序列化，只需转储顶级（top-level）对象并在想要重建其下的所有对象时加载它。举个例子，看看我的小冒险游戏程序。在上一章中，我解释了如何通过转储和加载 Map 对象 `mymap`（参见 **gamesave_y.rb**）来保存和恢复包含了包含 Treasures 的 Rooms 的 Map 对象。使用 Marshal 替代 YAML 可以做同样的事情：

<div class="code-file clearfix"><span>gamesave_m.rb</span></div>

	File.open( 'game.sav', 'w' ){ |f|
	  Marshal.dump( mymap, f )
	}

	File.open( 'game.sav' ){ |f|
	  mymap = Marshal.load(f)
	}

在一些特殊情况下，对象不能如此容易地被序列化。Ruby 的 Marshal 模块（**marshal.c**）中的代码记录了这些异常：如果要转储的对象包括绑定（bindings），例程（procedure）或方法（method）对象，IO 类的实例或单例对象（singleton objects），则会抛出 TypeError。稍后在考虑如何通过编排（marshaling）来保存单例（singletons）对象时，我会看一个与之相关的示例。

### 保存时忽略变量

与 YAML 序列化一样，可以限制使用 Marshal 进行序列化时要保存的变量。在 YAML 中，我们通过编写一个名为 `to_yaml_properties` 的方法来完成此目的。而在使用 Marshal 时，我们需要编写一个名为 `marshal_dump` 的方法。在这个方法的代码中，你应该创建一个包含要保存的实际变量名的数组（在 YAML 中，我们创建了一个包含变量名的字符串数组）。这是一个示例：

<div class="code-file clearfix"><span>limit_m.rb</span></div>

	def marshal_dump
	  [@num, @arr]
	end

另一个不同之处在于，使用 YAML 我们只需加载数据即可重新创建对象。而使用 Marshal 时，我们需要添加一个名为 `marshal_load` 的特殊方法，任何已加载的数据都作为参数传递给该方法。当你调用 `Marshal.load` 时，它将被自动调用，它将以数组的形式传递加载的数据。可以从此数组中解析之前保存的对象。你还可以为任何在保存数据时被省略的变量（例如 `@str`）赋值：

	def marshal_load(data)
	  @num = data[0]
	  @arr = data[1]
	  @str = "default string"
	end

这是一个完整的程序，它保存并恢复了变量 `@num` 和 `@arr` 但省略了 `@str`：

	class Mclass
	  def initialize(aNum, aStr, anArray)
		@num = aNum
		@str = aStr
		@arr = anArray
	  end

	  def marshal_dump
		[@num, @arr]
	  end

	  def marshal_load(data)
		@num = data[0]
		@arr = data[1]
		@str = "default string"
	  end
	end

	ob = Mclass.new( 100, "fred", [1,2,3] )
	p( ob )

	marshal_data = Marshal.dump( ob )
	ob2 = Marshal.load( marshal_data )
	p( ob2 )

请注意，尽管序列化在内存中完成，但使用 Marshal 在磁盘上保存和加载对象时可以使用相同的技术。

### 保存单例对象

让我们看一下前面提到的问题的一个具体示例 - 即，无法使用编排（marshaling）来保存和加载单例对象（singleton）。在 **singleton_m.rb** 中，我创建了一个 Object 的实例 `ob`，然后以单例类的形式扩展它，附加了方法 `xxx`：

<div class="code-file clearfix"><span>singleton_m.rb</span></div>

	ob = Object.new

	class << ob
	  def xxx( aStr )
		@x = aStr
	  end
	end

当我尝试使用 `Marshal.dump` 将此数据保存到磁盘时会抛出该问题。Ruby 显示一条错误消息，指出：“单例对象不能被转储（类型错误，TypeError）”。

### YAML 与单例对象

在思考我们如何处理这个问题之前，让我们先简单地看看 YAML 将如何应对这种情况。程序 **singleton_y.rb** 尝试使用 `YAML.dump` 保存上面显示的单例对象，并且与 `Marshal.dump` 不同，它成功了 - 嗯，可以说是的...

<div class="code-file clearfix"><span>singleton_y.rb</span></div>

	ob.xxx( "hello world" )

	File.open( 'test.yml', 'w' ){ |f|
	  YAML.dump( ob, f )
	}

	ob.xxx( "new string" )

	File.open( 'test.yml' ){ |f|
	  ob = YAML.load(f)
	}

如果你看一下保存的 YAML 文件 **'test.yml'**，你会发现它定义了一个普通泛类型（vanilla）对象的实例，它附加了一个名为 `x` 的变量，它有一个字符串值 "hello world"。这一切都很好。除了通过加载保存的数据重建对象时，新的 `ob` 将是恰好包含一个额外的实例变量 `@x` 的 Object 的标准实例。然而，它不再是原来的单例对象，所以新的 `ob` 会无法访问该单例中定义的任何方法（此处为 `xxx` 方法）。因此，虽然 YAML 序列化更容易保存和加载在单例中创建的数据项，但在重新加载被保存的数据时，它不会自动重新创建单例本身。

现在让我们回到这个程序的 Marshal 版本。我需要做的第一件事是找到一种至少使它可以保存和加载数据项的方法。一旦我做完了，我将试着弄清楚如何在重新加载时重建单例对象。

为了保存特定的数据项，我可以定义 `marshal_dump` 和 `marshal_load` 方法，如前所述（参见 **limit_m.rb**）。这些通常应该在单例的派生类中定义 - 而不是单例本身。

这是因为，如已经说明的那样，当保存数据时，它将被存储为单例的派生类的表示。这意味着，虽然你确实可以将 `marshal_dump` 添加到从类 `X` 派生的单例中，但在重构对象时，你将加载泛型类型 `X` 的对象的数据，而不是特定单例实例的对象。

此代码创建类 `X` 的单例 `ob`，保存其数据，然后重新创建类 `X` 的通用对象：

<div class="code-file clearfix"><span>singleton_m2.rb</span></div>

	class X
	  def marshal_dump
		[@x]
	  end

	  def marshal_load(data)
		@x = data[0]
	  end
	end

	ob = X.new

	class << ob
	  def xxx( aStr )
		@x = aStr
	  end
	end

	ob.xxx( "hello" )

	File.open( 'test2.sav', 'w' ){ |f|
	  Marshal.dump( ob, f )
	}

	File.open( 'test2.sav' ){ |f|
	  ob = Marshal.load(f)
	}

就其包含的数据而言，保存的对象和重新加载的对象是相同的。但是，重新加载的对象对单例类没有任何了解，并且单例类包含的方法 `xxx` 不构成重构对象的一部分。然后，以下将失败：

	ob.xxx( "this fails" )

因此，该 Marshal 版本的代码等同于之前给出的 YAML 版本。它可以正确保存和恢复数据，但不会重建单例。

那么，如何从保存的数据中重建单例呢？毫无疑问，有许多聪明而巧妙的方式可以实现这一目标。但是，我会选择一种非常简单的方式：

<div class="code-file clearfix"><span>singleton_m3.rb</span></div>

	FILENAME = 'test2.sav'

	class X
	  def marshal_dump
		[@x]
	  end

	  def marshal_load(data)
		@x = data[0]
	  end
	end

	ob = X.new

	if File.exists?(FILENAME) then
	  File.open(FILENAME){ |f|
		ob = Marshal.load(f)
	  }
	else
	  puts( "Saved data can't be found" )
	end

	# singleton class
	class << ob
	  def xxx=( aStr )
		@x = aStr
	  end

	  def xxx
		return @x
	  end
	end

此代码首先检查是否可以找到包含已保存数据的文件（此示例有意保持简单 - 在实际的应用程序中，你当然需要编写一些异常处理代码来处理可能读取无效数据的问题）。如果找到该文件，则将数据加载到通用 `X` 类型的对象中：

	ob = X.new

	if File.exists?(FILENAME) then
	  File.open(FILENAME){ |f|
		ob = Marshal.load(f)
	  }

只有在完成此操作后，此对象才会“转换”为单例对象。完成此操作后，代码可以在重构单例上使用单例方法 `xxx`。然后，我们可以将新数据保存回磁盘并在稍后重新加载并重新创建修改后的单例：

	if ob.xxx == "hello" then
	  ob.xxx = "goodbye"
	else
	  ob.xxx = "hello"
	end

	File.open( FILENAME, 'w' ){ |f|
	  Marshal.dump( ob, f )
	}

如果你希望在实际的应用程序中保存和加载单例，单独的“重建”代码自然可以给出自己的方法：

<div class="code-file clearfix"><span>singleton_m4.rb</span></div>

	def makeIntoSingleton( someOb )
	  class << someOb
		def xxx=( aStr )
		  @x = aStr
		end

		def xxx
		  return @x
		end
	  end
	  return someOb
	end

## 深入探索

### Marshal 版本号

Marshal 库（一个名为 **'marshal.c'** 的 C 语言文件）的嵌入式文档说明如下：

> 编排（Marshaled）数据具有与对象信息一起存储的主要（major）和次要（minor）版本号。 在正常使用中，编排只能加载使用相同主版本号和相同或较低版本号编写的数据。

这显然提出了通过编排（marshaling）创建的数据文件格式可能与当前 Ruby 应用程序不兼容的潜在问题。另外地，Marshal 版本号不依赖于 Ruby 版本号，因此仅基于 Ruby 版本进行兼容性假设是不安全的。

这种不兼容的可能性意味着我们应该尝试在加载已保存数据之前检查其版本号。但是我们如何获得版本号呢？嵌入式文档再一次提供了线索。它指出：

> 你可以通过读取编排（marshaled ）数据的前两个字节来提取版本号。

它提供了这个示例：

	str = Marshal.dump("thing")
	RUBY_VERSION  #=> "1.8.0"
	str[0] 		  #=> 4
	str[1]        #=> 8

好的，让我们在一段完整的代码中尝试这一点。开始...

<div class="code-file clearfix"><span>version_m.rb</span></div>

	x = Marshal.dump( "hello world" )
	print( "Marshal version: #{x[0]}:#{x[1]}\n" )

打印出：

	"Marshal version: 4:8"

当然，如果你使用的是不同版本的 Marshal 库，则显示的数字会有所不同。在上面的代码中，`x` 是一个字符串，它的前两个字节是主要和次要版本号。Marshal 库还声明了两个常量 `MAJOR_VERSION` 和 `MINOR_VERSION`，它们存储了当前正在使用的 `Marshal` 库的版本号。因此，乍一看，似乎很容易将保存数据的版本号与当前版本号进行比较。

只有一个问题：当你将数据保存到磁盘上的文件中时，`dump` 方法接受 的是IO 或 File 对象，它返回 IO（或 File）对象而不是字符串：

<div class="code-file clearfix"><span>version_error.rb</span></div>

	f = File.open( 'friends.sav', 'w' )
	x = Marshal.dump( ["fred", "bert", "mary"], f )
	f.close  #=> x is now: #<File:friends.sav (closed)>

如果你现在尝试获取 `x[0]` 和 `x[1]` 的值，你将收到错误消息。从文件加载数据不再具有意义：

	File.open( 'friends.sav' ){ |f|
	  x = Marshal.load(f)
	}
	puts( x[0] )
	puts( x[1] )

这里的两个 `puts` 语句没有（如我希望）打印出编排（marshaled）数据的主要和次要版本号；事实上，它们打印出了名称，"fred" 和 "bert"，即从数据文件 'friends.sav' 加载到数组 `x` 中的前两项。

那么我们如何才能从保存的数据中获取版本号？我必须承认，我被迫在 **marshal.c** 中的 C 代码中获取可能的方式（不是我最喜欢的活动！）并检查保存的文件中的十六进制数据以便弄清楚这一点。事实证明，正如文档所述，你可以通过读取编排（marshaled）数据的前两个字节来提取版本号。但是，你不适合这么做。你必须明确地读取这些数据 - 像这样：

	f = File.open('test2.sav')
	vMajor = f.getc()
	vMinor = f.getc()
	f.close

这里，`getc` 方法从输入流读取下一个 8 位字节。我的示例项目 **version_m2.rb** 给出了一种简单的方法，可以将保存数据的版本号与当前 Marshal 库的版本号进行比较，以确定在尝试重新加载数据之前数据格式是否可能兼容。

<div class="code-file clearfix"><span>version_m2.rb</span></div>

	if vMajor == Marshal::MAJOR_VERSION then
	  puts( "Major version number is compatible" )
	  if vMinor == Marshal::MINOR_VERSION then
		puts( "Minor version number is compatible" )
	  elsif vMinor < Marshal::MINOR_VERSION then
		puts( "Minor version is lower - old file format" )
	  else
		puts( "Minor version is higher - newer file format" )
	  end
	else
	  puts( "Major version number is incompatible" )
	end