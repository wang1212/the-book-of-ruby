---

	{
		"title": "第十七章",
		"ctime": "2018-12-29 19:14:00",
		"mtime": "2018-12-29 19:14:00"
	}

---

# 第十七章

***

## 线程（Threads）

有时你的程序可能需要一次执行多个操作。例如，你可能想要执行一些磁盘操作（IO）并同时向用户显示一些反馈。或者你可能希望在后台复制或上传某些文件时，同时仍允许用户继续执行“前台”中的其它任务。

在 Ruby 中，如果你希望一次执行多个任务，则可以在自己的“线程”（thread）中运行每个任务。线程就像程序中的程序。它独立于任何其它线程运行一些特定的代码。

但是，正如我们稍后将看到的，多个线程可能需要找到相互协作的方法，例如，它们可以共享相同的数据，并且不会占用自己可用的所有处理时间，从而阻止其它线程运行。

### 创建线程

可以使用 `new` 方法像任何其它对象一样创建线程。执行此操作时，必须将包含你希望线程运行的代码块传递给 Thread。

接下来是我首先尝试创建两个线程，其中一个应该打印四个字符串，而另一个打印十个数字：

<div class="code-file clearfix"><span>threads1.rb</span></div>

	# This is a simple threading example which, however, doesn't work as anticipated!

	words = ["hello", "world", "goodbye", "mars" ]
	numbers = [1,2,3,4,5,6,7,8,9,10]

	Thread.new{
	  words.each{ |word| puts( word ) }
	}

	Thread.new{
	  numbers.each{ |number| puts( number ) }
	}

很可能，当你运行它时，你可能看不到任何东西，或者，无论如何都会很少。我已经添加了一个关于程序执行时间的报告，这表明这个事情在它有时间开始之前就已经完成了！

### 运行线程

这是对线程运行（thread-running）问题的简单修复。在代码的末尾，添加以下内容：

<div class="code-file clearfix"><span>threads2.rb</span></div>

	sleep( 5 )

现在，当你再次运行代码时，你应该会看到所有字符串和所有数字，尽管有点混乱。事实上，这正是我们想要的，因为它表明时间现在正在两个线程之间划分；这就是为什么单词和数字交错出现 - 首先第一个线程执行并显示一个单词，然后下一个线程执行并显示一个数字，然后执行返回到第一个线程，依此类推，直到第一个线程结束（当所有四个单词都显示后），此时第二个线程可以不间断地运行。

现在将其与该程序的第一个版本进行比较。在那个程序中我创建了两个线程，但是就像 Ruby 刚刚准备好运行它们包含的代码一样，*迷惑（bam）*！它到达了程序的末尾并关闭（中断）了所有事情 - 包括我的两个线程。所以，实际上，线程在它们有时间做任何事情之前都被杀掉了。

通过添加一个 `sleep(5)` 我给了 Ruby 五秒钟的延迟 - 在程序退出之前有足够的时间运行这些线程。这种技术只有一个问题 - 也是一个很大的问题。为让线程运行而向程序添加不必要的延迟会偏离练习的目的。这里的计时器显示的表明程序运行了整整五秒钟 - 比绝对必要的时间长约 4.99 秒！我们将很快看到更加优雅的处理线程的方法。

<div class="note">
	<p class="h4"><b>本地化？</b></p>

目前（在 Ruby 1.8x 中）Ruby 的线程不是“原生的”（native）。简而言之，这意味着 Ruby 线程存在于 Ruby 程序的封闭世界中 - 多个线程在单个进程中分配时间（使用称为“时间切片”（time-slicing）的例程）。Ruby 没有利用操作系统处理的“本地线程”（native threads）的优势，以允许在一个或多个处理器上更有效地执行（使用“抢占式多任务处理”，pre-emptive multitasking）。虽然 Ruby 线程牺牲了效率，但它们至少可以从可移植性中获益；写在一个操作系统上的线程也将可以在不同的操作系统上运行。后续版本的 Ruby（在编写 Ruby 1.9 时，可能被视为主导 Ruby 2.0 的“实验性”版本）将支持本地线程。
</div>

