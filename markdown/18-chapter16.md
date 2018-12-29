---

	{
		"title": "第十六章",
		"ctime": "2018-12-29 01:50:00",
		"mtime": "2018-12-29 01:50:00"
	}

---

# 第十六章

***

## 正则表达式

正则表达式（Regular expressions）为你提供了在文本中进行查找和模式修改的强大方式 - 不仅是短文本（例如在命令提示符下输入的），还可以是庞大的储存文本（例如在磁盘上的文件中的）。

正则表达式采用了与字符串进行比较的模式形式。正则表达式还提供了修改字符串的方法，例如，你可以将特定字符转换为大写；或者你可以用 "Ruby" 替换每一次出现的 "Diamond"；或者读取一个代码文件，提取所有注释并写出包含所有注释但不包含任何代码的新文档文件。我们将很快了解如何编写注释提取工具。首先，让我们来看一些非常简单的正则表达式。

### 进行匹配

最简单的正则表达式（regular expression）几乎是一系列字符，例如 'abc'，你会感觉到它是一个字符串。只需简单的将这些字母放在两个正斜杠（forward-slash）分隔符之间 `/abc/`，就可以创建匹配 'abc' 的正则表达式。你可以使用 `=〜` 运算符方法来测试匹配（match），如下所示：

<div class="code-file clearfix"><span>regex0.rb</span></div>

	puts( /abc/ =~ 'abc' )  #=> returns 0

如果匹配，则返回表示字符串中字符位置的整数。如果不匹配，则返回 `nil`。

	puts( /abc/ =~ 'xyzabcxyzabc' ) #=> returns 3
	puts( /abc/ =~ 'xycab' ) 		#=> returns nil

你还可以在方括号之间指定一组字符，在这种情况下，将在字符串中匹配这组字符中的任何一个。例如，在这里，首先匹配到了 'c'，并返回该字符在字符串中的位置：

	puts( /[abc]/ =~ 'xycba' )  #=> returns 2

虽然我在上面的示例中使用了正斜杠分隔符，但还有其它方式可以定义正则表达式：你可以专门创建一个使用字符串初始化的新的 Regexp 对象，或者你可以在正则表达式之前使用 `％r` 并使用自定义分隔符 - 非字母数字字符 - 就像字符串一样（参见第 3 章）。在下面的示例中，我使用花括号分隔符：

<div class="code-file clearfix"><span>regex1.rb</span></div>

	regex1 = Regexp.new('^[a-z]*$')
	regex2 = /^[a-z]*$/
	regex3 = %r{^[a-z]*$}

上面的每一个，都定义了一个匹配全小写字符串的正则表达式（我将很快解释表达式的细节）。 这些表达式可用于测试这样的字符串：

	def test( aStr, aRegEx )
	  if aRegEx =~ aStr then
		puts( "All lower case" )
	  else
		puts( "Not all lower case" )
	  end
	end

	test( "hello", regex1 )  	#=> matches: "All lower case"
	test( "hello", regex2 ) 	#=> matches: "All lower case"
	test( "Hello", regex3 ) 	#=> no match: "Not all lower case"

要测试匹配（match），可以使用 `if` 和 `=〜` 运算符：

<div class="code-file clearfix"><span>if_test.rb</span></div>

	if /def/ =~ 'abcdef'

如果匹配，则上面的表达式求值为 true（并返回一个整数）；如果没有匹配则会计算为 false（并返回 `nil`）：

	RegEx = /def/
	Str1 = 'abcdef'
	Str2 = 'ghijkl'

	if RegEx =~ Str1 then
	  puts( 'true' )
	else
	  puts( 'false' )
	end #=> displays: true

	if RegEx =~ Str2 then
	  puts( 'true' )
	else
	  puts( 'false' )
	end #=> displays: false

通常，尝试从字符串的最开头匹配某个表达式是有用的；字符 `^` 后跟匹配项用于指定这个（前缀匹配）。从字符串的末尾进行匹配也可能很有用；字符 `$` 前置一个匹配项用于指定这个（后缀匹配）。

