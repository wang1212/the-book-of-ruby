---

	{
		"title": "第十八章",
		"ctime": "2018-12-31 13:30:00",
		"mtime": "2018-12-31 13:30:00"
	}

---

# 第十八章

***

## 调试与测试

任何实际应用程序的开发都是逐步进行的。我们大多数人宁愿采取更多的步骤向前推进而不是向后返工。为了最大限度地减少由编码错误或不可预见的副作用引起的后向返工的步骤，我们可以利用测试（testing）和调试（debugging）技术。本章旨在简要概述 Ruby 程序员可用的一些最有用的调试工具。但请记住，如果你使用专用的 Ruby IDE（如 Ruby in Steel），你将拥有更强大的可视化调试工具。我将在本章仅讨论 Ruby 可用的“标准”（standard）工具。我不会讨论 IDE 提供的工具。

### IRB - 交互式 Ruby

有时候你只想用 Ruby “试试某些东西”。标准的 Ruby 解释器 **Ruby.exe** 远非用于此目的理想工具。虽然可以从命令提示符运行 Ruby，并一次输入一行代码，但只有在输入文件结束符（Windows 上为 <kbd>CTRL+Z</kbd>，其它操作系统时为 <kbd>CTRL+D</kbd>）时才会执行代码。要获得与 Ruby 交互的更好方法，请使用 Interactive Ruby shell，**IRB.exe**。要开始使用这个，请转到命令提示符并输入：

	irb

你现在应该看到类似于以下内容的提示：

	irb(main):001:0>

现在开始输入一些 Ruby 代码。你可以在多行上输入表达式；表达式完成后，**irb** 将对其进行计算并显示结果。尝试以下（在 `+` 后按 <kbd>Enter</kbd> 键）：

	x = ( 10 +
	( 2 * 4 ) )

在闭合括号后按 <kbd>Enter</kbd> 键时，**irb** 将计算表达式并显示结果：

	=> 18

你现在可以计算 `x`。输入：

	x

**irb** 显示：

	=> 18

但要小心。尝试输入：

	x = (10
	+ (2*4))

这次的结果是：

	=> 8

事实上，这是正常的 Ruby 行为。这可以通过以下事实来解释：换行符作为终止符，而 `+` 运算符在开始新行时充当一元运算符（它只是声明后面的表达式为正）。你将在本章末尾的*深入探索*中找到更全面的解释。现在，请注意，当一次输入一行时，换行符的位置很重要！使用 **irb** 时，你可以判断解释器是否认为你已结束输入语句。如果你这样做，则显示以 `">"` 结尾的普通提示：

	irb(main):013:1>

如果语句不完整，则提示以星号结束：

	irb(main):013:1*