### 主线程

即使你没有显式创建任何线程，也始终至少执行一个线程 - 运行 Ruby 程序的主（main）线程。你可以输入以下内容来验证这一点：

	p( Thread.main )

这将显示如下：

	#<Thread:0x28955c8 run>

在这里，Thread 是它的线程类，`0x28955c8`（或其它一些数字）是它的十六进制对象标识符，`run` 是线程的当前状态。

### 线程状态

每个线程的状态可以是以下之一：

| 状态 | 解释说明 |
| ------ | ------ |
| run | 当线程正在执行时 |
| sleep | 当线程正在休眠或等待 I/O 时 |
| aborting | 当线程正在中止 |
| false | 当线程正常终止时 |
| nil | 当线程以异常终止时 |

你可以使用 `status` 方法获取线程的状态。查看线程时也会显示状态，在这种情况下，`nil` 或 `false` 状态显示为 `'dead'`。

<div class="code-file clearfix"><span>thread_status.rb</span></div>

	puts( Thread.main.inspect )  				#=> #<Thread:0x28955c8 run>
	puts( Thread.new{ sleep }.kill.inspect ) 	#=> #<Thread:0x28cddc0 dead>
	puts( Thread.new{ sleep }.inspect ) 		#=> #<Thread:0x28cdd48 sleep>
	thread1 = Thread.new{ }
	puts( thread1.status )  					#=> false
	thread2 = Thread.new{ raise( "Exception raised!" ) }
	puts( thread2 ) 							 #=> nil

### 确保线程执行

让我们回到我们之前的程序中遇到的问题。回想一下，我们创建了两个线程，但程序在其中任何一个线程运行之前就已完成。我们通过使用 `sleep` 方法插入固定长度的延迟来解决这个问题。但是有意在你的程序中引入没有额外作用的延迟并不是你想要做的通用规则。幸运的是，Ruby 有一种更加优雅的方式来确保线程有时间执行。`join` 方法强制调用线程（例如主线程）挂起自己的执行（因此它不只是终止程序），直到调用 `join` 的线程完成：

<div class="code-file clearfix"><span>join.rb</span></div>

	words = ["hello", "world", "goodbye", "mars" ]
	numbers = [1,2,3,4,5,6,7,8,9,10]

	Thread.new{
	  words.each{ |word| puts( word ) }
	}.join

	Thread.new{
	  numbers.each{ |number| puts( number ) }
	}.join

乍一看，这似乎是进步了，因为两个线程都需要执行它们所需的时间，我们不必引入任何不必要的延迟。但是，当你查看输出时，你将看到线程按顺序运行 - 第二个线程在第一个线程完成后开始运行。但我们真正想做的是让两个线程同时运行，Ruby 从一个线程切换到另一个线程，为每个线程提供一小部分可用的处理时间。

下一个程序 **threads3.rb** 显示了实现这一目标的一种方式。它像之前一样创建两个线程；但是，这次它将每个线程分配给一个变量：`wordsThread` 和 `numbersThread`：

<div class="code-file clearfix"><span>threads3.rb</span></div>

	wordsThread = Thread.new{
	  words.each{ |word| puts( word ) }
	}

	numbersThread = Thread.new{
	  numbers.each{ |number| puts( number ) }
	}

现在它将这些线程放入一个数组中并调用 `each` 方法将它们传递到一个块中，块变量 `t` 接收它们，它只是在每个线程上调用 `join` 方法：

	[wordsThread, numbersThread].each{ |t| t.join }

正如你将从输出中看到的那样，两个线程现在“并行”（in parallel）运行，因此它们的输出混乱，但没有人为延迟，总执行时间可以忽略不计。

### 线程优先级