<div class="code-file clearfix"><span>start_end1.rb</span></div>

	puts( /^a/ =~ 'abc' )  #=> returns 0
	puts( /^b/ =~ 'abc' )  #=> returns nil
	puts( /c$/ =~ 'abc' )  #=> returns 2
	puts( /b$/ =~ 'abc' )  #=> returns nil

当字符串构成更复杂模式（pattern）的一部分时，从字符串的开头或结尾进行匹配会变得更有用。通常，这种模式会尝试匹配指定模式的零个或多个实例。`*` 字符用于表示其所遵循的模式的零个或多个匹配（matches）。形式上，这被称为“量词”（quantifier）。思考这个示例：

<div class="code-file clearfix"><span>start_end2.rb</span></div>

	puts( /^[a-z 0-9]*$/ =~ 'well hello 123' )

这里，正则表达式在方括号之间指定了字符范围。此范围包括所有小写字符，a-z，所有数字，0-9，加上空白字符（即此表达式中 "z" 和 "0" 之间的空格）。`^` 字符表示必须从字符串的开头进行匹配，范围之后的 `*` 表示必须与范围中的字符进行零次或多次匹配，而 `$` 字符表示必须匹配到字符串的末尾。换句话说，此模式（pattern）仅匹配从字符串的起始位置到结尾处包含小写字符，数字和空格的字符串：

	puts( /^[a-z 0-9]*$/ =~ 'well hello 123' ) # match at 0
	puts( /^[a-z 0-9]*$/ =~ 'Well hello 123' ) # no match due to ^ and uppercase 'W'

实际上，这个模式也会匹配一个空字符串，因为 `*` 表示可以接受*零个或多个*匹配：

	puts( /^[a-z 0-9]*$/ =~ '' ) # this matches!

如果要排除空字符串，请使用 `+`（以匹配模式的*一个或多个*匹配项）：

	puts( /^[a-z 0-9]+$/ =~ '' ) # no match

尝试使用 **start_end2.rb** 中的代码，了解更多示例，其中 `^`，`$`，`*` 和 `+` 可以与范围组合以创建各种不同的匹配模式（match-patterns）。

你可以使用这些技术来确定字符串的特定特征，例如给定字符串是大写的，小写的还是大小写混合的：

<div class="code-file clearfix"><span>regex2.rb</span></div>

	aStr = "HELLO WORLD"

	case aStr
	  when /^[a-z 0-9]*$/
		puts( "Lower case" )
	  when /^[A-Z 0-9]*$/
		puts( "Upper case" )
	  else
		puts( "Mixed case\n" )
	end

通常，正则表达式用于处理磁盘上文件中的文本。例如，假设你希望在 Ruby 文件中显示所有单行（full-line）注释，但省略所有代码或行内注释。你可以通过尝试从每行的开头匹配（`^`）零个或多个空格字符（空格字符由 `\s` 表示）直到注释字符（`'#'`）：

<div class="code-file clearfix"><span>regex3a.rb</span></div>

	# displays all the full-line comments in a Ruby file
	File.foreach( 'regex1.rb' ){ |line|
	  if line =~ /^\s*#/ then
		puts( line )
	  end
	}

### 匹配组

你还可以使用正则表达式来匹配一个或多个子字符串。为此，那你应该将正则表达式的一部分放在圆括号之间。这里我有两个组（有时称为'捕获'），第一个尝试匹配字符串 'hi'，第二个尝试匹配以 'h' 开头的字符串，后跟任意三个字符（一个点表示'匹配任何一个字符'所以这里的三个点将匹配任何三个连续的字符）并以 'o' 结尾：

<div class="code-file clearfix"><span>groups.rb</span></div>

	/(hi).*(h...o)/ =~ "The word 'hi' is short for 'hello'."

