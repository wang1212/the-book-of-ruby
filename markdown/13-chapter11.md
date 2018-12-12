---

	{
		"title": "第十一章",
		"ctime": "2018-12-11 01:10:00",
		"mtime": "2018-12-11 01:10:00"
	}

---

# 第十一章

***

## 符号（Symbols）

Ruby 的许多新人都被符号（symbols）弄糊涂了。符号（symbol）是一个标识符，其首个字符为冒号（:），所以 `:this` 是一个符号，`:that` 也是。事实上，符号并不复杂 - 在某些情况下，它们可能非常有用，我们很快就会看到。

让我们首先明确一个符号*不是*什么：它不是一个字符串，它不是一个常量，它也不是一个变量。简单地说，符号是除了自己的名称之外没有内在含义的标识符。而你可能会这样为变量赋值...

	name = "Fred"

你不能为符号赋值。名为 `:name` 的符号的值也为 `:name`。

<div class="note">

更多有关符号专门的说明，请参阅本章末尾的“深入探索”部分。
</div>

当然，我们之前使用过符号。例如，在第 2 章中，我们通过将符号传递给 `attr_reader` 和 `attr_writer` 方法来创建属性的读取器和修改器，如下所示：

	attr_reader( :description )
	attr_writer( :description )

你可能还记得上面的代码会使得 Ruby 创建一个 `@description` 实例变量以及一对名为 `description` 的 getter（reader）和 setter（writer）方法。Ruby 从字面量理解符号的值。它的值就是它的名字（`:description`）。`attr_reader` 和 `attr_writer` 方法会创建名称与该名称相匹配的变量和方法。

### 符号与字符串

一个常见的误解就是认为符号（symbol）是字符串的一种类型。毕竟，符号 `:hello` 与字符串 "hello" 非常相似不是吗？

事实上，符号与字符串完全不同。首先，每个字符串是不同的 — 因此，"hello"、"hello" 和 "hello" 是三个独立的对象，具有三个独立的 `object_id`s。

<div class="code-file clearfix"><span>symbol_ids.rb</span></div>

	puts( "hello".object_id ) # These 3 strings have 3 different object_ids
	puts( "hello".object_id )
	puts( "hello".object_id )

但是符号是唯一的，所以 `:hello`、`:hello` 和 `:hello` 都引用具有相同的 `object_id` 的对象。在这方面，符号与整数（integer）相比，要比字符串有更多的共同之处。你可能还记得，给定的整数值每次出现都引用相同的对象，因此 `10`、`10` 和 `10` 可以被认为是相同的对象，并且它们具有相同的 `object_id`：

<div class="code-file clearfix"><span>ints_and_symbols.rb</span></div>

	# These three symbols have the same object_id
	puts( :ten.object_id )
	puts( :ten.object_id )
	puts( :ten.object_id )

	# These three integers have the same object_id
	puts( 10.object_id )
	puts( 10.object_id )
	puts( 10.object_id )

或者你可以使用 `equal?` 方法测试其相等性：

<div class="code-file clearfix"><span>symbols_strings.rb</span></div>

	puts( :helloworld.equal?( :helloworld ) )    #=> true
	puts( "helloworld".equal?( "helloworld" ) )  #=> false
	puts( 1.equal?( 1 ) )                        #=> true

由于是唯一的，所以符号提供了明确的标识符。你可以将符号作为参数传递给方法，如下所示：

	amethod( :deletefiles )

方法可能包含测试传入参数的值的代码：

<div class="code-file clearfix"><span>symbols_1.rb</span></div>

	def amethod( doThis )
	  if (doThis == :deletefiles) then
		puts( 'Now deleting files...')
	  elsif (doThis == :formatdisk) then
		puts( 'Now formatting disk...')
	  else
		puts( "Sorry, command not understood." )
	  end
	end

符号还可用于提供字符串的可读性和整数的唯一性的 `case` 语句：

	case doThis
	  when :deletefiles : puts( 'Now deleting files...')
	  when :formatdisk : puts( 'Now formatting disk...')
	  else puts( "Sorry, command not understood." )
	end

声明符号的作用域不会影响其唯一性。思考以下...

<div class="code-file clearfix"><span>symbol_ref.rb</span></div>

	module One
	  class Fred
	  end
	  $f1 = :Fred
	end

	module Two
	  Fred = 1
	  $f2 = :Fred
	end

	def Fred()
	end

	$f3 = :Fred

