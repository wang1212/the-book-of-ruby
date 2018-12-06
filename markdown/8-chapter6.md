---

	{
		"title": "第六章",
		"ctime": "2016-11-23 21:20:00",
		"mtime": "2016-11-23 21:20:00"
	}

---

# 第六章

***

## 条件语句

计算机程序，如生活本身，充满了等待要做的困难决定。如果我待在床上，可以多睡一会，但我不得不去上班；如果我去上班我会赚到一些钱，否则我将丢掉工作 - 等等...

我们在之前的程序中执行了一些 `if` 测试。举一个简单的例子，这是来自第一章的税收计算器：

	if (subtotal < 0.0) then
	  subtotal = 0.0
	end

在此程序中，将会提示用户输入一个值 `subtotal`，它将被用来计算应缴税额。如果用户错误的输入一个小于 0 的值，`if` 测试会发现这一点，因为测试 `(subtotal < 0.0)` 的计算结果为 true，这将会导致位于 `if` 测试语句和 `end` 关键字之间的代码被执行，这里将会把 `subtotal` 置为 0。

<div class="note">
	<p class="h4"><b>等号（=）与双等号（==）？</b></p>

与许多其它编程语言一样，Ruby 使用一个等号 `=` 来赋值，用两个等号 `==` 来测试值。
</div>

### If..Then..Else

<div class="code-file clearfix"><span>if_else.rb</span></div>

像这样的简单测试只会是两个可能的结果之一。要么运行一部分代码，要么不运行，取决于测试结果是否为 true。通常，你会需要有两种以上可能的结果。例如，假设你的程序在这一天为工作日时执行一种程序行为，如果是周末则执行不同的程序行为。你可以在 `if` 部分之后添加 `else` 部分来测试这些条件，如下所示：

	if aDay == 'Saturday' or aDay == 'Sunday'
	  daytype = 'weekend'
	else
	  daytype = 'weekday'
	end

这里的 `if` 条件很简单。它测试了两种可能性：1）变量 `aDay` 的值等于字符串 "Saturday"，或 2）等于字符串 "Sunday"。如果其中任何一个条件为真，则执行下一行代码：`daytype ='weekend'`; 在所有其它情况下，`else` 之后的代码将执行：`daytype ='weekday'`。


<div class="code-file clearfix"><span>if_then.rb</span></div>

<div class="note">
如果 <code>if</code> 测试和要执行的代码在不同行，关键字 <code>then</code> 是可选的。但是，当测试语句和要执行代码在同一行时，关键字 <code>then</code>（或者你喜欢更简洁的代码，一个冒号）是必要的：

	if x == 1 then puts( 'ok' ) end # with 'then'

	if x == 1 : puts( 'ok' ) end    # with colon

	if x == 1 puts( 'ok' ) end      # syntax error!
</div>

`if` 测试不仅限于两个条件的判断。例如，假设你的代码需要确定某一天是工作日还是节假日。所有的周内每一天都为工作日，所有的星期六都是假期，但周末只有你不加班时才是假期。这是我第一次尝试编写测试来判断所有的这些条件：

<div class="code-file clearfix"><span>and_or_wrong.rb</span></div>

	working_overtime = true

	if aDay == 'Saturday' or aDay == 'Sunday' and not working_overtime
	  daytype = 'holiday'
	  puts( "Hurrah!" )
	else
	  daytype = 'working day'
	end

不幸的是，这并没有达到预期的效果。请记住，星期六总是一天假期。但是，这段代码却认定星期六是工作日。这是因为 Ruby 接收的测试为：“如果这一天是星期六并且我不加班，或者这一天是周末并且我不加班”，但我真正的意思是：“如果这一天是星期六，或者这一天是周末并且我不加班”。解决这种歧义的最简单方法是在任意代码周围加上括号使其作为单个单元进行判断，如下所示：

<div class="code-file clearfix"><span>and_or.rb</span></div>

	if aDay == 'Saturday' or (aDay == 'Sunday' and not working_overtime)

### And..Or..Not

顺便说一下，Ruby 有两种不同的语法来测试布尔值（true/false）条件。在上面的示例中，我使用了英文风格的运算符：`and`，`or` 以及 `not`。如果你愿意，你可以使用类似其它语言中的一种替代运算符：`&&`（and）、`||`（or）以及 `!`（not）。

但是要小心，这两组运算符不是完全可以互换的。首先，它们具有不同的优先级，这意味着当在单个测试中使用多个运算符时，将会根据你使用的运算符以不同的顺序执行测试的各个部分。例如，看看这个测试：