在对正则表达式中的组进行计算之后，将为这些组的匹配值分配等于组数的多个变量。这些变量采用 `$` 后跟数字的形式：`$1`，`$2`，`$3` 等等。执行上面的代码后，我可以像这样访问变量 `$1` 和 `$2`：

	print( $1, " ", $2, "\n" ) #=> displays: hi hello

请注意，如果整个正则表达式不匹配，则不会初始化任何组变量。例如，如果 'hi' 在字符串中但 'hello' 不在，则组变量都不会被初始化。两者都是 `nil`。

这是另一个示例，它返回三个组，每个组包含一个字符（由点给出）。然后显示组 `$1` 和 `$3`：

	/(.)(.)(.)/ =~ "abcdef"
	print( $1, " ", $3, "\n" ) #=> displays: a c

这是之前给出的注释匹配程序的新版本（**regex3a.rb**）；现在这已经采用了使用组 `(*.)` 的值，它返回正则表达式前缀匹配字符串后面的所有字符（零个或更多）（这里是：`^\s*#`）。这匹配从当前行（`^`）的开头到第一次出现的哈希或磅字符 `#` 的零个或多个空格（`\s*`）字符：

<div class="code-file clearfix"><span>regex3b.rb</span></div>

	File.foreach( 'regex1.rb' ){ |line|
	  if line =~ /^\s*#(.*)/ then
		puts( $1 )
	  end
	}

最终结果是只匹配第一个可打印字符 `#` 所在的行；并且 `$1` 打印出那些行文本减去 `#` 字符本身之后的文本。我们很快就会看到，这种简单的技术为从 Ruby 文件中提取文档提供了有用的工具。

你不仅仅限于逐字提取和显示字符；你也可以修改文本。此示例显示 Ruby 文件中的文本，但将行注释之前的所有 Ruby 行注释字符（`'#'`）更改为 C 样式的行注释字符（`'//'`）：

