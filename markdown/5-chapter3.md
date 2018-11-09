---

	{
		"title": "第三章",
		"ctime": "2016-11-11 22:34:00",
		"mtime": "2016-11-11 22:34:00"
	}

---

# 第三章

***

## 字符串和范围

到目前为止，我已经在我的程序中使用了很多字符串（String）。事实上，在本书中的第一个程序中就有字符串。这里再给出来：

	puts 'hello world'

在第一个程序中字符串使用单引号作为分隔符，我在第二个程序中则使用了双引号来替换：

	print('Enter your name: ')
	name = gets()
	puts("Hello #{name}")

<div class="code-file clearfix"><span>1strings.rb</span></div>

双引号字符串要比单引号字符串做更多的工作。尤其地，即便字符串是代码它也有能力去执行。要执行代码的话，请使用 `#` 字符与大括号将其包含进去。

在上面的示例中，`#{name}` 在双引号字符串中指示 Ruby 获取 `name` 变量的值并将其插入到字符串中。所以，如果 `name` 等于 "Fred"，将会显示 "Hello Fred"。**1strings.rb** 示例程序提供了双引号字符串中嵌入式表达式的更多示例。

双引号字符串不仅能够执行获取属性或者变量的值，例如 `ob.name`，还有诸如 `2*3` 的表达式，方法调用 `ob.ten`（**ten** 是一个方法名）以及转义字符换行符 "\n" 和制表符 "\t" 都能被识别执行。

单引号字符串则不会执行这些。并且，单引号字符串可以使用反斜杠表示下一个字符仅仅表示其字面意思。当一个单引号字符串中包含单引号时，这是非常有用的：

	'It\'s my party'

假设名为 `ten` 的方法返回值为10，你可以写出下面的代码：

	puts("Here's a tab\t a new line\n a calculation #{2*3} and a method-call #{ob.ten}")

由于这是双引号字符串，因此将执行嵌入式表达式，并显示以下内容：

	Here's a tab	a new line
	a calculation 6 and a method-call 10

接下来，让我们看当使用单引号时会发生什么：

	puts('Here\'s a tab\t a new line\n a calculation #{2*3} and a method-call #{ob.ten}')

这一次，嵌入式表达式将不会被执行，所以将显示：

	Here's a tab\t a new line\n a calculation #{2*3} and a method-call #{ob.ten}

### 用户自定义字符串分隔符

如果由于某些原因，使用单双引号不方便，例如你的字符串包含很多的引号，而你不想总是使用反斜杠去转义，那么你也可以通过其它方式去分割字符串。

<div class="code-file clearfix"><span>2strings.rb</span></div>