在上面的两个示例中，当你输入没有加号的第一行时会显示 `>` 提示符：

	x = ( 10

但是当你使用加号输入时会显示 `*` 提示符：

	x = ( 10 +

前一种情况表明，**irb** 认为该语句是完整的；后一种情况表明它正在等待语句被完成。

如果你希望，可以将 Ruby 程序加载到 **irb** 中，方法是将程序名称传递给它：

	irb myprogram.rb

你也可以使用各种选项调用它，如下一页所示：

	Usage: irb.rb [options] [programfile] [arguments]

| 选项 | 解释说明 |
| ------ | ------ |
| -f | 禁止阅读 ~/.irbrc |
| -m | Bc 模式（加载可用的 mathn，fraction 或 matrix） |
| -d | 将 $DEBUG 设置为 true（与 `ruby -d' 相同） |
| -r load-module | 与 `ruby -r' 相同 |
| -I path | 指定 $LOAD_PATH 目录 |
| --inspect | 使用 `inspect' 作为输出（默认除了 bc 模式） |
| --noinspect | 不使用 inspect 输出 |
| --readline | 使用 Readline 扩展模块 |
| --noreadline | 不使用 Readline 扩展模块 |
| --prompt | 提示模式，prompt-mode |
| --prompt-mode | prompt-mode 切换提示模式（prompt mode）。预定义的提示模式是“默认”，“简单”，“xmp” 和 “inf-ruby” 的 |
| --inf-ruby-mode | 在 emacs 上使用适合 inf-ruby-mode 的提示符。 禁止 --readline |
| --simple-prompt | 简单的提示模式 |
| --noprompt | 没有提示模式 |
| --tracer | 显示每次执行命令的轨迹 |
| --back-trace-limit | 显示回溯顶部 n 个和尾部 n 个。默认值价值是 16。 |
| --irb_debug n | 将内部调试级别设置为 n（不适合常用） |
| -v, --version | 打印 irb 的版本 |

你可以通过在命令行输入以下内容来查看这些选项的列表：

	irb --help

你可以通过在提示符处输入单词 `quit` 或按 <kbd>CTRL+BREAK</kbd> 结束 **irb** 会话。

虽然 **irb** 可能对尝试某些代码很有用，但它并不提供调试程序所需的所有功能。但是，Ruby 提供了一个命令行调试器。

### 调试

默认的 Ruby 调试器允许你在程序执行时设置断点和监视点并计算变量。要在调试器中运行程序，请在启动 Ruby 解释器时使用 `-r debug` 选项（其中 `-r` 表示 'require'，`debug` 是调试库的名称）。例如，这是调试一个名为 **debug_test.rb** 的程序的方法：

	ruby –r debug debug_test.rb

<div class="note">
	<p class="h4"><b>Ubygems？什么是 Ubygems ...？</b></p>

在某些情况下，如果运行上述命令，你可能会看到类似于以下令人费解的消息：

	c:/ruby/lib/ruby/site_ruby/1.8/ubygems.rb:4:require 'rubygems'

当你开始调试时，你会发现自己试图调试文件 **'ubygems.rb'** 而不是你的程序！这似乎是一个困扰使用一键安装程序安装 Ruby 的 Windows 用户的主要问题：(http://rubyforge.org/projects/rubyinstaller/)

此安装程序设置环境变量 `RUBYOPT=-rubygems`。在大多数情况下，这具有允许 Ruby 程序使用 ruby gems “打包系统”来安装 Ruby 库的理想效果。但是，当你尝试使用 `-r` 选项时，会将其解释为 `-r ubygems`，这就是加载文件 **ubygems.rb** 的原因。Ruby 顺便（可能令人困惑？）提供了一个名为 **ubygems.rb** 的文件，它除了引入（requiring）**rubygems.rb** 之外什么都不做！有两种方法可以解决这个问题。你可以永久删除 `RUBYOPT`，也可以暂时禁用它。但是，如果你选择永久删除它，则以后使用 ruby gems 时可能会遇到副作用。要永久删除它，请加载“开始”菜单，（如果使用 XP 则为“设置”）“控制面板”；（如果使用 Vista，则为“系统和维护”）；单击系统（在 Vista 上，你现在应该单击“高级系统设置”）；在“系统属性”对话框中，选择“高级”选项卡；单击环境变量；在“系统变量”面板中，找到 `RUBYOPT` 并删除它。更安全的替代方法是在加载调试器之前在命令提示符处禁用该变量。为此，请输入：

	set RUBYOPT=

这将仅为此命令会话禁用 `RUBYOPT` 环境变量。你可以输入以下命令验证这一点：

	set RUBYOPT

你应该会看到以下消息：

	Environment variable RUBYOPT not defined

但是，打开另一个命令窗口并输入 `set RUBYOPT`，你将看到此处的环境变量保留其默认值。
</div>

一旦调试器启动后，你可以输入各种命令来逐步执行代码，设置断点以使执行暂停在特定行，设置监视以监视变量值等等。在下一页是可用的调试命令列表：

| 命令 | 解释说明 |
| ------ | ------ |
| b[reak] [file&#124;class:]&lt;line&#124;method&gt; | 在某个位置设置断点 |
| b[reak] [class.]&lt;line&#124;method&gt; | 在某个位置设置断点 |
| wat[ch] &lt;expression&gt; | 为某个表达方式设置监视点 |
| cat[ch] &lt;an Exception&gt; | 为异常设置捕获点 |
| b[reak] | 列出断点 |
| cat[ch] | 显示捕获点 |
| del[ete][ nnn] | 删除部分或全部断点 |
| disp[lay] &lt;expression&gt; | 将表达式添加到显示表达式列表 |
| undisp[lay][ nnn] | 删除一个特定或所有显示表达式 |
| c[ont] | 运行到结束或遇到断点 |
| s[tep][ nnn] | 前进（代码）1 行或 nnn 行 |
| n[ext][ nnn] | 跨越一行或直到 nnn 行 |
| w[here] | 显示帧 |
| f[rame] | where 别名 |
| l[ist][ (-&#124;nn-mm)] | 程序列表，- 向后列出给定行 nn-mm 的列表 |
| up[ nn] | 移到更大的帧 |
| down[ nn] | 移到更小的框帧 |
| fin[ish] | 回到外部帧 |
| tr[ace] (on&#124;off) | 设置当前线程为跟踪模式 |
| tr[ace] (on&#124;off) all | 设置所有线程为跟踪模式 |
| q[uit] | 退出调试器 |
| v[ar] g[lobal] | 显示全局变量 |
| v[ar] l[ocal] | 显示局部变量 |
| v[ar] i[nstance] &lt;object&gt; | 显示对象的实例变量 |
| v[ar] c[onst] &lt;object&gt; | 显示对象的常量 |
| m[ethod] i[nstance] &lt;obj&gt; | 显示对象的方法 |
| m[ethod] &lt;class&#124;module&gt; | 显示类或模块的实例方法 |
| th[read] l[ist] | 列出所有线程 |
| th[read] c[ur[rent]] | 列出当前线程 |
| th[read] [sw[itch]] &lt;nnn&gt; | 将线程上下文切换为 nnn |
| th[read] stop &lt;nnn&gt; | 停止线程 nnn |
| th[read] resume &lt;nnn&gt; | 恢复线程 nnn |
| p expression | 计算表达式并打印其值 |
| h[elp] | 打印帮助信息 |
| &lt;everything else&gt; | 执行计算 |

让我们看看如何在真正的调试会话中使用其中一些命令。打开系统提示符并导航到包含文件 **debug_test.rb** 的目录。输入以下命令启动调试器：

<div class="code-file clearfix"><span>debug_test.rb</span></div>

	ruby –r debug debug_test.rb

现在，让我们尝试一些命令。 在这些示例中，我写了 *[Enter]* 以显示你应该在每个命令后按 <kbd>Enter</kbd> 键。首先让我们看一下代码列表：

	l [Enter]

这显示了该程序的前几行。`l`（小写 "L"）或 `list` 命令列会出小块代码。实际行数将随调试代码而变化。列出更多：

	l [Enter]
	l [Enter]

或列出特定行数（此处字母 'l' 后跟数字 1，连字符和 100）：

	l 1-100 [Enter]

我们在第 78 行放一个断点（breakpoint）：

	b 78 [Enter]

Ruby 调试器应该回复：

	Set breakpoint 1 at debug_test.rb:78

我们也可能设置一个或多个监视点（watchpoints）。监视点可用于触发简单变量的中断（例如，当创建 `@t2` 对象时，输入 `wat @t2` 会中断）；或者它可以设置为匹配特定值（例如 `i == 10`）。在这里，我想设置一个在 `@t4` 的 `name` 属性为 "wombat" 时中断的监视点：

	wat @t4.name == "wombat" [Enter]

调试器应该确认这一点：

	Set watchpoint 2:@t4.name == "wombat"

请注意观察点编号为 2.如果你随后决定删除监视点，则需要该编号。好的，现在让我们继续执行：

	c [Enter]

程序将一直运行，直到它到达断点。你将看到类似于以下内容的消息：

	Breakpoint 1, toplevel at debug_test.rb:78
	debug_test.rb:78: puts( "Game start" )

这里显示了它停在的行号和该行的代码。让我们继续：

	c [Enter]

这次它在这里中断了：

	Watchpoint 2, toplevel at debug_test.rb:85
	debug_test.rb:85: @t5 = Treasure.new("ant", 2)

这是在成功计算监视点条件之后的行。通过列出指示的行号来查看：

	l 85

调试器高亮显示了一组行，在当前执行（86）：

	[80, 89] in debug_test.rb
	  80 # i) Treasures
	  81 @t1 = Treasure.new("A sword", 800)
	  82 @t4 = Treasure.new( "potto", 500 )
	  83 @t2 = Treasure.new("A dragon Horde", 550)
	  84 @t3 = Treasure.new("An Elvish Ring", 3000)
	  85 @t4 = Treasure.new("wombat", 10000)
	=> 86 @t5 = Treasure.new("ant", 2)
	  87 @t6 = Treasure.new("sproggit", 400)
	  88
	  89 # ii) Rooms

如你所见，第 85 行包含与监视点条件匹配的代码。请注意，在最初创建 `@t4` 的第 82 行之后，执行没有停止，因为那里没有满足监视点条件（它的 `name` 属性是 "potto"，而不是 "wombat"）。如果要在断点或监视点处暂停时查看变量的值，只需输入其名称即可。试试这个：

	@t4 [Enter]

调试器将显示：

	#<Treasure:0x315617c @value=10000, @name="wombat">

你可以同样输入要执行的其它表达式：

	@t1.value [Enter]
	10+4/2 [Enter]

现在删除监视点（回想一下它的编号是 2）：

	del 2 [Enter]

并继续，直到程序退出：

	c [Enter]

还有更多的命令可用于以这种方式调试程序，你可能想要尝试上表中显示的那些。你还可以通过输入 `help` 或 `h` 在调试会话期间查看命令列表：

	h [Enter]

要退出调试会话，请输入 `quit` 或 `q`：

	q [Enter]

虽然标准的 Ruby 调试器有其用途，但它不如使用集成开发环境提供的图形调试器简单或方便。而且，它很慢。在我看来，调试简单脚本很好，但不建议用于调试大型和复杂的程序。

### 单元测试

单元测试是一种后调试（post-debugging）测试技术，它允许你试运行程序的各个部分，以验证它们是否按预期工作。基本思想是你可以编写一些“断言”（assertions），说明某些行为应该获得某些结果。例如，你可能断言特定方法的返回值应为 100，或者它应该是布尔值（Boolean），或者它应该是特定类的实例。当测试运行时，如果断言被证明是正确的，即它通过了测试；如果不正确，则测试失败。

这是一个示例，如果对象 `t` 的 `getVal` 方法返回 100 以外的任何值，则会失败：

	assert_equal(100, t.getVal)

但是你不能只用这种断言来编写你的代码。测试有精确的规则。首先，你必须引入（require）**test/unit** 文件。然后，你需要从 TestCase 类派生一个测试类，该类位于 Unit 模块中，该模块本身则位于 Test 模块中：

	class MyTest < Test::Unit::TestCase

在这个类中，你可以编写一个或多个方法，每个方法构成一个包含一个或多个断言的测试。方法名称必须以 **test** 开头（因此名为 `test1` 或 `testMyProgram` 的方法都可以，但是名为 `myTestMethod` 的方法不行）。这是一个测试，包含 `TestClass.new(100).getVal` 的返回值为 1000 的单个断言：

	def test2
	  assert_equal(1000,TestClass.new(100).getVal)
	end

这里有一个完整的（虽然很简单）测试套件，我在其中定义了一个名为 MyTest 的 TestCase 类，它测试类 TestClass。在这里（有点想象力！），TestClass 可以用来代表我想要测试的整个程序：

<div class="code-file clearfix"><span>test1.rb</span></div>

	require 'test/unit'

	class TestClass
	  def initialize( aVal )
		@val = aVal * 10
	  end

	  def getVal
		return @val
	  end
	end

	class MyTest < Test::Unit::TestCase
	  def test1
		t = TestClass.new(10)
		assert_equal(100, t.getVal)
		assert_equal(101, t.getVal)
		assert(100 != t.getVal)
	  end

	  def test2
		assert_equal(1000,TestClass.new(100).getVal)
	  end
	end

此测试套件包含两个测试：`test1`（包含三个断言）和 `test2`（包含一个）。为了运行测试，你只需要运行该程序；你不必创建 MyClass 的实例。

你将看到结果报告，其中指出有两个测试，三个断言和一个失败。事实上，我做了四个断言。但是，在给定的测试中不会执行计算失败后的断言。在 `test1` 中，此断言失败：

	assert_equal(101, t.getVal)

失败后，下一个断言被跳过。如果我现在纠正这个（断言 100 而不是 101，那么下一个断言也将被测试：

	assert(100 != t.getVal)

这也失败了。这次报告指出已经执行计算了四个断言，其中一个失败。当然，在现实生活中，你应该设法写出正确的断言，当报告任何失败时，它应该是重写失败代码 - 而不是断言！

有关稍微复杂的测试示例，请参阅 **test2.rb** 程序（需要一个名为 buggy.rb 的文件）。这是一款小型冒险游戏，包括以下测试方法：

<div class="code-file clearfix"><span>test2.rb</span></div>

	def test1
	  @game.treasures.each{ |t|
	    assert(t.value < 2000, "FAIL: #{t} t.value = #{t.value}" )
	  }
	end

	def test2
	  assert_kind_of( TestMod::Adventure::Map, @game.map)
	  assert_kind_of( Array, @game.map)
	end

这里第一个方法对传递给块的对象数组执行断言测试，当 value 属性不小于 2000 时，它会失败。第二个方法使用 `assert_kind_of` 方法测试两个对象的类类型。当发现 `@game.map` 属于 `TestMod::Adventure::Map` 而不是被断言的 `Array` 时，此方法中的第二个测试会失败。

该代码还包含另外两个名为 `setup` 和 `teardown` 的方法。定义时，将在每个测试方法之前和之后运行具有这些名称的方法。换句话说，在 **test2.rb** 中，以下方法将按以下顺序运行：`setup`，`test1`，`teardown`，`setup`，`test2`，`teardown`。这使你有机会在运行每个测试之前将任何变量重新初始化为特定值，或者在这种情况下，重新创建对象以确保它们处于已知状态：

	def setup
	  @game = TestMod::Adventure.new
	end

	def teardown
	  @game.endgame
	end

## 深入探索

### 单元测试时可用的断言

	assert(boolean, message=nil)

断言 boolean 不是 false 或 nil。

	assert_block(message="assert_block failed.") {|| ...}

所有其它断言所依据的断言。如果块产生 true 则通过。

	assert_equal(expected, actual, message=nil)

如果 expected == +actual 为 true，则通过。

	assert_in_delta(expected_float, actual_float, delta, message="")

如果 expected_float 和 actual_float 在增量公差内相等，则通过。

	assert_instance_of(klass, object, message="")

如果 `object .instance_of? klass` 为 true，则通过。

	assert_kind_of(klass, object, message="")

如果 `object .kind_of? klass` 为 true，则通过。

	assert_match(pattern, string, message="")

如果 string =~ pattern，则通过。

	assert_nil(object, message="")

如果 object 为 nil，则通过。

	assert_no_match(regexp, string, message="")

如果 regexp !~ string，则通过。

	assert_not_equal(expected, actual, message="")

如果 expected != actual，则通过。

	assert_not_nil(object, message="")

如果 !object .nil?，则通过。

	assert_not_same(expected, actual, message="")

如果 !actual .equal? expected，则通过。

	assert_nothing_raised(*args) {|| ...}

如果块没有抛出异常，则通过。

	assert_nothing_thrown(message="", &proc)

如果块不抛出任何东西，则通过。

	assert_operator(object1, operator, object2, message="")

用 operator 比较 object1 与 object2。如果 object1.send(operator, object2) 为 true，则通过。

	assert_raise(*args) {|| ...}

如果块抛出给定的异常之一，则通过。

	assert_raises(*args, &block)

`assert_raise` 的别名。（在 Ruby 1.9 版本中弃用，在 2.0 版本中移除）。

	assert_respond_to(object, method, message="")

如果 object.respond_to? method 为 true，则通过。

	assert_same(expected, actual, message="")

如果 actual.equal? expected 为 true，则通过。（例如它们是同一个实例）。

	assert_send(send_array, message="")

如果方法 send 返回 true 值，则通过。

	assert_throws(expected_symbol, message="", &proc)

如果块抛出 expected_symbol，则通过。

	build_message(head, template=nil, *arguments)

构建失败消息。在模板之前添加 head，并且用参数将模板中的 '?' 位置替换。

	flunk(message="Flunked")

`flunk` 总是失败。

### 换行很重要

我之前说过，在交互式 Ruby 控制台（IRB）中输入换行符时需要注意，因为换行符的位置可能会改变 Ruby 代码的含义。例如，这个：

<div class="code-file clearfix"><span>linebreaks.rb</span></div>

	x = ( 10 +
	( 2 * 4 ) )

...将 `18` 分配给 `x`，但是这个：

	x = (10
	+ (2*4))

...将 `8` 指定给了 `x`。

这不是 IRB 的一个问题。这是 Ruby 代码的正常行为，即使在文本编辑器中并由 Ruby 解释器执行时也是如此。上面显示的第二个例子计算 `10`，发现它是一个完全可以接受的值，并迅速遗忘它；然后它计算 `+ (2*4)`，它也发现它是一个可接受的值（`8`），但它与前一个值（`10`）没有连接，因此返回 `8` 并分配给 `x`。

如果你想告诉 Ruby 来计算分割成多行的表达式并将其“联系在一起”（tie lines together），忽略换行符，你可以使用行连续符 `\`。这就是我在这里所做的：

	x = (10 \
	+ (2*4) )

这次，`x` 被赋值为 `18`。

### 图形化调试器

对于正式的调试，我强烈建议使用图形化调试器（graphical debugger）。例如，Ruby In Steel IDE 中的调试器允许你通过单击编辑器的边沿来设置断点和监视点。它允许你在单独的停靠窗口中监视所选“监视变量”（watch variables）或所有局部变量的值。它保留当前执行点所有方法调用的“调用栈”（callstack），并允许你通过调用栈“向后”导航以查看变量的变化值。它还具有完整的“向下钻取”变量扩展，允许您扩展数组和散列并查看“内部”复杂对象。它还可以完整的“向下探查”（drill-down）以展开变量，允许你扩展数组和散列并查看“内部”复杂对象。这些功能远远超出了标准 Ruby 调试器的功能。

<div class="text-center">
	<img src="./images/chapter18_debugger.png" />
	<p class="small"><i>The Ruby In Steel debugger</i></p>
</div>