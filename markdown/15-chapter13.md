---

	{
		"title": "第十三章",
		"ctime": "2018-12-23 00:49:00",
		"mtime": "2018-12-23 00:49:00"
	}

---

# 第十三章

***

## Files 与 IO

Ruby 提供了专门用于处理 IO – 输入和输出的类。其中最主要的是一个名为 IO 的类，这不足为奇。IO 类允许你打开和关闭 IO “流”（streams，字节序列），并向它们读写数据。

例如，假设你有一个名为 'textfile.txt' 的文件，它包含一些文本行，这就是你打开文件并在屏幕上显示每一行文本的方法：

<div class="code-file clearfix"><span>io_test.rb</span></div>

	IO.foreach("testfile.txt") {|line| print( line ) }

这里 `foreach` 是 IO 类的类方法，因此你不需要创建新的 IO 对象来使用它；相反，你只需将文件名指定为参数。`foreach` 方法接收一个块，从文件中读取的每一行都作为参数传递给它。你不必打开文件进行读操作，并在完成后关闭它（正如你根据其它语言的使用经验所预料的那样），因为 Ruby 的 `IO.foreach` 方法会为你完成这些操作。

IO 有许多其它有用的方法。例如，你可以使用 `readlines` 方法将文件内容读入数组以进行进一步处理。这是一个简单的示例，它再次将文本行打印到屏幕：

	lines = IO.readlines("testfile.txt")
	lines.each{|line| print( line )}

File 类是 IO 类的子类，上面的示例可以使用 File 类重写：

<div class="code-file clearfix"><span>file_test.rb</span></div>

	File.foreach("testfile.txt") {|line| print( line ) }

	lines = File.readlines("testfile.txt")
	lines.each{|line| print( line )}

### 打开和关闭文件

虽然一些标准方法会自动打开和关闭文件，但在处理文件内容时，你需要显式的打开和关闭文件。你可以使用 `new` 或 `open` 方法打开文件。你必须将两个参数传递给其中一个方法 - 文件名和文件 'mode' - 同时将返回一个新的 File 对象。文件模式（modes）可以是由操作系统指定的常量或字符串所定义的整数。该模式通常指示文件是打开以进行读取（'r'），写入（'w'）还是读取和写入（'rw'）。这是可用字符串模式的列表：

| Mode | Meaning |
| ------ | ------ |
| "r" | 只读，从文件开头开始（默认模式）。 |
| "r+" | 读写，从文件开头开始。 |
| "w" | 只写，将现有文件截断为零长度或创建用于写入的新文件。 |
| "w+" | 读写，将现有文件截断为零长度或创建新文件以进行读写。 |
| "a" | 只写，如果文件存在则从文件末尾开始，否则创建一个用于写入的新文件。 |
| "a+" | 读写，如果文件存在则从文件末尾开始，否则创建一个用于读写的新文件。 |
| "b" | （仅限 DOS/Windows）二进制文件模式（可能与上面列出的任何关键字母一起出现）。 |

<div class="code-file clearfix"><span>open_close.rb</span></div>

让我们看一下打开，处理和关闭文件的实际示例。在 **open_close.rb** 中，我首先打开一个文件 'myfile.txt'，用于写入（'w'）。打开文件进行写入时，如果该文件尚不存在，则将创建该文件。我使用 `puts()` 在文件中写入六个字符串，在六行中分别写一个字符串。最后我关闭了文件。

	f = File.new("myfile.txt", "w")
	f.puts( "I", "wandered", "lonely", "as", "a", "cloud" )
	f.close

关闭文件不仅会释放“文件句柄”（file handle，指向文件数据的指针），还会“刷新”（flushes）内存中的数据，以确保它全部保存到磁盘上的文件中。未能关闭文件可能会导致不可预测的副作用（尝试注释掉上面显示的 `f.close` 以便你自己查看！）。

