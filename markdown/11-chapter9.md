---

	{
		"title": "第九章",
		"ctime": "2018-12-03 21:27:00",
		"mtime": "2018-12-03 21:27:00"
	}

---

# 第九章

***

## 异常处理

即使是精心编写的程序，有时也会遇到无法预料的错误。例如，如果编写需要从磁盘读取某些数据的程序，则可以假设指定的磁盘实际可用且数据有效。如果你的程序根据用户输入进行计算，则它假定输入适合用于计算。

虽然你可能会在一些潜在的问题出现之前尽可能的预料到 - 例如，通过编写代码来检查文件是否存在，然后再从中读取数据，或者在进行计算之前检查用户输入是否为数字 - 你永远无法提前预料到每个问题。

例如，用户可以在已经开始从 CD 中读取数据时移除 CD；或者，在你的代码尝试除以此值之前，某些模糊的计算可能会产生 0。当你知道在运行时（runtime）某些不可预见的情况可能导致你的代码被“中断”（break）时，你可以尝试使用“异常处理”（exception handling）来避免灾难。

“异常”（exception）是打包到对象中的错误。该对象是 Exception 类（或其后代之一）的一个实例。你可以通过捕获异常对象（Exception Object）来处理异常，可选地使用它包含的信息（比如打印相应的错误消息）并采取从错误中恢复所需的任何操作 - 可能通过关闭任何仍然打开的文件，或者分配合理的值给那些因错误计算而被分配了一些无意义的值的变量。

### Rescue

异常处理的基本语法可归纳如下：

	begin
	  # Some code which may cause an exception
	rescue <Exception Class>
	  # Code to recover from the exception
	end

下面是一个处理尝试除以零的异常的程序示例：

<div class="code-file clearfix"><span>exception1.rb</span></div>

	begin
	  x = 1/0
	rescue Exception
	  x = 0
	  puts( $!.class )
	  puts( $! )
	end

<div class="code-file clearfix"><span>div_by_zero.rb</span></div>

运行此代码时，除以零的尝试会导致异常。如果未处理（如示例程序 **div_by_zero.rb**），程序将崩溃。但是，通过将有问题的代码放在异常处理块（`begin` 和 `end` 之间）中，我已经能够在以 `rescue` 开头的部分中捕获异常。我做的第一件事是将变量 `x` 设置为有意义的值。接下来是这两个令人费解的语句：

	puts( $!.class )
	puts( $! )

在 Ruby 中，`$!` 是一个全局变量，为其分配了最后一个捕获的异常对象。打印 `$!.class` 会显示类名，这里是 "ZeroDivisionError"；单独打印变量 `$!` 会显示异常对象中包含的错误信息，这里是 "divided by 0"。

我一般都不太热衷于依赖全局变量，特别是当它们的'名字'与 `$!` 一样不具有描述性时。幸运的是，还有另一种选择。你可以通过将'关联运算符'（assoc operator），`=>` 放在异常的类名之后和变量名之前，将变量名与异常对象相关联：

<div class="code-file clearfix"><span>exception2.rb</span></div>

	rescue Exception => exc

你现在可以使用变量名称（此处为 `exc`）来引用 Exception 对象：

	puts( exc.class )
	puts( exc )

<div class="code-file clearfix"><span>exception_tree.rb</span></div>

<div class="note">
	<p class="h4"><b>Exceptions 有一个家族树（家谱）...</b></p>

要理解 `rescue` 子句如何捕获异常，只要记住，在 Ruby 中异常是对象，并且像所有其它对象一样，它们由一个类定义。此外，还有一个明确的“继承链”，就像所有 Ruby 对象都继承自 Object 类一样。
</div>

虽然看起来很明显，当你除以零时，你将得到一个 ZeroDivisionError 异常，在现实世界的代码中，有时候异常的类型不是那么可预测的。例如，假设你有一个基于用户提供的两个值进行除法计算的方法：

	def calc( val1, val2 )
	  return val1 / val2
	end