<div class="code-file clearfix"><span>days.rb</span></div>

	if aDay == 'Saturday' or aDay == 'Sunday' and not working_overtime
	  daytype = 'holiday'
	end

假设布尔变量 `working_overtime` 为 true，如果变量 `aDay` 用字符串 'Saturday' 初始化，那么这个测试会成功吗？换句话说，如果 `aDay` 是 'Saturday'，`daytype` 会被赋值为 'holiday' 吗？答案是：不，它不会。测试将只会在 `aDay` 是 'Saturday' 或 'Sunday'，并且 `working_overtime` 不为 true 时成功。

思考下面这个测试：

	if aDay == 'Saturday' || aDay == 'Sunday' && !working_overtime
	  daytype = 'holiday'
	end

从表面上看，这与上一次测试相同; 唯一的区别是这次我使用了运算符的替代语法。然而，这个变化不仅仅是表面的，因为如果 `aDay` 是 'Saturday'，那么这个测试执行结果为 true，而 `daytype` 则会初始化为 'holiday'。这是因为 `||` 运算符的优先级高于 `or` 运算符。所以这个测试会在 `aDay` 是 'Saturday' ，或者不仅 `aDay` 是 'Sunday' 还要 `working_overtime` 不为 true 时成功。

有关详细信息，请参阅本章末尾的**深入挖掘**部分。作为一般原则，你最好决定你喜欢哪组运算符，坚持使用它们并使用括号来避免产生歧义。

### If..Elsif

毫无疑问，你总会遇到需要根据几种替代条件来采取不同的行为。这样做的一种实现方式是通过判断一个 `if` 测试，然后在关键字 `elsif` 之后再放置一系列其它测试条件。然后必须使用 `end` 关键字终止。

例如，这里我通过在 `while` 循环中反复获取用户输入信息，`if` 测试来判断用户是否输入了 'q'（我已经用 `chomp()` 方法从输入中删除了回车符）；如果输入的不是 'q' 则第一个 `elsif` 测试判断输入的整数值（`input.to_i`）是否大于 800；该测试失败后，下一个 `elsif` 测试判断整数值是否小于等于 800：

<div class="code-file clearfix"><span>if_elsif.rb</span></div>

	while input != 'q' do
	  puts("Enter a number between 1 and 1000 (or 'q' to quit)")
	  print("?- ")
	  input = gets().chomp()

	  if input == 'q'
	    puts( "Bye" )
	  elsif input.to_i > 800
		puts( "That's a high rate of pay!" )
	  elsif input.to_i <= 800
		puts( "We can afford that" )
	  end
	end

这个程序的问题在于，即使它要求用户输入一个 1 到 1000 的值，它也可能会接收到一个小于 1（当然，你如果想要一份负数的薪水，我很乐意为你提供一份工作！）或者大于 1000（在这种情况下，不要找我找工作！）的值。

我们可以通过重写两个 `elsif` 测试并添加一个 `else` 部分，如果所有前面的测试都失败则执行该部分，来解决这个问题：

<div class="code-file clearfix"><span>if_elsif2.rb</span></div>

	if input == 'q'
	  puts( "Bye" )
	elsif input.to_i > 800 && input.to_i <= 1000
	  puts( "That's a high rate of pay!" )
	elsif input.to_i <= 800 && input.to_i > 0
	  puts( "We can afford that" )
	else
	  puts( "I said: Enter a number between 1 and 1000!" )
	end

<div class="code-file clearfix"><span>if_else_alt.rb</span></div>

<div class="note">
Ruby 也有一种 <code>if..then..else</code> 的简写方式，用 <code>?</code> 替换掉 <code>if..then</code> 部分，并用一个 <code>:</code> 当作 <code>else</code> ...

&lt;Test Condition&gt; `?` &lt;if true do this&gt; `:` &lt;else do this&gt;

例如：

	x == 10 ? puts("it's 10") : puts( "it's some other number" )

当测试条件复杂时（如果使用多个 `and` 和 `or`），则应将其括在括号中。如果测试和代码跨越几行， `?` 必须与前一个条件放在同一行，并且 `:` 必须与紧跟在 `?` 之后的代码放在同一行。换句话说，如果你在 `?` 或者 `:` 之前添加换行符，你将得到一个语法错误。 这是正确的多行代码块的示例：

	(aDay == 'Saturday' or aDay == 'Sunday') ?
	daytype = 'weekend' :
	daytype = 'weekday