现在，将文本写入文件后，让我们看看如何打开该文件并重新读取数据。这次我将一次读取一个数据中的字符。在我这样做的时候，我将保留已读过的字符数。我还会保留行数，每当我读入一个换行符时，行数都会递增（给定 ASCII 码 10）。为了清楚起见，我将在每行读取的末尾添加一个字符串，显示其行号。我将在屏幕上显示文件字符加上我的行结束字符串，当从文件中读取所有内容后，我将关闭它并显示我计算的统计数据。这是完整的代码：

	charcount = 0
	linecount = 0
	f = File.new("myfile.txt", "r")
	while !( f.eof ) do 		# while not at end of file...
	  c = f.getc()  			# getc gets a single character
	  if ( c == 10 ) then 		# ...whose ASCII code is tested
		linecount += 1
		puts( " <End Of Line #{linecount}>" )
	  else
		putc( c )  				# putc here puts the char to screen
		charcount += 1
	  end
	end

	if f.eof then
	  puts( "<End Of File>" )
	end
	f.close
	puts("This file contains #{linecount} lines and #{charcount} characters." )

### 文件和目录...

你还可以使用 File 类来操作磁盘上的文件（files）和目录（directories）。在尝试对文件执行某些操作之前，你必须自然地确保该文件存在。毕竟，它可能在程序启动后被重命名或删除 - 或者用户可能错误地输入了文件或目录名称。

你可以使用 `File.exist?` 方法验证文件是否。这是 FileTest 模块提供给 File 类的几种测试方法之一。就 `File.exist?` 方法而言，一个目录记为一个文件，所以你可以使用下面的代码来测试是否存在 C:\ 驱动器（注意你必须在字符串中使用双文件分隔符 '\\'，单个 '\' 将被视为转义字符）：

<div class="code-file clearfix"><span>file_ops.rb</span></div>

	if File.exist?( "C:\\" ) then
	  puts( "Yup, you have a C:\\ directory" )
	else
	  puts( "Eeek! Can't find the C:\\ drive!" )
	end

如果要区分目录和数据文件，请使用 `directory?` 方法：

	def dirOrFile( aName )
	  if File.directory?( aName ) then
		puts( "#{aName} is a directory" )
	  else
		puts( "#{aName} is a file" )
	  end
	end

### 复制文件

让我们通过编写一个简单的文件备份程序将 File 类用于实际用途。当你运行 **copy_files.rb** 时，将要求你选择要从中复制的目录（源目录）和要复制到的另一个目录（目标目录）。假设两个目录都存在，程序将把所有文件从源目录复制到目标目录。如果目标目录不存在，它将询问你是否要创建它（你应该输入，'Y' 接受）。我已经为你提供了一个源目录；只需在提示时输入名称 **srcdir**。当询问目标目录时，输入 **targetdir** 以在当前目录下创建该名称的子目录。

程序使用源目录的路径初始化变量 `sourcedir`，并使用目标目录的名称初始化 `targetdir`。这是执行文件复制的代码：

<div class="code-file clearfix"><span>copy_files.rb</span></div>

	Dir.foreach( sourcedir ){
	  |f|
	  filepath = "#{sourcedir}\\#{f}"
	  if !(File.directory?(filepath) ) then
	    if File.exist?("#{targetdir}\\#{f}") then
		  puts("#{f} already exists in target directory (not copied)" )
	    else
		  FileUtils.cp( filepath, targetdir )
		  puts("Copying... #{filepath}" )
	    end
	  end
	}

在这里，我使用了 Dir 类的 `foreach` 方法，该方法将指定目录中每个文件的文件名传递给块变量 `f`。我很快就会说到关于 Dir 类的东西。该代码通过将文件名附加到 `sourcedir` 变量给出的目录名来构造合适的文件路径 `filepath`。我只想复制数据文件而不是目录，所以我测试文件路径是文件而不是目录：

	if !(File.directory?(filepath) )

此程序不会复制已存在的文件，因此它首先检查目标目录 `targetdir` 中是否已存在名称为 `f` 的文件：

	if File.exist?("#{targetdir}\\#{f}")

最后，假设满足所有指定条件，源文件 `filepath` 将复制到 `targetdir`：

	FileUtils.cp( filepath, targetdir )

这里的 `cp` 是 FileUtils 模块中的文件复制方法。该模块还包含许多其它有用的文件处理例程，例如 `mv(source，target)` 用于将文件从 `source` 移动到 `target`；`rm(files)` 将删除 files 参数列出的一个或多个文件，`mkdir` 将创建一个目录，就像我在当前程序中创建 `targetdir` 时所做的那样：

	FileUtils.mkdir( targetdir )

### 目录查询