这可能会产生各种不同的异常。显然，如果用户输入的第二个值为 0，我们将得到 ZeroDivisionError。

但是，如果*第二个*值是字符串（string），则异常将是 TypeError，而*第一个*值是字符串时，它将是 NoMethodError（因为 String 类没有定义'除法运算符' `/`）。这里的 `rescue` 块处理所有可能发生的异常：

<div class="code-file clearfix"><span>multi_except.rb</span></div>

	def calc( val1, val2 )
	  begin
		result = val1 / val2
	  rescue Exception => e
		puts( e.class )
		puts( e )
		result = nil
	  end
	  return result
	end

通常，针对不同的异常采取不同的行为会很有用。你可以通过添加多个 `rescue` 块来实现。每个 `rescue` 子句都可以处理多个异常类型，异常类名用逗号分隔。这里我的 `calc` 方法在一个子句中处理 TypeError 和 NoMethodError 异常，并使用 catch-all 异常处理程序来处理其它所有异常类型：

<div class="code-file clearfix"><span>multi_except2.rb</span></div>

	def calc( val1, val2 )
	  begin
		result = val1 / val2
	  rescue TypeError, NoMethodError => e
		puts( e.class )
		puts( e )
		puts( "One of the values is not a number!" )
		result = nil
	  rescue Exception => e
		puts( e.class )
		puts( e )
		result = nil
	  end
	  return result
	end

<div class="code-file clearfix"><span>exception_tree.rb</span></div>

<div class="note">
	<p class="h4"><b>Object 类是所有异常类（exceptions）的最终祖先类。</b></p>

从 Object 类开始，派生出子类 Exception，然后是 StandardError，最后是更具体的异常类型，例如 ZeroDivisionError。如果你愿意，你可以编写一个 `rescue` 子句来处理 Object 类，因为 Object 是所有对象的祖先，这样确实会成功匹配一个异常对象：

	# This is possible...
	rescue Object => exc

但是，尽可能匹配 Exception 类的相关后代类通常更有用。作为更好的措施，附加一个处理 StandardError 或 Exception 对象的 `rescue` 子句是很有用的，以防止你没考虑到的异常类型被漏掉。你可以运行 `exception_tree.rb` 程序来查看 ZeroDivisionError 异常的家族树（继承链）。
</div>

在处理多个异常类型时，应始终让 `rescue` 子句先处理特定类型的异常，然后使用 `rescue` 子句处理通用类型的异常。

当特定类型异常（例如 TypeError）处理完时，`begin..end` 异常块将会退出，因此执行流程不会“进入”通用类型的 `rescue` 子句。但是，如果 `rescue` 子句首先处理通用类型的异常，那么它将处理所有类型的异常，因此任何用来处理更具体的类型的异常子句都将永远不会执行。

例如，如果我在 `calc` 方法中颠倒了 `rescue` 子句的顺序，首先放置了通用的 Exception 处理程序，这将匹配所有的异常类型，因此特定的 TypeError 和 NoMethodError 异常处理子句永远都不会运行：

<div class="code-file clearfix"><span>multi_except_err.rb</span></div>

	# This is incorrect...
	rescue Exception => e
	  puts( e.class )
	  puts( e )
	  result = nil
	rescue TypeError, NoMethodError => e
	  puts( e.class )
	  puts( e )
	  puts( "Oops! This message will never be displayed!" )
	  result = nil
	end

### Ensure

无论是否发生异常（Exception），你可能会在某些情况下采取某些特定操作。例如，每当你处理某种不可预测的输入/输出时 - 例如，在使用磁盘上的文件和目录时 - 总是有可能位置（磁盘或目录）或数据源（文件）根本不存在或者可能发生其它类型的问题 - 例如当你尝试写入时磁盘已满，或者尝试读取时可能包含一个错误类型的数据。

无论你是否遇到任何问题，你可能需要执行一些最终的“清理”（cleanup）过程 - 例如登录到特定的工作目录或关闭先前打开的文件。你可以通过在 `begin..rescue` 代码块后跟随一个以 `ensure` 关键字开头的另一个块的来执行此操作。`ensure` 块中的代码将始终会执行 - 无论之前是否发生异常。