这里，变量 `$f1`，`$f2` 和 `$f3` 在三个不同的作用域内分配了符号 `:Fred`：模块 One，模块 Two 和 'main' 作用域。我将在第 12 章中对模块（modules）进行更多说明。现在，只需将它们视为定义不同作用域的“命名空间”（namespaces）即可。然而每个变量引用着相同的符号 `:Fred`，并且具有相同的 `object_id`：

	# All three display the same id!
	puts( $f1.object_id )
	puts( $f2.object_id )
	puts( $f3.object_id )

即便如此，符号的“含义”（meaning）也会根据其作用域而变化。

换句话说，在模块 One 中，`:Fred` 引用类 `Fred`，在模块 Two 中，它引用常量 `Fred = 1`，在 main 作用域内引用 `Fred` 方法。

上一个程序的重写版本证实了这一点：

<div class="code-file clearfix"><span>symbol_ref2.rb</span></div>

	module One
	  class Fred
	  end
	  $f1 = :Fred
	  def self.evalFred( aSymbol )
		puts( eval( aSymbol.id2name ) )
	  end
	end

	module Two
	  Fred = 1
	  $f2 = :Fred
	  def self.evalFred( aSymbol )
		puts( eval( aSymbol.id2name ) )
	  end
	end

	def Fred()
	  puts( "hello from the Fred method" )
	end

	$f3 = :Fred

	One::evalFred( $f1 ) #=> displays the module::class name: One::Fred
	Two::evalFred( $f2 ) #=> displays the Fred constant value: 1
	method($f3).call 	 #=> calls Fred method: displays: "hello from the Fred method"

当然，由于变量 `$f1`，`$f2` 和 `$f3` 引用着相同的符号，因此你使用的变量是在任意地方指定的都是无关紧要的。以下产生完全相同的结果：

	One::evalFred( $f3 )
	Two::evalFred( $f1 )
	method($f2).call

### 符号和变量

<div class="code-file clearfix"><span>symbols_2.rb</span></div>

要了解符号（symbol）和标识符（例如变量名称）之间的关系，请查看我们的 **symbols_2.rb** 程序。首先将值 1 赋给局部变量 `x`。然后将符号 `:x` 赋给局部变量 `xsymbol`...

	x = 1
	xsymbol = :x

此时，变量 `x` 和符号 `:x` 之间没有明显的联系。我声明了一个方法，它只需要一些传入参数并使用 `p` 方法查看（inspects）和显示它。我可以使用变量和符号调用此方法：

	# Test 1
	amethod( x )
	amethod( :x )

这是该方法打印的数据结果：

	1
	:x

换句话说，`x` 变量的值是 1，因为那是分配给它的值，而 `:x` 的值是 `:x`。但是出现了有趣的问题：如果 `:x` 的值是 `:x` 并且这也是变量 `x` 的符号名称，是否可以使用符号 `:x` 来查找变量 `x` 的值？困惑？希望下一行代码能这些更清楚：

	# Test 2
	amethod( eval(:x.id2name))

这里，`id2name` 是 Symbol 类的一个方法。它返回与符号对应的名称或字符串（`to_s` 方法将执行相同的功能）；最终结果是，当给出符号 `:x` 作为参数时，`id2name` 返回字符串 "x"。Ruby 的 `eval` 方法（在 Kernel 类中定义）能够计算字符串中的表达式。在本例中，这意味着它找到字符串 "x" 并尝试将其作为可执行代码进行计算。它发现 `x` 是变量的名称，并且 `x` 的值是 1。所以值 1 传递给 `amethod`。你可以通过运行 **symbols2.rb** 和比较代码的输出结果来验证这一点。

<div class="note">

在第 20 章中更详细地解释了有关将数据作为代码来计算执行。
</div>

事情变得更加诡异。请记住，变量 `xsymbol` 已被赋予符号 `:x`...

	x = 1
	xsymbol = :x

这意味着如果我们 eval `:xsymbol`，我们可以获得分配给它的名称 - 即符号 `:x`。获得 `:x` 后我们可以继续计算它，给出 `x` 的值 - 即 1：

	# Test 3
	amethod( xsymbol ) #=> :x
	amethod( :xsymbol ) #=> :xsymbol
	amethod( eval(:xsymbol.id2name)) #=> :x
	amethod( eval( ( eval(:xsymbol.id2name)).id2name ) ) #=> 1

正如我们所见，当用于创建属性访问器（attribute accessors）时，符号可以引用方法名称。我们可以利用它将方法名称作为符号传递给 `method` 方法（是的，确实存在一个名为`'method'` 的方法），然后使用 `call` 方法调用指定的方法：

	#Test 4
	method(:amethod).call("")