到目前为止，我们已经让 Ruby 完全自由地以任何方式切换线程之间的时间。但有时候一个线程比其它线程更重要。例如，如果你正在编写一个文件复制程序，其中一个线程用于执行实际复制，而另一个线程用于显示进度条，那么给文件复制线程更多时间是有意义的。

<div class="note">

有时候当前正在执行的线程特别想要将执行时间给予其它线程。原则上，这是通过调用 `Thread.pass` 方法完成的。然而，在实践中，这可能无法产生你期望的结果。`pass` 方法将在本章末尾的**“深入探索”**部分中详细讨论。
</div>

Ruby 允许你分配整数值以指示每个线程的优先级（priority）。理论上，具有较高优先级的线程比具有较低优先级的线程分配更多的执行时间。在实践中，事情并不那么简单，因为其它因素（例如运行线程的顺序）可能会影响给予每个线程的时间量。而且，在非常短的程序中，可能无法确定改变优先级的效果。我们到目前为止使用的单词和数字线程示例太短，无法显示任何差异。因此，让我们来看一个稍微工作密集的程序 - 一个运行三个线程的程序，每个线程调用一个方法五十次，以便计算 50 的阶乘。

<div class="code-file clearfix"><span>threads4.rb</span></div>

	def fac(n)
	  n == 1 ? 1 : n * fac(n-1)
	end

	t1 = Thread.new{
	  0.upto(50) {fac(50); print( "t1\n" )}
	}

	t2 = Thread.new{
	  0.upto(50) {fac(50); print( "t2\n" )}
	}

	t3 = Thread.new{
	  0.upto(50) {fac(50); print( "t3\n" )}
	}

我们现在可以为每个线程设置特定的优先级：

	t1.priority = 0
	t2.priority = 0
	t3.priority = 0

在这种情况下，每个线程的优先级是相同的，因此没有线程将被赋予操作的最大时间切片，并且所有三个线程的结果将像通常一样混乱的出现。现在尝试更改 `t3` 的优先级：

	t3.priority = 1

这次运行代码时，`t3` 将占用大部分时间并且（很大可能）在其它线程之前执行。其它线程可能会在一开始就得到关注，因为它们是以相同的优先级创建的，并且优先级仅在它们开始运行后才会更改。当 `t3` 结束时，`t1` 和 `t2` 应该或多或少平等地分享时间。

因此，假设你希望 `t1` 和 `t2` 首先运行，或多或少地共享时间，并且仅在这两个线程完成后运行 `t3`。这是我的第一次尝试；你可能想自己尝试一下：

	t1.priority = 2
	t2.priority = 2
	t3.priority = 1

嗯，最终结果不是我想要的！似乎线程是按顺序运行的，根本没有时间切片！好的，只是为了它，让我们尝试一些负数：

	t1.priority = -1
	t2.priority = -1
	t3.priority = -2

欢呼！这还差不多。这次，`t1` 和 `t2` 同时运行（在设置线程优先级之前，你可能还会看到 `t3` 短暂运行）；然后 `t3` 运行。那么为什么负值会起作用但正值却不会呢？

负值本身没有什么特别之处。但是，你需要记住，每个进程至少有一个运行的线程 - 主线程 - 这也有优先级。它的优先级恰好为 0。

### 主线程优先级

你可以很容易验证主线程（main thread）的优先级：

<div class="code-file clearfix"><span>threads4.rb</span></div>

	puts( Thread.main.priority )  	#=> 0

因此，在上一个程序（**threads4.rb**）中，如果将 `t1` 的优先级设置为 2，它将“超出”主线程本身优先级，然后将获得所需的所有执行时间，直到下一个线程 `t2` 到来等等。通过将优先级设置为低于主线程的优先级，你可以强制三个线程仅与它们自己竞争，因为主线程总是会超过它们。如果你更喜欢使用正数，则可以将主线程的优先级设置为高于所有其它线程的值：

	Thread.main.priority=100

<div class="code-file clearfix"><span>threads5.rb</span></div>