我的备份程序一次只处理一个目录级别 - 这就是为什么它在尝试复制之前测试文件 `f` 不是目录的原因。但是，有很多次，你可能想要遍历子目录。举个例子，让我们编写一个程序来计算指定根目录下所有子目录的大小。例如，如果你想要找到最大的文件和目录，以便通过存档或删除它们来释放磁盘空间，这可能很有用。

浏览子目录为我们提供了一个有趣的编程问题。当我们开始搜索存在的子目录时，我们不知道我们是否会找到一个，没有或者多个。此外，我们找到的任何子目录可能包含另一级子目录，每个子目录可能包含其它子目录，依此类推，通过许多可能的级别。

### 关于递归的讨论

我们的程序需要能够将整个子目录树向下导航到任意数量的级别。为了能够做到这一点，我们必须使用递归。

<div class="note">
	<p class="h4"><b>什么是递归（Recursion）？</b></p>

简单的说，递归方法就是调用它自己的。如果你不熟悉递归编程，请参阅本章末尾的“深入探索”部分中的“简单递归”。
</div>

<div class="code-file clearfix"><span>file_info.rb</span></div>

在程序 **file_info.rb** 中，`processfiles` 方法是递归的：

	def processfiles( aDir )
	  totalbytes = 0
	  Dir.foreach( aDir ){
		|f|
		mypath = "#{aDir}\\#{f}"
		s = ""
		if File.directory?(mypath) then
		  if f != '.' and f != '..' then
			bytes_in_dir = processfiles(mypath)  # <==== recurse!
			puts( "<DIR> ---> #{mypath} contains [#{bytes_in_dir/1024}] KB" )
		  end
		else
		  filesize = File.size(mypath)
		  totalbytes += filesize
		  puts ( "#{mypath} : #{filesize/1024}K" )
		end
	  }
	  $dirsize += totalbytes
	  return totalbytes
	end

你将看到，当首次调用该方法时，向下到源代码的底部，它将在变量 `dirname` 中传递一个目录的名称：

	processfiles( dirname )

我已经将当前目录的父级（由两个点给出，`".."`）分配给 `dirname`。如果你在其原始位置运行此程序（即，从本书的源代码存档中提取其位置），则将引用包含所有示例代码文件的子目录的目录。或者，你可以将硬盘上某个目录的名称分配给代码中指定的变量 `dirname`。如果你这样做，不要指定包含大量文件和目录的目录（**"C：\ Program Files"** 不是一个好的选择！），因为程序需要一些时间来执行。

让我们仔细看看 `processfiles` 方法中的代码。再次，我使用 `Dir.foreach` 查找当前目录中的所有文件，并一次传递一个文件 `f`，由花括号之间的块中的代码处理。如果 `f` 是一个目录但不是当前目录（`"."`）或其父目录（`".."`），那么我将目录的完整路径传递回 `processfiles` 方法：

	if File.directory?(mypath) then
	  if f != '.' and f != '..' then
		bytes_in_dir = processfiles(mypath)

如果 `f` 不是目录，而只是一个普通的数据文件，我用 `File.size` 计算它的大小（以字节为单位）并将其分配给变量 `filesize`：

	filesize = File.size(mypath)

由于每个连续文件 `f` 由代码块处理，因此计算其大小并将此值添加到变量 `totalbytes`：

	totalbytes += filesize

将当前目录中的每个文件传递到块后，`totalbytes` 将等于目录中所有文件的总大小。

但是，我还需要计算所有子目录中的字节数。由于该方法是递归的，因此这是自动完成的。请记住，当 `processfiles` 方法中大括号之间的代码确定当前文件f是一个目录时，它会将此目录名称传递回自身 -  `processfiles` 方法。

让我们假设首先使用 **C:\test** 目录调用 `processfiles`。在某些时候，变量 `f` 被赋予其子目录之一的名称 - 比如 **C:\test\dir_a**。现在这个子目录被传递回 `processfiles`。在 **C:\test\dir_a** 中找不到更多目录，因此 `processfiles` 只计算该子目录中所有文件的大小。当它完成计算这些文件时，`processfiles` 方法结束并将当前目录中的字节数 `totalbytes` 返回到首先调用该方法的代码位置：

	return totalbytes

在这种情况下，`processfiles` 方法本身内部的这段代码以递归方式调用 `processfiles` 方法：

	bytes_in_dir = processfiles(mypath)