</div>

<div class="code-file clearfix"><span>days2.rb</span></div>

这有另一个示例，一个长的 `if..elsif` 序列，并且有 `else` 部分处理其它所有情况。这次的测试值 `i` 是一个整数：

	def showDay( i )
	  if i == 1 then puts("It's Monday" )
	  elsif i == 2 then puts("It's Tuesday" )
	  elsif i == 3 then puts("It's Wednesday" )
	  elsif i == 4 then puts("It's Thursday" )
	  elsif i == 5 then puts("It's Friday" )
	  elsif (6..7) === i then puts( "Yippee! It's the weekend! " )
	  else puts( "That's not a real day!" )
	  end
	end

请注意，我使用范围（range） `(6..7)` 来匹配代表星期六和星期天的两个整数值。这里的 `===` 方法（三个 `=` 字符）测试一个值（这里是 `i`）是否在范围（range）中。上面的示例：

	(6..7) === i

...可以重写为：

	(6..7).include?(i)

`===` 方法由 Object 类定义，并在后代类中重写。它的行为因所属类而异。我们将很快看到，它的一个基本用途是为测试语句提供有意义的判断。

### Unless

<div class="code-file clearfix"><span>unless.rb</span></div>

Ruby 也可以执行 `unless` 测试，这与 `if` 测试完全相反：

	unless aDay == 'Saturday' or aDay == 'Sunday'
	  daytype = 'weekday'
	else
	  daytype = 'weekend'
	end

`unless` 是表达 'if not' 的一种替代方式。下面的代码与上面示例等同：

	if !(aDay == 'Saturday' or aDay == 'Sunday')
	  daytype = 'weekday'
	else
	  daytype = 'weekend'
	end

### If 与 Unless 修饰符

你可能还记得第 5 章中提到的 `while` 循环的替代语法。替换这样的写法：

	while tired do sleep end

...我们可以这样写：

	sleep while tired

这种将 `while` 关键字放在循环代码和测试条件之间的替代语法称为 'while 修饰符'（while modifier）。事实上，Ruby 也提供了 `if` 和 `unless` 修饰符。这是一些示例：

<div class="code-file clearfix"><span>if_unless_mod.rb</span></div>

	sleep if tired

	begin
	  sleep
	  snore
	end if tired

	sleep unless not tired

	begin
	  sleep
	  snore
	end unless not tired

当你在某些测试条件为 true 时要重复执行一些明确的操作时，这种简洁的语法是很有用的。例如，在常量 `DEBUG` 为 true 时你的代码可能需要输出一些调试信息。

	puts( "somevar = #{somevar}" ) if DEBUG

<div class="code-file clearfix"><span>constants.rb</span></div>

<div class="note">
	<p class="h4"><b>常量（Constants）</b></p>

Ruby 中的常量以大写字母开头。 类名就是常量。你可以使用 `constants` 方法获取所有已定义常量的列表：

	Object.constants

Ruby 提供了 `const_get` 和 `const_set` 方法来获取和设置特定的以符号命名的常量的值（标识符前面带有冒号，如 `:RUBY_VERSION`）。

请注意，与许多其它编程语言中的常量不同，Ruby 中的常量可以为其分配新的值：

	RUBY_VERSION = "1.8.7"
	RUBY_VERSION = "2.5.6"

上面给 `RUBY_VERSION` 常量重新赋值会产生一个 '已初始化的常量'（already initialized constant）的警告（warning）- 但不是错误（error）！
</div>

### Case 语句

当你需要根据单个变量的值采取各种不同的操作时，多个 `if..elsif` 测试是冗长且重复的。

`case` 语句提供了更简洁的替代方案。以单词 `case` 开始，后跟要测试的变量名称。然后是一系列 `when` 片段，每一片段都指定一个“触发值”（trigger），后跟要执行的代码。

仅当测试变量等于触发（trigger）值时，此代码才会执行：

<div class="code-file clearfix"><span>case.rb</span></div>

	case( i )
	  when 1 : puts("It's Monday" )
	  when 2 : puts("It's Tuesday" )
	  when 3 : puts("It's Wednesday" )
	  when 4 : puts("It's Thursday" )
	  when 5 : puts("It's Friday" )
	  when (6..7) : puts( "Yippee! It's the weekend! " )
	  else puts( "That's not a real day!" )
	end