最后，我想确保我的工作目录（由 `Dir.getwd` 提供）始终恢复到其原始位置。我通过在 `startdir` 变量中保存原始目录并再次在 `ensure` 块中将其作为工作目录来完成此操作：

<div class="code-file clearfix"><span>ensure.rb</span></div>

	startdir = Dir.getwd

	begin
	  Dir.chdir( "X:\\" )
	  puts( `dir` )
	rescue Exception => e
	  puts e.class
	  puts e
	ensure
	  Dir.chdir( startdir )
	end

现在让我们看看如何处理从文件中读取错误数据的问题。如果数据损坏，或者你不小心打开了错误的文件，或者很简单 - 你的程序代码包含错误（bug）时，则可能会发生这种情况。

这里我有一个文件 **test.txt**，包含六行内容。前五行是数字（numbers）；第六行不是。我的代码会打开此文件并读入所有六行内容：

<div class="code-file clearfix"><span>ensure2.rb</span></div>

	f = File.new( "test.txt" )

	begin
	  for i in (1..6) do
		puts("line number: #{f.lineno}")
		line = f.gets.chomp
		num = line.to_i
		puts( "Line '#{line}' is converted to #{num}" )
		puts( 100 / num )
	  end
	rescue Exception => e
	  puts( e.class )
	  puts( e )
	ensure
	  f.close
	  puts( "File closed" )
	end

这些行作为字符串读入（使用 `gets`），尝试将它们转换为整数（使用 `to_i`）。转换失败时不会产生错误；Ruby 会返回值 0。

问题出现在下一行代码中，它尝试按转换后的数字进行除法运算。输入文件的第六行包含字符串 "six"，当尝试转换为整数时产生 0 - 并且当在除法运算中使用该值时不可避免地会导致错误发生。

在外部打开数据文件后，无论是否发生错误我都想确保文件会关闭。例如，如果我只通过将 `for` 循环中的范围编辑为 `(1..5)` 来读取前五行，那么就没有异常。我仍然想要关闭该文件。

但是将文件关闭代码（`f.close`）放在 `rescue` 子句中并不好，因为在这种情况下它不会被执行。然而，通过将它放在 `ensure` 子句中，无论是否发生异常，我都可以确定该文件将被关闭。

### Else

如果说 `rescue` 部分在发生错误时执行，而 `ensure` 无论是否发生错误都会执行，那么我们怎么才能只有在没有*发生*错误时指定执行某些代码？

这样做的方法是在 `rescue` 部分之后和 `ensure` 部分之前添加一个可选的 `else` 子句（如果有的话），如下所示：

	begin
			# code which may cause an exception
	rescue [Exception Type]
	else 	# optional section executes if no exception occurs
	ensure  # optional exception always executes
	end

这是一个示例：

<div class="code-file clearfix"><span>else.rb</span></div>

	def doCalc( aNum )
	  begin
		result = 100 / aNum.to_i
	  rescue Exception => e # executes when there is an error
		result = 0
		msg = "Error: " + e
	  else  # executes when there is no error
		msg = "Result = #{result}"
	  ensure  # always executes
		msg = "You entered '#{aNum}'. " + msg
	  end
	  return msg
	end

### Error 编号

如果你之前运行了 `ensure.rb` 程序并且你正密切关注，你可能已经发现了一些异常情况当你尝试登录不存在的驱动器（例如，在我的系统上可能是 "X:\" 驱动器）。通常，当一个异常发生时，异常类是特定命名类型的实例，如 ZeroDivisionError 或 NoMethodError。然而，在这种情况下，类异常显示为：

	Errno::ENOENT

事实证明，Ruby 中存在各种各样的 `Errno` 错误。试试 **disk_err.rb**。这里定义了一个方法 `chDisk`，它尝试登录由字符 `aChar` 标识的磁盘。因此，如果你传递 "A" 作为 `chDisk` 的参数，它将尝试登录 A:\ 驱动器。我调用了三次 `chDisk` 方法，每次都传递一个不同的字符串：