<div class="code-file clearfix"><span>regex4.rb</span></div>

	File.foreach( 'regex1.rb' ){ |line|
	  line = line.sub(/(^\s*)#(.*)/, '\1//\2')
	  puts( line )
	}

在此示例中，使用了 String 类的 `sub` 方法；它接受一个正则表达式作为它的第一个参数（这里是 `/(*\s*)#(.*)/`）和一个替换字符串作为第二个参数（这里是 `'\1//\2'`）。替换字符串可能包含编号的占位符，例如 `\1` 和 `\2`，以匹配正则表达式中的任何组 - 此处圆括号之间有两组：`(^\s*)` 和 `(.*)`。`sub` 方法返回一个新字符串，其中正则表达式所匹配的字符串被替换为替换字符串，而任何未匹配的元素（此处为 `#` 字符，都会被省略）。

### MatchData

`=~` '运算符'不是找到匹配的唯一方式。Regexp 类也有 `match` 方法。这与 `=~` 类似，但是，当匹配时，它返回 MatchData 对象而不是整数。MatchData 对象包含模式匹配的结果。乍一看，这似乎是一个字符串...

<div class="code-file clearfix"><span>match.rb</span></div>

	puts( /cde/ =~ 'abcdefg' )     #=> 2
	puts( /cde/.match('abcdefg') ) #=> cde

实际上，它是 MatchData 类的一个实例，它包含一个字符串：

	p( /cde/.match('abcdefg') )  #=> #<MatchData:0x28cedc8>

MatchData 对象可以包含组或“捕获”（captures），这些可以使用 `to_a` 或 `capture` 方法在数组中返回，如下所示：

<div class="code-file clearfix"><span>matchdata.rb</span></div>

	x = /(^.*)(#)(.*)/.match( 'def myMethod # This is a very nice method' )
	x.captures.each{ |item| puts( item ) }

以上显示：

	def myMethod
	#
	This is a very nice method

请注意，`captures` 和 `to_a` 方法之间存在细微差别。第一个只返回捕获值：

	x.captures #=>["def myMethod ","#"," This is a very nice method"]

第二个返回原始字符串（在索引 0 处），然后是捕获值：

	x.to_a  #=>["def myMethod # This is a very nice method","def myMethod ","#"," This is a very nice method"]

### 前后匹配

MatchData 类提供 `pre_match` 和 `post_match` 方法以返回匹配之前或之后的字符串。例如，我们用注释字符 `"#"` 进行匹配：

<div class="code-file clearfix"><span>pre_post_match.rb</span></div>

	x = /#/.match( 'def myMethod # This is a very nice method' )
	puts( x.pre_match )   #=> def myMethod
	puts( x.post_match )  #=> This is a very nice method

或者，你可以使用特定变量 <code>$`</code>（带反引号）和 <code>$'</code>（带正常引号）分别访问前后匹配值：

	x = /#/.match( 'def myMethod # This is a very nice method' )
	puts( $` ) #=> def myMethod
	puts( $' ) #=> This is a very nice method

使用组匹配时，可以使用数组形式的索引来获取特定项。索引 0 是原始字符串；更大的索引是组的匹配值：

<div class="code-file clearfix"><span>match_groups.rb</span></div>

	puts( /(.)(.)(.)/.match("abc")[2] ) #=> "b"

特殊变量 `$~` 可用于访问最后一个 MatchData 对象，你可以再次使用数组形式索引来引用组的匹配值：

	puts( $~[0], $~[1], $~[3] )

但是，为了使用 Array 类的所有方法，必须使用 `to_a` 或 `capture` 方法来将匹配组作为数组返回：

	puts( $~.sort ) 			# this doesn't work!
	puts( $~.captures.sort ) 	# this does

### 贪婪匹配

当一个字符串包含多个潜在的匹配值时，你有时可能希望该字符串返回第一个匹配项（即，尽可能少的字符串与匹配模式一致），并且在其它时候你可能希望该字符串返回一直到最后一个匹配项（也就是尽可能多的字符串）。

在后一种情况下（获得尽可能多的字符串），这中匹配被称为“贪婪的”（greedy）。`*` 和 `+` 模式量词是贪婪的。你可以通过在其后放置 `?` 让它们节制一点，以使它们尽可能少地返回匹配值：

<div class="code-file clearfix"><span>greedy1.rb</span></div>

	puts( /.*at/.match('The cat sat on the mat!') ) 	#=> returns: The cat sat on the mat
	puts( /.*?at/.match('The cat sat on the mat!') )	#=> returns: The cat

你可以控制模式匹配的贪婪性，以执行诸如处理目录路径之类的操作：

<div class="code-file clearfix"><span>greedy2.rb</span></div>

	puts( /.+\\/.match('C:\mydirectory\myfolder\myfile.txt') )		#=> C:\mydirectory\myfolder\
	puts( /.+?\\/.match('C:\mydirectory\myfolder\myfile.txt') )		#=> C:\

### 字符串方法

到目前为止，我们在处理字符串时使用了 Regexp 类的方法。事实上，由于 String 类有一些自己的正则表达式方法，因此模式匹配可以双向进行。这些包括 `=~` 和 `match`（所以你可以在匹配时切换 String 和 Regexp 对象的顺序），以及遍历字符串的 `scan` 方法，该方法寻找尽可能多的匹配。每个匹配都添加到一个数组中。例如，我正在寻找字母 'a'，'b' 或 'c' 的匹配。`match` 方法返回的 MatchData 对象中包含第一个匹配项（'a'）；但 `scan` 方法会继续扫描字符串并在数组中返回它找到的所有匹配项：

<div class="code-file clearfix"><span>match_scan.rb</span></div>

	TESTSTR = "abc is not cba"
	puts( "\n--match--" )
	b = /[abc]/.match( TESTSTR )	#=> MatchData: "a"
	puts( "--scan--" )
	a = TESTSTR.scan(/[abc]/)		#=> Array: ["a", "b", "c", "c", "b", "a"]

可选地，可以给 `scan` 方法传递一个块，以便可以以某种方式处理后扫描创建的数组元素：

	a = TESTSTR.scan(/[abc]/){|c| print( c.upcase ) }	#=> ABCCBA

许多其它 String 方法可以与正则表达式一起使用。`String.slice` 方法的一个版本接受一个正则表达式作为参数并返回任何匹配到的子字符串。`String.slice!` 方法（注意最后的 `!`）从接收字符串中删除匹配的子字符串并返回子字符串：

<div class="code-file clearfix"><span>string_slice.rb</span></div>

	s = "def myMethod # a comment "

	puts( s.slice( /m.*d/ ) ) 	#=> myMethod
	puts( s )  					#=> def myMethod # a comment
	puts( s.slice!( /m.*d/ ) ) 	#=> myMethod
	puts( s )  					#=> def # a comment

`split` 方法基于模式（pattern）将字符串拆分为子字符串。结果（减去模式）作为数组返回；空模式将字符串拆分为字符：

<div class="code-file clearfix"><span>string_ops.rb</span></div>

	s = "def myMethod # a comment"

	p( s.split( /m.*d/ ) )	# => ["def ", " # a comment"]
	p( s.split( /\s/ ) )	#=> ["def", "myMethod", "#", "a", "comment"]
	p( s.split( // ) )		# => ["d", "e", "f", " ", "m", "y", "M", "e", "t", "h", "o", "d", " ", "#", " ", "a", " ", "c", "o", "m", "m", "e", "n", "t"]

你可以使用 `sub` 方法匹配正则表达式，并将其第一个匹配项替换为字符串。如果未匹配到，则返回不变的字符串：

	s = "def myMethod # a comment"
	s2 = "The cat sat on the mat"
	p( s.sub( /m.*d/, "yourFunction" ) ) 	#=> "def yourFunction # a comment"
	p( s2.sub( /at/, "aterpillar" ) )  		#=> "The caterpillar sat on the mat"

`sub!` 方法与 `sub` 类似，但会修改原始（接收）字符串。或者，你可以使用 `gsub` 方法（或 `gsub!` 来修改接收字符串）用字符串替换所有出现的模式匹配项：

	p( s2.gsub( /at/, "aterpillar" ) )	#=> "The caterpillar saterpillar on the materpillar"

### 文件操作

我之前说过，正则表达式通常用于处理存储在磁盘上文件中的数据。在一些之前的示例中，我们从磁盘文件中读取数据，进行一些模式匹配并在屏幕上显示结果。这是另一个我们计算文件中单词的示例。通过扫描每一行来创建一个单词数组（即字母数字字符序列）然后将每个数组的大小添加到变量，`count`：

<div class="code-file clearfix"><span>wordcount.rb</span></div>

	count = 0
	File.foreach( 'regex1.rb' ){ |line|
	  count += line.scan( /[a-z0-9A-Z]+/ ).size
	}
	puts( "There are #{count} words in this file." )

我在示例程序中包含了一些可替换代码（被注释掉），它显示每个单词及其编号：

	File.foreach( 'regex1.rb' ){ |line|
	  line.scan( /[a-z0-9A-Z]+/ ).each{ |word|
		count +=1
		print( "[#{count}] #{word}\n" )
	  }
	}

现在让我们看看如何同时处理两个文件 - 一个用于读取，另一个用于写入。第一个示例打开文件 **testfile1.txt** 进行写入，并将文件变量 `f` 传递到块中。我现在打开第二个文件 **regex1.rb** 进行读取，并使用 `File.foreach` 将从该文件读取的每行文本传递到第二个块中。我使用一个简单的正则表达式来创建一个新的字符串，以匹配具有 Ruby 风格注释的行；当该字符是一行中的第一个非空白字符时，代码将 Ruby 注释字符（`'#'`）替换为 C 风格的注释字符（`'//'`）；并将每行写入 **testfile1.txt**，代码行未经修改（因为没有匹配到）并且注释行更改为 C 风格：

<div class="code-file clearfix"><span>regexp_file1.rb</span></div>

	File.open( 'testfile1.txt', 'w' ){ |f|
	  File.foreach( 'regex1.rb' ){ |line|
		f.puts( line.sub(/(^\s*)#(.*)/, '\1//\2') )
	  }
	}

这说明了使用正则表达式和非常少的编码可以完成多少工作。

下一个示例显示了如何读取一个文件（此处为文件 **regex1.rb**）并写出两个新文件 - 其中一个（**comments.txt**）仅包含行注释，而另一个（**nocomments.txt**）包含文件中所有其它行：

<div class="code-file clearfix"><span>regexp_file2.rb</span></div>

	file_out1 = File.open( 'comments.txt', 'w' )
	file_out2 = File.open( 'nocomments.txt', 'w' )

	File.foreach( 'regex1.rb' ){ |line|
	  if line =~ /^\s*#/ then
		file_out1.puts( line )
	  else
	    file_out2.puts( line )
	  end
	}

	file_out1.close
	file_out2.close

## 深入探索

### 正则表达式

这是可以在正则表达式中使用的一些元素的列表...

| 元素 | 解释说明 |
| ------ | ------ |
| ^ | 一行或一个字符串的开头 |
| $ | 一行或一个字符串的结尾 |
| . | 除换行符之外的任何字符 |
| * | 0 个或多个前一个正则表达式 |
| *? | 0 个或多个前一个正则表达式（非贪婪） |
| + | 1 个或多个前一个正则表达式 |
| +? | 1 个或多个前一个正则表达式（非贪婪） |
| [] | 范围规范（例如 [a-z] 表示 "a" 到 "z" 范围内的字符） |
| \w | 一个字母数字字符 |
| \W | 一个非字母数字字符 |
| \s | 一个空白字符 |
| \S | 一个非空白字符 |
| \d | 一个数字 |
| \D | 一个非数字字符 |
| \b | 退格（在范围规范中时） |
| \b | 单词边界（不在范围规范中时） |
| \B | 非单词边界 |
| * | 前面的零个或多个重复 |
| + | 前面的 1 个或多个重复 |
| {m,n} | 前面的至少 m 次且至多 n 次重复 |
| ? | 前面的至多 1 次重复 |
| \| | 前一个或下一个表达式可以匹配 |
| () | 一个匹配组 |

以下是一些示例正则表达式...

<div class="code-file clearfix"><span>overview.rb</span></div>

	# match chars...
	puts( 'abcdefgh'.match( /cdefg/ ) ) # literal chars
		#=> cdefg
	puts( 'abcdefgh'.match( /cd..g/ ) ) # dot matches any char
		#=> cdefg

	# list of chars in square brackets...
	puts( 'cat'.match( /[fc]at/ )
		#=> cat
	puts( "batman's father's cat".match( /[fc]at/ ) )
		#=> fat
	puts( 'bat'.match( /[fc]at/ ) )
		#=> nil

	# match char in a range...
	puts( 'ABC100x3Z'.match( /[A-Z][0-9][A-Z0-9]/ ) )
		#=> C10
	puts( 'ABC100x3Z'.match( /[a-z][0-9][A-Z0-9]/ ) )
		#=> x3Z

	# escape 'special' chars with \
	puts( 'ask who?/what?'.match( /who\?\/w..t\?/ ) )
		#=> who?/what?
	puts( 'ABC 100x3Z'.match( /\s\S\d\d\D/ ) )
		#=> " 100x" (note the leading space)

	# scan for all occurrences of pattern 'abc' with at least 2 and
	# no more than 3 occurrences of the letter 'c'
	p( 'abcabccabcccabccccabccccccabcccccccc'.scan( /abc{2,3}/ ) )
		#=> ["abcc", "abccc", "abccc", "abccc", "abccc"]

	# match either of two patterns
	puts( 'my cat and my dog'.match( /cat|dog/ ) ) 		#=> cat
	puts( 'my hamster and my dog'.match( /cat|dog/ ) ) 	#=> dog