`call` 方法允许我们传递参数，为了方便，我们可以通过计算符号来传递一个参数：

	method(:amethod).call(eval(:x.id2name))

如果这看起来很复杂，请看一下 **symbols_3.rb** 中的一个更简单的示例。这从以下赋值开始：

<div class="code-file clearfix"><span>symbols_3.rb</span></div>

	def mymethod( somearg )
	  print( "I say: " << somearg )
	end

	this_is_a_method_name = method(:mymethod)

这里 `method(mymethod)` 查找一个方法，该方法的名称由作为参数传递的符号（`:mymethod`）指定，如果找到，则返回具有相应名称的 Method 对象。在我的代码中，我有一个名为 `mymethod` 的方法，现在将其分配给变量 `this_is_a_method_name`。

运行此程序时，你将看到第一行输出打印了变量的值：

	puts( this_is_a_method_name ) #=> This displays: #<Method: Object#mymethod>

这表明变量 `this_is_a_method_name` 已被赋予了方法 `mymethod`，该方法绑定到 Object 类（所有方法都作为'独立'（freestanding）函数输入）。要仔细检查变量是否真的是 Method 类的一个实例，下一行代码会打印出它的类：

	puts( "#{this_is_a_method_name.class}" ) #=> This displays: Method

好吧，如果它真的是一个真正的方法，那么我们应该可以调用它，不是吗？为此，我们需要使用 `call` 方法。这就是最后一行代码的作用：

	this_is_a_method_name.call( "hello world" ) #=> This displays: I say: hello world

### 为什么使用符号？

Ruby 类库中的某些方法将符号（symbol）指定为参数。当然，如果你需要调用这些方法，则必须将符号传递给它们。但是，除了这些情况之外，没有绝对的要求你在自己的编程中使用符号。对于许多 Ruby 程序员来说，“常规”（conventional）数据类型（如字符串和整数）就足够了。

但是，符号确实在“动态”（dynamic）编程中占有特殊的地位。例如，Ruby 程序能够在运行时（runtime）通过在某个类的作用域内调用 `define_method` 来创建一个新方法，符号表示要定义的方法以及块表示该方法的代码：

<div class="code-file clearfix"><span>add_method.rb</span></div>

	class Array
	  define_method( :aNewMethod, lambda{ |*args| puts( args.inspect) } )
	end

执行上面的代码后，Array 类将获得一个名为 `aNewMethod` 的方法。你可以通过调用 `method_defined?` 并传入表示方法名称的符号来验证这一点：

	Array.method_defined?( :aNewMethod ) #=> returns: true

当然，你本身也可以调用该方法：

	[].aNewMethod( 1,2,3 ) #=> returns: [1,2,3]

你可以在运行时（runtime）以类似的方式删除现有的方法，在类中调用 `remove_method`，并传入提供被删除的方法的名称符号：

	class Array
	  remove_method( :aNewMethod )
	end

动态编程在需要程序仍在执行时修改 Ruby 程序本身的行为的应用程序中是非常有用的。例如，动态编程广泛用于 Rails 框架中。

## 深入探索

### 什么是符号？

之前，我说过符号（symbol）是一个标识符，其值就是它本身。从广义上讲，这描述了从 Ruby 程序员的角度来待看符号的行为方式。但它并没有告诉我们从 Ruby 解释器（interpreter）的角度来看，符号的字面意思是什么。实际上，符号是指向符号表（symbol table）的指针（pointer）。符号表是 Ruby 的已知标识符的内部列表 - 例如变量和方法名称。

如果你想深入了解 Ruby，你可以显示 Ruby 已知的所有符号，如下所示：

<div class="code-file clearfix"><span>allsymbols.rb</span></div>

	p( Symbol.all_symbols )

这将显示数千个符号，包括方法名称，例如 `:to_s` 和 `:reverse`，全局变量，例如：`$/` 和 `:$DEBUG`，类名称，例如 `:Array` 和 `:Symbol`。你可以使用数组索引限制显示的符号数量，如下所示：

	p( Symbol.all_symbols[0,10] )

但是你不能对符号进行排序，因为符号本身并不是连续的。显示符号排序列表的最简单方法是将它们转换为字符串并对其进行排序。在下面的代码中，我将 Ruby 已知的所有符号传递给一个块，该块将每个符号转换为一个字符串，并将字符串收集到一个新的数组中，该数组被分配给 `str_array` 变量。现在我可以对这个数组进行排序并显示结果：

	str_arr = Symbol.all_symbols.collect{ |s| s.to_s }
	puts( str_arr.sort )