<div class="code-file clearfix"><span>disk_err.rb</span></div>

	chDisk( "D" )
	chDisk( "X" )
	chDisk( "ABC" )

在我的电脑上，D:\ 是我的 DVD 驱动器。目前它是空的，当我的程序尝试登录它时，Ruby 返回此类型的异常：

	Errno::EACCES

我的 PC 上没有 X:\ 驱动器，当我尝试登录时，Ruby 会返回此类型的异常：

	Errno::ENOENT

在最后一个示例中，我传递一个字符串参数 "ABC" 作为无效的磁盘标识符，Ruby 返回此类型的异常：

	Errno::EINVAL

此类型的错误是 SystemCallError 类的后代。你可以通过取消注释代码行来轻松的验证这一点，以显示 **disk_err.rb** 源代码中指示的类的族。

实际上，这些类包含底层操作系统返回的整数错误值。这里 `Errno` 是包含匹配相应整数错误值的常量（例如 `EACCES` 和 `ENOENT`）的模块的名称。

要查看 `Errno` 常量的完整列表，请运行以下命令：

	puts( Errno.constants )

要查看任何给定常量的相应数值，请将 `::Errno` 追加到常量名称后面，如下所示：

	Errno::EINVAL::Errno

<div class="code-file clearfix"><span>errno.rb</span></div>

以下代码可用于显示所有 `Errno` 常量的列表及其数值：

	for err in Errno.constants do
	  errnum = eval( "Errno::#{err}::Errno" )
	  puts( "#{err}, #{errnum}" )
	end

### Retry

如果你认为错误情况可能是暂时的或者可以被纠正（由用户），你可以使用关键字 `retry` 重新运行 `begin..end` 块中的所有代码，如此示例中如果发生 ZeroDivisionError 等错误则会提示用户重新输入一个值：

<div class="code-file clearfix"><span>retry.rb</span></div>

	def doCalc
	  begin
		print( "Enter a number: " )
		aNum = gets().chomp()
		result = 100 / aNum.to_i
	  rescue Exception => e
		result = 0
		puts( "Error: " + e + "\nPlease try again." )
		retry #  retry on exception
	  else
		msg = "Result = #{result}"
	  ensure
		msg = "You entered '#{aNum}'. " + msg
	  end
	  return msg
	end

当然，存在这样的危险：错误可能不像你想象的那样是暂时的，如果你使用 `retry`，你必须要提供明确定义的退出（exit）条件，以确保代码在固定次数的尝试后停止执行。

例如，你可以在 `begin` 子句中递增一个局部变量（如果这样做，请确保它在任何可能产生异常的代码之前递增，因为一旦发生异常，那些剩下的预先为 `rescue` 子句关联的代码将被跳过！）。然后在 `rescue` 部分测试该变量的值，如下所示：

	rescue Exception => e
	  if aValue < someValue then
		retry
	  end

这是一个完整的示例，其中我测试名为 `tries` 的变量的值，以确保在异常处理块退出之前在不出错的情况下尝试重新运行代码不超过三次：

	def doCalc
	  tries = 0
	  begin
		print( "Enter a number: " )
		tries += 1
		aNum = gets().chomp()
		result = 100 / aNum.to_i
	  rescue Exception => e
		msg = "Error: " + e
		puts( msg )
		puts( "tries = #{tries}" )
		result = 0
		if tries < 3 then # set a fixed number of retries
		  retry
		end
	  else
		msg = "Result = #{result}"
	  ensure
		msg = "You entered '#{aNum}'. " + msg
	  end
	  return msg
	end

### Raise

有时你可能希望将异常保持为“活动的”（alive），即使它已被异常处理块捕获。例如，这可用于推迟异常的处理 - 通过将其传递给其他方法。你可以使用 `raise` 方法执行此操作。但是，你需要注意，一旦异常被抛出（raised），就需要重新处理该异常，否则可能导致程序崩溃。这是一个简单的示例，它引发了一个 ZeroDivisionError 异常，并将异常传递给一个名为 `handleError` 的方法：