那么，现在，如果我们希望 `t2` 和 `t3` 具有相同的优先级，并且 `t1` 具有较低的优先级，我们需要为这三个线程和主线程设置优先级：

	Thread.main.priority = 200
	t1.priority = 0
	t2.priority = 1
	t3.priority = 1

如果仔细观察输出，可能会发现一个微小但不良的副作用。有可能（不确定，但可能）你会在开始时发现 `t1` 线程的一些输出，就在 `t2` 和 `t3` 开始并确定它们的优先级之前。这与我们前面提到的问题相同：每个线程一旦创建就尝试开始运行，并且 `t1` 可能会在其他线程的优先级被“提升”之前获得自己的运行时间切片。为了防止这种情况，我们可以使用 `Thread.stop` 在创建时专门挂起线程，如下所示：

<div class="code-file clearfix"><span>stop_run.rb</span></div>

	t1 = Thread.new{
	  Thread.stop
	  0.upto(50){print( "t1\n" )}
	}

现在，当我们想要启动线程运行时（在这种情况下，在设置线程优先级之后），我们调用它的 `run` 方法：

	t1.run

### 互斥

有时两个或多个线程可能都需要访问某种全局资源。由于全局资源的当前状态可能被一个线程修改，并且该修改的值在被某个其它线程使用时可能是不可预测的，因此这可能产生错误的结果。举一个简单的例子，看看这段代码：

<div class="code-file clearfix"><span>no_mutex.rb</span></div>

	$i = 0

	a = Thread.new {
	  1000000.times{ $i += 1 }
	}

	b = Thread.new {
	  1000000.times{ $i += 1 }
	}

	a.join
	b.join
	puts( $i )

我的目的是运行两个线程，每个线程递增全局变量 `$i` 一百万次。在这结束时 `$i` 的预期结果（自然）将是 200 万。但是，事实上，当我运行它时，`$i` 的结束值是 1088237（你可能会看到不同的结果）。

对此的解释是，这两个线程实际上正在竞争对全局变量 `$i` 的访问。这意味着，在某些时候，线程 `a` 可能获得 `$i` 的当前值（假设它恰好是 100）并且同时线程 `b` 也获得 `$i` 的当前值（仍然是 100）。现在，`a` 增加它刚刚获得的值（`$i` 变为 101）并且 `b` 增加它刚刚获得的值（因此 `$i` 再次变为 101！）。换句话说，当多个线程同时访问共享资源时，其中一些线程可能正在使用过时的值 - 即，没有考虑其它线程对该资源所做的任何修改。随着时间的推移，这些操作产生的错误会累积，直到我们得出的结果与我们预期的结果大不相同。

为了解决这个问题，我们需要确保当一个线程可以访问全局资源时，它会阻止其它线程的访问。另一种说法，即授予多个线程对全局资源的访问应该是“互斥的”（mutually exclusive）。你可以使用 Ruby 的 Mutex 类来实现它，该类使用信号量来指示当前资源是否正在被访问，并提供同步方法以防止（外部）访问块内的资源。请注意，你必须引入（require）*'thread'* 才能使用 Mutex 类。这是我重写的代码：

<div class="code-file clearfix"><span>mutex.rb</span></div>

	require 'thread'
	$i = 0

	semaphore = Mutex.new

	a = Thread.new {
	  semaphore.synchronize{
		1000000.times{ $i += 1 }
	  }
	}

	b = Thread.new {
	  semaphore.synchronize{
		1000000.times{ $i += 1 }
	  }
	}

	a.join
	b.join
	puts( $i )

这次，`$i` 的最终结果是 2000000。

最后，有关使用 Threads 的更有用的示例，请查看 **file_find2.rb**。此示例程序使用 Ruby 的 Find 类遍历磁盘上的目录。有关非线程示例，请参阅 **file_find.rb**。将其与第 13 章中的 **file_info3.rb** 程序进行比较，其使用的 Dir 类。