因此，当 `processfiles` 完成处理子目录 **C:\test\dir_a** 中的文件时，它返回在那里找到的所有文件的总大小，并将其分配给 `bytes_in_dir` 变量。`processfiles` 方法现在从它停止的地方继续（也就是说，它从它自己处理子目录的地方继续）以处理原始目录 **C:\test** 中的文件。

无论此方法遇到多少级别的子目录，每当它找到目录时都会调用它自己的事实确保它会自动沿着它找到的每个目录路径向下移动，计算每个子目录中的总字节数。

最后要注意的是，在每个递归级别完成时，分配给 `processfiles` 方法内部声明的变量的值将更改回其“之前”的值。因此，`totalbytes` 变量首先包含 **C:\test\test_a\test_b** 的大小，然后是 **C:\test\test_a** 的大小，最后是 **C:\test** 的大小。为了保证运行结果总和是所有目录的组合大小，我们需要将值分配给在方法外部声明的变量。为此，我使用全局变量 `$dirsize` 来实现这个目的，将处理的每个子目录计算的 `totalbytes` 值增加到该变量：

	$dirsize += totalbytes

顺便提一下，虽然字节（byte）对于非常小的文件来说可能是很方便的测量单位，但通常更好的是以千字节（kilobyte）描述更大的文件，以兆字节（megabytes）描述非常大的文件或目录。要将字节转换为千字节或将千字节转换为兆字节，你需要除以 1024。要将字节转换为兆字节，除以 1048576。

我程序中的最后一行代码执行这些计算，并使用 Ruby 的 `printf` 方法以格式化字符串显示结果：

	printf( "Size of this directory and subdirectories is #{$dirsize} bytes, #{$dirsize/1024}K, %0.02fMB", "#{$dirsize/1048576.0}" )

请注意，我在第一个字符串中嵌入了格式化占位符 "％0.02fMB"，并在逗号后面添加了第二个字符串：

	"#{$dirsize/1048576.0}".

第二个字符串计算目录大小（以兆字节为单位），然后将该值替换为第一个字符串中的占位符。占位符的格式选项 `"％0.02f"` 确保兆字节值显示为浮点数 `"f"`，带有两个小数位，`"0.02"`。

### 根据大小排序

目前，该程序按字母顺序打印文件和目录名称及其大小。但我对它们的相对大小更感兴趣。因此，如果文件按大小而不是按名称排序，则会更有用。

为了能够对文件进行排序，我们需要一些方法来存储所有文件大小的完整列表。一种显而易见的方法是将文件大小添加到数组中。在 **file_info2.rb** 中，我创建了一个空数组 `$files`，并且每次处理文件时，我都会将其大小附加到数组中：

<div class="code-file clearfix"><span>file_info2.rb</span></div>

	$files << fsize

然后，我可以对文件大小进行排序，以显示从低到高的值或（通过排序然后反转数组），从高到低的值：

	$files.sort # sort low to high
	$files.sort.reverse # sort high to low

唯一的问题是我现在最终得到一个没有相关文件名的文件大小数组。更好的解决方案是使用 Hash 而不是 Array。我在 **file_info3.rb** 中完成了这个。首先，我创建两个空 Hash：

<div class="code-file clearfix"><span>file_info3.rb</span></div>

	$dirs = {}
	$files = {}

现在，当 `processfiles` 方法遇到目录时，它会向 `$dirs` 哈希添加一个新元素，使用完整目录路径 `mypath` 作为键，目录大小 `dsize` 作为值：

	$dirs[mypath] = dsize

同样的将键值对添加到 `$files` 哈希中。当通过递归调用 `processfiles` 方法处理子目录和文件的整个结构时，`$dirs` 哈希变量将包含目录名和大小的键值对，`$files` 哈希将包含文件名的键值对和大小。