<div class="code-file clearfix"><span>raise.rb</span></div>

	begin
	  divbyzero
	rescue Exception => e
	  puts( "A problem just occurred. Please wait..." )
	  x = 0
	  begin
		raise
	  rescue
		handleError( e )
	  end
	end

这里 `divbyzero` 是一个方法的名称，在该方法中进行除零操作，`handleError` 是一个打印该异常的更详细的信息的方法：

	def handleError( e )
	  puts( "Error of type: #{e.class}" )
	  puts( e )
	  puts( "Here is a backtrace: " )
	  puts( e.backtrace )
	end

请注意，这里使用了 `backtrace` 方法，该方法显示一个字符串数组 - 显示发生错误所在的文件名和行号，在本例中为调用生成错误的 `divbyzero` 方法所在的行。

<div class="code-file clearfix"><span>raise2.rb</span></div>

即使程序代码本身没有引起异常，你也可以专门抛出（raise）异常以强制执行错误条件。单独调用 `raise` 会抛出 RuntimeError 类型的异常（或全局变量 `$!` 中的任何异常）：

	raise # raises RuntimeError

默认情况下，这将没有与之关联的描述性消息。你可以将消息添加为参数，如下所示：

	raise "An unknown exception just occurred!"

你可以抛出特定类型的错误...

	raise ZeroDivisionError

你还可以创建特定异常类型的对象，并使用自定义消息对其进行初始化...

	raise ZeroDivisionError.new( "I'm afraid you divided by Zero" )

<div class="code-file clearfix"><span>raise3.rb</span></div>

当然，如果标准异常类型不符合你的要求，你可以通过继承现有异常类来创建新的异常类型。为你的类提供 `to_str` 方法，以便为它们提供默认信息。

	class NoNameError < Exception
	  def to_str
		"No Name given!"
	  end
	end

这是一个如何抛出自定义异常的示例：

	def sayHello( aName )
	  begin
		if (aName == "") or (aName == nil) then
		  raise NoNameError
		end
	  rescue Exception => e
		puts( e.class )
		puts( "message: " + e )
		puts( e.backtrace )
	  else
		puts( "Hello #{aName}" )
	  end
	end

## 深入探索

### 省略 begin 和 end

在方法，类或模块中捕获异常时，你可以选择省略 `begin` 和 `end`。例如，以下所有内容都是合法的：

<div class="code-file clearfix"><span>omit_begin_end.rb</span></div>

	def calc
		result = 1/0
	  rescue Exception => e
		puts( e.class )
		puts( e )
		result = nil
	  return result
	end

	class X
		@@x = 1/0
	  rescue Exception => e
		puts( e.class )
		puts( e )
	end

	module Y
		@@x = 1/0
	  rescue Exception => e
		puts( e.class )
		puts( e )
	end

在上面显示的所有情况中，如果以通常的方式将 `begin` 和 `end` 关键字放在异常处理代码块的开头和结尾，则异常处理也会起作用。

### Catch...Throw

在某些语言中，可以使用关键字 `catch` 捕获异常，使用关键字 `throw` 来抛出异常。虽然 Ruby 提供了 `catch` 和 `throw` 方法，但它们与异常处理没有直接关系。相反，`catch` 和 `throw` 用于在满足某些条件时跳出已定义的代码块。当然，在发生异常时，你也可以使用 `catch` 和 `throw` 来跳出代码块（尽管这可能不是处理错误的最优雅方式）。

<div class="code-file clearfix"><span>catch_except.rb</span></div>

	catch(:finished) {
	  print( 'Enter a number: ' )
	  num = gets().chomp.to_i
	  begin
		result = 100 / num
	  rescue Exception => e
		throw :finished  # jump to end of block
	  end
	  puts("The result of that calculation is #{result}" )
	} # end of :finished catch block

有关 `catch` 和 `throw` 的更多信息，请参见第 6 章。