这会设置两个线程运行。第一个，`t1`，调用 `processFiles` 方法来查找和显示文件信息（你需要编辑对 `processFiles` 的调用以将系统上的目录名传递给它）。第二个线程 `t2` 只打印出一条消息，当 `t1` 处于“活着”状态（即运行或休眠）时，该线程运行：

<div class="code-file clearfix"><span>file_find2.rb</span></div>

	t1 = Thread.new{
	  Thread.stop
	  processFiles( '..' ) # edit this directory name
	}

	t2 = Thread.new{
	  Thread.stop
	  while t1.alive? do
		print( "\n\t\tProcessing..." )
		Thread.pass
	  end
	}

每个线程使用 `Thread.pass` 完成让步控制（`t1` 线程在 `processFiles` 方法内进行让步控制）。在实际应用程序中，你可以采用此技术以提供某种类型的用户反馈，同时进行一些密集的过程（例如目录遍历）。

## 深入探索

### 传递执行权给其它线程

在某些情况下，你可能特别希望某个线程（thread）能够让步执行权（execution）给任何其它线程以让其运行。例如，如果你有多个线程正在进行稳定的更新图形操作或显示各种“正在发生的”统计信息，你可能需要确保一旦一个线程绘制了 X 个像素或显示了 Y 个统计数据，另一个线程保证有机会做一些其它事情。

从理论上讲，`Thread.pass` 方法可以解决这个问题。根据 Ruby 的源代码文档，`Thread.pass` 调用线程调度程序将执行权传递给另一个线程。这是 Ruby 文档提供的示例：

<div class="code-file clearfix"><span>pass0.rb</span></div>

	a = Thread.new { print "a"; Thread.pass;
					 print "b"; Thread.pass;
					 print "c" }

	b = Thread.new { print "x"; Thread.pass;
					 print "y"; Thread.pass;
					 print "z" }

	a.join
	b.join

根据文档，此代码在运行时会生成以下输出：

	axbycz

是的，确实如此。理论上，这似乎表明，通过在每次调用 `print` 之后调用 `Thread.pass`，这些线程将执行权传递给另一个线程，这就是两个线程的输出交替的原因。

出于我心中的疑问，我想知道 `Thread.pass` 的调用被删除后会产生什么影响？第一个线程是否会一直占用，只有在结束后才让步于第二个线程？找出答案的最佳方法是尝试：

<div class="code-file clearfix"><span>pass1.rb</span></div>

	a = Thread.new { print "a";
					 print "b";
					 print "c" }

	b = Thread.new { print "x";
					 print "y";
					 print "z" }

	a.join
	b.join

如果我的理论是正确的（该线程将一直占用，直到它完成），这将是预期的输出：

	abcdef

事实上，（令我惊讶的是！），实际产生的输出是：

	axbycz

换句话说，无论是否调用 `Thread.pass`，结果都是相同的。那么，`Thread.pass` 做什么呢？其宣称 `pass`方法，调用线程调度程序将执行权传递给另一个线程，该文档是错误的吗？

在一个短暂而愤怒的时刻，我承认我轻率的认为有一种可能性，文档是不正确的，并且 `Thread.pass` 根本没有做任何事情。深入研究 Ruby 的 C 语言源代码很快消除了我的疑虑；`Thread.pass` 确实做了一些事情，但它的行为并不像 Ruby 文档暗示的那样可预测。在解释原因之前，让我们尝试一下我自己的示例：

<div class="code-file clearfix"><span>pass2.rb</span></div>

	s = 'start '
	a = Thread.new { (1..10).each{
	    s << 'a'
	    Thread.pass
	  }
	}

	b = Thread.new { (1..10).each{
		s << 'b'
		Thread.pass
	  }
	}

	a.join
	b.join
	puts( "#{s} end" )