现在剩下的就是对这些哈希进行排序和显示。Hash 的标准排序方法是对键进行排序，而不是值。 我想根据值（大小）排序，而不是根据键（名称）。为了做到这一点，我已经定义了这个自定义排序方法：

	$files.sort{|a,b| a[1]<=>b[1]

这里 `sort` 遍历将（directory-walking） `$files` 哈希转换为 `[key，value]` 对的嵌套数组，并将其中的两个作为 `a` 和 `b` 传递到花括号之间的块中。每个 `[key，value]` 对的第二项（在索引 `[1]` 处）提供值。使用 Ruby 的 `<=>` 比较方法对值进行排序。最终结果是，该程序现在首先按升序（按大小）显示文件列表，然后类似的显示排序的目录列表。

## 深入探索

### 简单递归

<div class="code-file clearfix"><span>recursion.rb</span></div>

如果你之前从未使用过递归（recursion），则本章中的递归“目录遍历”（directory-walking）方法可能需要一些说明。为了阐明递归是如何工作的，让我们看一个更简单的例子。加载 **recursion.rb** 程序：

	$outercount = 0

	def addup( aNum )
	  aNum += 1
	  $outercount +=1
	  puts( "aNum is #{aNum}, $outercount is #{$outercount}" )
	  if $outercount < 3 then
		addup( aNum ) #<= recursive call to addup method
	  end
	  puts( "At END: aNum is #{aNum}, outercount is #{$outercount}" )
	end

	addup( 0 ) #<= This is where it all begins

这包含递归方法 `addup`，其唯一的目的是从 1 到 3 计数。`addup` 方法接收一个整数值作为传入参数 `aNum`。

	addup( aNum )

还有全局变量 `$outercount`，它存在于 `addup` 方法之外。每当 `addup` 方法执行时，1 将添加到 `aNum`，1 也会添加到 `$outercount`。然后，只要 `$outercount` 小于 3，`addup` 方法中的代码就会再次调用相同的方法（`addup`），并将 `aNum` 的新值传递给它：

	if $outercount < 3 then
	  addup( aNum )
	end

让我们来看看会发生什么。通过值 0 来调用 `addup` 以启动整个过程：

	addup( 0 )

`addup` 方法将 `aNum` 和 `$outercount` 都加 1，因此两个变量现在都具有值 1。测试 `test($outercount < 3)` 的计算结果为 true，因此 `aNum` 作为参数传递给 `addup`。再次向两个变量添加 1，因此 `aNum` 现在为 2，`$outercount` 也为 2。现在 `aNum` 再次传递给 `addup`。然后再将 1 添加到两个变量中，给出每个值 3。然而，这次测试条件失败，因为 `$outercount` 不再小于 3。因此调用 `addup` 的代码被跳过，我们到达方法的最后一行：

	puts( "At END: aNum is #{aNum}, outercount is #{$outercount}" )

这会打印出 `aNum` 和 `$outercount` 的值，正如我们所料，它们都是 3。

现在已经到达此方法的末尾，“控制流”会在最初调用该方法的代码之后立即返回到代码行。这里，调用 `addup` 方法的代码行恰好位于方法本身内部。这里是：

	addup( aNum )

此后的第一个可执行代码行是（再次）方法的最后一行，它打印出两个变量的值：

	puts( "At END: aNum is #{aNum}, outercount is #{$outercount}" )

所以我们回到了之前的“执行点” - 我们递归调用 `addup` 方法的点。那时，`aNum` 的值是 2，也是它现在的值。如果这看起来令人困惑，那就试着想想如果 `aNum` 已经是 2 ，然后我们调用其它一些不相关的方法，那么会发生什么。从该方法返回时，`aNum` 当然仍然具有值 2。这就是发生在这里的一切。唯一的区别是这种方法恰好调用自己而不是其它方法。

该方法再一次退出，控制再次返回到调用该方法的代码之后的下一个可执行代码行 - 并且 `aNum` 的值又回到了自己的历史记录中 - 它现在具有值 1。但是，`$outercount` 变量存在于方法之外，不受递归的影响，因此它仍然是 3。

<div class="note">

如果你可以访问可视化调试器，那么如果在第 9 行放置一个断点（`if $outercount < 3 then`），将 `aNum` 和 `$outercount` 添加到 Watch 窗口，并在你命中断点之后重复进入代码，整个过程将变得更加清晰。

<div class="text-center">
	<img src="./images/chapter13_debug_recursion.png" />
	<p class="small">
		此屏幕截图显示了在 <a href="http://www.sapphiresteel.com/" target="_blank">Ruby In Steel</a> 中调试的递归程序。我可以单步执行源代码，使用调用堆栈来跟踪当前递归的“级别”（调用 <code>addup</code> 方法的次数），并使用Watch 窗口监视变量的当前值。
	</p>
</div>
</div>