在上面的示例中，我使用冒号将每个 `when` 测试与要执行的代码分隔开。与类 C 语言中的 `case` 语句不同，当匹配到一个片段时，不需要输入一个 `break` 关键字来防止继续进入后面其余的片段中匹配。在 Ruby 中，一旦匹配到，`case` 语句就会结束：

	case( i )
	  when 5 : puts("It's Friday" )
		puts("...nearly the weekend!")
	  when 6 : puts("It's Saturday!" )
		# the following never executes
	  when 5 : puts( "It's Friday all over again!" )
	end

你可以在一个 `when` 测试中包含多行代码，你也可以包含多个用逗号分割的值来触发同一个 when 代码块，像这样：

	when 6, 7 : puts( "Yippee! It's the weekend! " )

<div class="code-file clearfix"><span>case2.rb</span></div>

`case` 语句中的条件不一定是一个简单的变量; 它也可以是这样的表达式：

	case( i + 1 )

你还可以使用非整数（non-integer）类型，例如字符串（string）。如果在一个 `when` 片段中指定了多个触发值，则它们可能具有不同的类型 - 例如，包含字符串和整数：

	when 1, 'Monday', 'Mon' : puts( "Yup, '#{i}' is Monday" )

这是一个较长的例子，说明了上面提到的一些语法元素：

<div class="code-file clearfix"><span>case3.rb</span></div>

	case( i )
	  when 1 : puts("It's Monday" )
	  when 2 : puts("It's Tuesday" )
	  when 3 : puts("It's Wednesday" )
	  when 4 : puts("It's Thursday" )
	  when 5 then puts("It's Friday" )
		puts("...nearly the weekend!")
	  when 6, 7
		puts("It's Saturday!" ) if i == 6
		puts("It's Sunday!" ) if i == 7
		puts( "Yippee! It's the weekend! " )
	  # the following never executes
	  when 5 : puts( "It's Friday all over again!" )
	  else puts( "That's not a real day!" )
	end

### === 方法

如前所述，`case` 语句中的 `when` 测试的对象使用 `===` 方法判断。因此，例如当整数（integer）作为范围（range）的一个组成部分时，`===` 方法返回 true；当 case 语句中的整型变量构成范围表达式的一部分时，`when` 测试返回 true：

	when (6..7) : puts( "Yippee! It's the weekend! " )

如果对特定对象的 `===` 方法的作用有疑问，请参阅该对象所属类的 Ruby 文档。

### 其它的 Case 语法

`case` 语句有一种其它的形式，就像一系列 `if..then..else` 语句的简写形式。每个 `when` 部分都可以执行一些任意测试并执行一行或多行代码。`case` 变量不是必要的。每个 `when` 片段都会返回一个值，就像方法（method）一样，它是最后一段代码的结果。可以将此值分配给 `case` 语句之前的变量：

<div class="code-file clearfix"><span>case4.rb</span></div>

	salary = 2000000
	season = 'summer'
	happy = case
	when salary > 10000 && season == 'summer':
	puts( "Yes, I really am happy!" )
	'Very happy' #=> This value is "returned"
	when salary > 500000 && season == 'spring' : 'Pretty happy'
	else puts( 'miserable' )
	end
	puts( happy ) #=> "Very happy"

## 深入探索

### 布尔（Boolean）测试

	and &&

这些运算符只有在判断左侧结果为 true 时，会继续判断右侧，`and` 的优先级比 `&&` 低。

	or ||

这些运算符只有在判断左侧结果为 false 时，会继续判断右侧，`or` 的优先级比 `||` 低。

	not !

布尔值的否操作，即值为 false 时返回 true，值为 true 时返回 false。

使用两种不同的布尔运算符时要小心。由于优先级的差异，测试将以不同的顺序进行判断，并可能产生不同的结果。

思考以下代码：

<div class="code-file clearfix"><span>boolean_ops.rb</span></div>

	# Example 1
	if (1==3) and (2==1) || (3==3) then
	  puts('true')
	else
	  puts('false')
	end

	# Example 2
	if (1==3) and (2==1) or (3==3) then
	  puts('true')
	else
	  puts('false')
	end

这些看起来可能是一样的。实际上，示例 1 将打印 'false' ，而示例 2 将打印 true。这完全是因为 `or` 比 `||` 优先级低的事实。因此，示例 1 中的测试是：如果 1 等于 3 [*false*] 并且（要么 2 等于 1 ，要么 3 等于 3）[*true*]。由于这两个必要的条件中有一个是 false，所以整个测试返回 false。