双引号的标准替代分隔符是 **%Q** 和 **/** 或者 **%/** 和 **/** ，然而单引号则为 **%q** 和 **/** 。因此：

	%Q/This is the same as a double-quoted string./
	%/This is also the same as a double-quoted string./
	%q/And this is the same as a single-quoted string/

你甚至可以定义自己的字符串分隔符。它们必须是非字母数字字符,可以包含非打印字符，比如换行符和通常在 Ruby 中有特殊含义的字符，例如 `#`。你选择的字符应该放在 **%Q** 或 **%q** 之后，并且应该确保终止字符串的是同样的字符。如果你使用的分隔符是一个开括号，相应的在字符串结尾处应该使用闭括号，像这样：

	%Q[This is a string]

<div class="code-file clearfix"><span>3strings.rb</span></div>

你可以在示例程序 **3strings.rb** 中发现许多种字符串分隔符。不用说，有时候使用一些深奥的字符（比如换行符和星号）分割字符串很有用，但在许多情况下这些方式的缺点可能会掩盖掉其优点。

### 反引号

一个其它类型的字符串值得特别提及：一个由反引号括起来的字符串——也就是在键盘左上角的向内指向的引号字符 <code>`</code>。

Ruby 认为任何由反引号括起来的都是一个可以使用 `print` 或 `puts` 方法传递给操作系统执行的命令。到目前为止，你可能已经猜到 Ruby 提供了不仅仅一种方式去实现这些。事实证明，`%x/some command/` 与 <code>`somecommand`</code> 具有相同的效果，当然 `%x{some command}` 也是如此。例如，在 Windows 操作系统上，如下所示的三行代码都是将命令 **dir** 传递给操作系统执行，显示目录列表：

<div class="code-file clearfix"><span>4backquotes.rb</span></div>

	puts(`dir`)
	puts(%x/dir/)
	puts(%x{dir})

你也可以在双引号字符串中嵌入命令，如下所示：

	print( "Goodbye #{%x{calc}}" )

如果你这么做，要小心的是，命令首先会被执行。你的 Ruby 程序会进行等待，直到开始的进程终止。在这种情况下，计算器将先弹出来。你可以做一些计算，只有当你关闭计算器的时候，字符串 “Goodbye” 才会显示。

### 字符串处理

在结束字符串这个话题之前，我们将快速查看一看字符串的处理操作。

#### 连接

<div class="code-file clearfix"><span>string_concat.rb</span></div>

你可以使用 `<<` 或 `+`，或者说在中间放置一个空格来连接字符串。这里有三个字符串连接示例，在每一种情况下 `s` 都被赋值为字符串 “Hello World” ：

	s = "Hello " << "world"
	s = "Hello " + "world"
	s = "Hello " "world"

但是请注意，当你使用 `<<` 方法时，你可以直接附加一个整数（0到255），而不必先将它转换为字符串；当使用 `+` 或者空格时，整数必须使用 `to_s` 方法先转换为字符串。

<div class="note">
<p class="h4" style="font-weight: bold;">关于逗号</p>
<p>
	你有时可能会看到 Ruby 代码使用逗号分割来分割字符串或者其它类型数据。在某些情况下，这些逗号似乎有连接字符串的效果。例如，下面的代码一眼看上去似乎是创建和显示了一个由三个子字符串加整数组成的字符串：
</p>

	s4 = "This ", "is", " not a string!", 10
	print("print (s4):", s4, "\n")

<p>
	事实上，用逗号分割的列表是创建了一个数组——一个基于字符串的有序列表。<b>string_concat.rb</b> 程序包含的示例证明了这一点。
</p>
<p>
	请注意，当你将一个数组传递给一个方法比如<code>puts</code>，数组中的每个元素将被单独处理。你可以像下面一样将<code>x</code>传递给<code>puts</code>：
</p>

	puts(x)

<p>在这种情况下，输出将会是：</p>

	This
	is
	not a string!
	10

<p>我们将在下一章中更深入的研究数组。</p>
</div>

#### 字符串赋值

Ruby 的 String 类提供了许多有用的字符串处理方法。大多数的方法将会创建一个新的字符串对象。例如，在下面的代码中，第二行左侧的 `s` 与右侧的 `s` 不是同一个对象：

	s = "hello world"
	s = s + "!"

<div class="code-file clearfix"><span>string_assign.rb</span></div>

一些字符串方法实际上是在不创建新的字符串对象的情况下改变其本身。这些方法通常以感叹号结尾（例如，`capitalize!`）。

如果有疑问，可以使用 `object_id` 方法来检查对象。我已经在 **string_assign.rb** 程序中提供了几个不需要创建新字符串对象的操作示例。运行它们并且在字符串操作执行完之后检查 `s` 的 `object_id`。

#### 字符串索引

你可以将字符串视为一个字符数组，并使用方括号以及索引查找在该数组中特定索引处的字符。Ruby 中的字符串和数组索引是从 0 开始的。所以，要将字符串 `s` “Hello world” 中的 “e” 替换为 “a”，你应该在索引 1 处赋值一个新的字符：

	s[1] = 'a'

但是，如果你要在一个字符串中使用索引查找特定位置的字符，Ruby 不会返回这个字符本身，返回的是该字符的 ASCII 值：

	s = "Hello world"
	puts(s[1])  # prints out 101 – the ASCII value of 'e'

为了获得实际的字符，可以这么做：

	s = "Hello world"
	puts(s[1,1])  # prints out 'e'

这将告诉 Ruby 将字符串中索引 1 处的字符返回。如果你想要返回索引 1 处开始的3个字符，你可以输入：

	puts(s[1,3])  # prints "ell"

这告诉 Ruby 返回从索引 1 处开始接下来的3个字符。或者，你也可以使用双点符号 “范围（range）”来表示:

	puts(s[1..3])  # also prints "ell"

<div class="note">
	关于范围（Ranges），你可以参阅本章末尾的<strong>深入探索</strong>部分。
</div>

字符串还可以使用负值索引，在这种情况下，-1 代表最后一个字符的位置，并且可以再次指定要返回的字符数：

	puts(s[-1,1])  # prints 'd'
	puts(s[-5,1])  # prints 'w'
	puts(s[-5,5])  # prints "world"

<div class="code-file clearfix"><span>string_index.rb</span></div>

使用减号指定范围时，起始和终止索引必须均用负值：

	puts(s[-5..5])  # this prints an empty string!
	puts(s[-5..-1])  # prints "world"

<div class="code-file clearfix"><span>string_methods.rb</span></div>

最后，你可能需要尝试一些可用于操作字符串的标准方法。这些方法包括改变字符串大小写，反转字符串，插入子字符串，删除重复字符等等。我在 **string_methods.rb** 提供了几个示例。

#### 删除换行符 chop 与 chomp

一些方便的字符串处理方法值得提及一下。`chop` 与 `chomp` 方法可用于从字符串的末尾删除字符。`chop` 方法会返回一个字符串，这个字符串是删除最后一个字符得到的，但如果在字符串末尾处发现了回车符和换行符 “\r\n” 则删除一个回车符或换行符之后返回字符串。`chomp` 方法返回一个字符串，这个字符串是删除了末尾一个回车符或换行符得到的。

这些方法在你需要删除用户输入或者文件输入的换行符时是非常有用的。例如，当你使用 `gets` 方法读取一行文本时，它将返回该文本以及在末尾的“记录分隔符”，默认地通常是换行符。

<div class="note">
	<p class="h4" style="font-weight: bold;">记录分隔符- $/</p>
	<p>
		Ruby 预定义了一个变量 <code>$/</code> 来作为“记录分隔符”。这个变量被用于一些方法中，例如 <code>gets</code> 和 <code>chomp</code> 中。<code>gets</code> 方法读入一个字符串时将会包含一个记录分隔符。<code>chomp</code> 方法将会返回一个字符串，该字符串末尾存在记录分隔符时删除后返回，不存在时直接返回未修改的原始字符串。如果你愿意，可以重新定义记录分隔符，如下所示：
	</p>

	$/="*"  # the "*" character is now the record separator

当你重新定义了记录分隔符之后，新的字符或字符串现在将会在一些方法中被使用，例如 `gets` 和 `chomp` 方法。例如：

	$/= "world"
	s = gets()  # user enters "Had we but world enough and time…"
	puts(s)  # displays "Had we but world"

</div>

你可以使用 `chop` 和 `chomp` 方法来删除换行符。在大多数情况下，`chomp` 方法是最好的，因为它不会删除最后的字符，除非末尾是记录分隔符，而 `chop` 方法无论最后一个字符是什么都会删除。这里是一些示例：

<div class="code-file clearfix"><span>chop_chomp.rb</span></div>

	# Note: s1 includes a carriage return and linefeed
	s1 = "Hello world
	"
	s2 = "Hello world"
	s1.chop  # returns "Hello world"
	s1.chomp # returns "Hello world"
	s2.chop  # returns "Hello worl" – note the missing "d"!
	s2.chomp # returns "Hello world"

`chomp` 方法允许你指定要用做分隔符的字符或字符串：

	s2.chomp("rld")  # returns "Hello wo"

#### 格式化字符串

Ruby 提供了 `v` 方法来打印包含以百分号 **%** 开头的说明符的“格式化字符串”。格式化字符串之后可以是一个或多个用逗号分隔的数据项；数据项的列表应与格式说明符的类型相匹配。实际数据项替换字符串中匹配的说明符，并相应地进行格式化。这是一些常见的格式说明符：

	%d – decimal number
	%f – floating point number
	%o – octal number
	%p – inspect object
	%s – string
	%x – hexadecimal number

你可以通过在浮点数说明符 **%f** 前面放置一个点号来控制浮点精度。例如，这将显示两位浮点值：

	printf("%0.02f", 10.12945)  # displays 10.13

## 深入探索

### 范围

在 Ruby 中，Range 是一个表示指定的起始和终止值之间一组数的类。通常，使用整数定义范围，但也可以使用其它有序值（比如浮点数或字符）来定义范围。值可以是负的，尽管如此，你应该注意起始值应该始终小于终止值。这有一些示例：

<div class="code-file clearfix"><span>ranges.rb</span></div>

	a = (1..10)
	b = (-10..-1)
	c = (-10..10)
	d = ('a'..'z')

你也可以使用三个点而不是两个点指定范围：这将创建一个不包含终止值范围：

	d = ('a'..'z')   # this two-dot range = 'a'..'z'
	e = ('a'...'z')   # this three-dot range = 'a'..'y'

你可以使用 `to_a` 方法创建一个由范围定义的数的数组：

	(1..10).to_a

请注意，由于两个浮点数之间的数不是有限的，所以 `to_a` 方法并没有为浮点数所定义。

<div class="code-file clearfix"><span>str_range.rb</span></div>

你甚至可以创建字符串范围，你需要非常的小心，这样做的话最终可能会超出你的预想。例如，看看你是否知道这个范围指定的值：

	str_range = ('abc'..'def')

一眼看去，从"abc"到"def"这个范围的值可能不多。实际上，这个范围之间的值不少于 2110 个！它们具体如下："abc"、"abd"、"abe"等等，直到"a"结束；然后再从"b"开始，"baa"、"bab"、"bac"等等。准确的说，这种范围是不常用的，最好要非常小心或者直接不使用。

### 范围迭代器

你可以使用范围从起始值迭代到终止值。例如，以下是将数字从1到10打印出来的方法：

<div class="code-file clearfix"><span>for_to.rb</span></div>

	for i in (1..10) do
  	  puts( i )
	end

### HereDocs

虽然你可以在单双引号之间写跨行的长字符串，但许多 Ruby 程序员更喜欢使用名为"heredoc"这种替代类型的字符串。hererdoc 是一个以特定结束标记开始的文本块，这可以是你自己选择的结束标记。这里，我选择了 EODOC 作为结束标记：

<div class="code-file clearfix"><span>heredoc.rb</span></div>

	hdoc1 = <<EODOC

这告诉 Ruby，直到遇到结束标记时所有行都是单个字符串。这个字符串被赋值给 `hdoc1` 变量。这是一个完整的例子：

	hdoc1 = <<EODOC
	I wandered lonely as a #{"cloud".upcase},
	That floats on high o'er vale and hill...
	EODOC

默认情况下，heredocs 被视为双引号字符串，所以表达式 `#{"cloud".upcase}` 将会被执行。如果你想要一个 heredoc 被视为单引号字符串，在单引号之间指定结束标记：

	hdoc2 =  <<'EODOC'
	I wandered lonely as a #{"cloud".upcase},
	That floats on high o'er vale and hill...
	EODOC

默认情况下，heredoc 的结束标记必须与左侧对齐。如果你想缩进，应该在指定结束标记时使用 `<<-` 来代替 `<<`：

	hdoc3 = <<-EODOC
	I wandered lonely as a #{"cloud".upcase},
	That floats on high o'er vale and hill...
    	EODOC

你可以自己选择适当的结束标记，使用保留字也是可以的（但这似乎不是明智的做法！）。

	hdoc4 = <<def
	I wandered lonely as a #{"cloud".upcase},
	That floats on high o'er vale and hill...
	def

一个被赋值为 heredoc 的变量也可以像其它字符串变量一样使用：

	puts(hdoc1)

### 字符串字面量

如本章前面所述，你可以选择使用 **%q/** 和 **/** 来分割单引号字符串，以及使用 **%Q/** 和 **/** 来分割双引号字符串。