乍一看，这可能看起来与前面的示例非常相似。它设置两个线程运行，但不是反复打印东西出来，而是重复地将一个字符附加到字符串中 - 'a' 由线程 `a` 添加，'b' 由线程 `b` 添加。每次操作后，`Thread.pass` 将执行权传递给另一个线程。最后显示整个字符串。字符串包含 'a' 和 'b' 的交替序列应该不足为奇：

	abababababababababab

现在，请记住，在上一个程序中，即使我删除了对 `Thread.pass` 的调用，我也获得了完全相同的交替输出。基于这种经历，如果我在这个程序中删除 `Thread.pass`，我想我应该期望得到类似的结果。我们来试试吧：

<div class="code-file clearfix"><span>pass3.rb</span></div>

	s = 'start '
	a = Thread.new { (1..10).each{
	    s << 'a'
	  }
	}

	b = Thread.new { (1..10).each{
		s << 'b'
	  }
	}

	a.join
	b.join
	puts( "#{s} end" )

这次，输出如下：

	aaaaaaaaaabbbbbbbbbb

换句话说，这个程序显示了我最初在第一个程序中预料的那种不同的行为（我从 Ruby 的嵌入式文档中复制出来的那个）- 也就是说当两个线程在它们自己的时间片下运行时，第一个线程，`a`，抢占所有时间为它自己所用，只有当它完成时第二个线程 `b` 才会得到关注。但是通过显式添加对 `Thread.pass` 的调用，我们可以强制每个线程将执行权传递给任何其它线程。

那么我们如何解释这种行为上的差异呢？从本质上讲，**pass0.rb** 和 **pass3.rb** 正在做同样的事情 - 运行两个线程并显示每个线程的字符串。唯一真正的区别在于，在 **pass3.rb** 中，字符串在线程内连接而不是打印。这可能看起来不是什么大不了的事，但事实证明，打印字符串比连接字符串需要更多的时间。实际上，`print` 调用会引入时间延迟。正如我们之前发现的那样（当我们有意使用 `sleep` 引入延迟时），时间延迟对线程产生了深远的影响。

如果你仍然不相信，请尝试我重写的 **pass0.rb** 版本，我创造性地命名为 **pass0_new.rb**。这只是用连接替换了打印。现在，如果你对 `Thread.pass` 的调用进行注释和取消注释，你确实会看到不同的结果。

<div class="code-file clearfix"><span>pass0_new.rb</span></div>

	s = ""
	a = Thread.new { s << "a"; Thread.pass;
	  s << "b"; Thread.pass;
	  s << "c" }

	b = Thread.new { s << "x"; Thread.pass;
	  s << "y"; Thread.pass;
	  s << "z" }

	a.join
	b.join
	puts( s )

顺便说一句，我的测试是在运行 Windows 的 PC 上进行的。很可能在其它操作系统上会看到不同的结果。这是因为控制分配给线程的时间量的 Ruby 调度程序的实现在 Windows 和其它操作系统上是不同的。在 Unix 上，调度程序每 10 毫秒运行一次，但在 Windows 上，通过在某些操作发生时递减计数器来控制时间共享，因此精确的间隔是不确定的。

作为最后一个示例，你可能需要查看 **pass4.rb** 程序。这会创建两个线程并立即挂起它们（`Thread.stop`）。在每个线程的主体中，线程的信息（包括其 `object_id`）被附加到数组 `arr`，然后调用 `Thread.pass`。最后，运行并连接两个线程，并显示数组 `arr`。尝试通过取消注释 `Thread.pass` 来验证其效果（密切注意其 `object_id` 标识符指示的线程的执行顺序）：

<div class="code-file clearfix"><span>pass4.rb</span></div>

	arr = []
	t1 = Thread.new{
	  Thread.stop
	  (1..10).each{
		arr << Thread.current.to_s
		Thread.pass
	  }
	}
	t2 = Thread.new{
	  Thread.stop
	  (1..10).each{ |i|
		arr << Thread.current.to_s
		Thread.pass
	  }
	}
	puts( "Starting threads..." )
	t1.run
	t2.run
	t1.join
	t2.join
	puts( arr )