现在来看示例 2，其测试是：（如果 1 等于 3 ，并且 2 等于 1）[*false*]，或者 3 等于 3 [*true*]。这次，我们仅需要两个测试中一个成功即可；第二个测试判断为 true，所以整个测试返回 true 。

在这样的测试中，运算符优先级的副作用可能会导致非常模糊的错误。你可以通过使用括号来清楚的表达测试的含义来避免这些错误。在这里，我重写了上面的示例 1 和 2；在每种情况下，添加一对括号都会反转测试返回的布尔值：

	# Example 1 (b) – now returns true
	if ((1==3) and (2==1)) || (3==3) then
	  puts('true')
	else
	  puts('false')
	end

	# Example 2 (b) – now returns false
	if (1==3) and ((2==1) or (3==3)) then
	  puts('true')
	else
	  puts('false')
	end

### 否定

否定运算符 `!` 可以在表达式的开头使用，或者你可以在一个表达的左侧和右侧中间使用 `!=`（不等于）运算符：

	!(1==1)  #=> false
	1 != 1   #=> false

或者，你可以用 `not` 代替 `!`：

	not(1==1)

### 布尔运算中的怪象

<div class="code-file clearfix"><span>eccentricities.rb</span></div>

请注意，Ruby 的布尔（boolean）运算符有时会以一种奇怪且不可预测的方式运行。例如：

	puts( (not( 1==1 )) )            # This is ok
	puts( not( 1==1 ) )              # This is a syntax error

	puts( true && true && !(true) )  # This is ok
	puts( true && true and !(true) ) # This is a syntax error

	puts( ((true) and (true)) )      # This is ok
	puts( true && true )             # This is ok
	puts( true and true )            # This is a syntax error

在多数情况下，可以通过统一使用同一类型的运算符（要么用 `and`，`or`，`not`，要么用 `&&`，`||`，`!`）来避免这些问题，而不是混合地使用两者。另外，推荐经常使用括号。

### Catch 与 Throw

Ruby 提供了一对方法 `catch` 和 `throw`，可用于在满足某些条件时中断（break）代码块的执行。这是 Ruby 中与其它一些编程语言中的 `goto` 最接近的等价语法。该代码块必须以 `catch` 后跟一个符号（symbol）（即以冒号开头的唯一标识符）开头，例如 `:done` 或 `:finished`。代码块本身可以用大括号限定，也可以用关键字 `do` 和 `end` 限定，如下所示：

	# think of this as a block called :done
	catch(:done){
	  # some code here
	}

	# and this is a block called :finished
	catch(:finished) do
	  # some code here
	end

在块内，你可以使用一个符号（symbol）作为参数调用 `throw`。通常，当满足某些特定条件时，你将可以调用 `throw` 来跳过块中的所有剩余的未执行代码。例如，让我们假设该块包含这样一些代码，提示用户输入一个数字，用某个值来除以该数字，然后继续对结果进行大量其它的复杂计算。显然，如果用户输入 0，则后面的计算都不能完成，因此你可以通过跳出块来跳过这些计算，并继续执行块后的任何代码。这是这样做的一种方式：

<div class="code-file clearfix"><span>catch_throw.rb</span></div>

	catch(:finished) do
	  print('Enter a number: ')
	  num = gets().chomp.to_i
	  if num == 0 then
	    throw :finished # if num is 0, jump out of the block
	  end
	    # Here there may be hundreds of lines of
	    # calculations based on the value of num
	    # if num is 0 this code will be skipped
	end

	# the throw method causes execution to
	# jump to here – outside of the block
	puts("Finished")

实际上，你可以在块外面调用 `throw`，像这样:

	def dothings( aNum )
	  i = 0
	  while true
		puts("I'm doing things...")
		i += 1
		throw(:go_for_tea) if (i == aNum)
			# throws to end of go_to_tea block
	  end
	end

	catch(:go_for_tea) { # this is the :go_to_tea block
	  dothings(5)
	}

并且你可以将 `catch` 块嵌套在其它的 `catch` 块中，像这样：

	catch(:finished) do
	  print('Enter a number: ')
	  num = gets().chomp.to_i
	  if num == 0 then throw :finished end
	  puts( 100 / num )

	  catch(:go_for_tea) {
		dothings(5)
	  }

	  puts("Things have all been done. Time for tea!")
	end

与其它编程语言中的 `gotos` 和 jumps 一样，在 Ruby 应该非常谨慎地使用 `catch` 和 `throw`，因为它们会破坏代码的逻辑，并且可能会引入难以发现的错误。