Ruby 提供了类似的方法来定义反引号字符串、正则表达式（regular expressions）、符号（symbols）和数组（arrays）的分隔符。以这种方式定义字符串数组特别的有用，这样避免了为每个元素都要输入字符串分隔符。这里是一些字符串字面量分隔符的参考：

	%q/   /
	%Q/   /
	%/   /
	%w/   /
	%W/   /
	%r|   |
	%s/   /
	%x/   /

请注意，你可以选择要使用的分隔符。我选择了 **/**，而正则表达式则使用了 **|**（因为 **/** 是一个常规的正则表达式分隔符），同样地我也可以使用方括号、星号、& 或者其它符号（例如 `%W*dog cat＃{1 + 2}*` 或 `%s&dog&`）。这是一些示例：

<div class="code-file clearfix"><span>literals.rb</span></div>

	p %q/dog cat #{1+2}/  #=> "dog cat \#{1+2}"
	p %Q/dog cat #{1+2}/  #=> "dog cat 3"
	p %/dog cat #{1+2}/  #=> "dog cat 3"
	p %w/dog cat #{1+2}/  #=> ["dog", "cat", "\#{1+2}"]
	p %W/dog cat #{1+2}/  #=> ["dog", "cat", "3"]
	p %r|^[a-z]*$|  #=> /^[a-z]*$/
	p %s/dog/ #=> :dog
	p %x/vol/ #=> " Volume in drive C is OS [etc...]"