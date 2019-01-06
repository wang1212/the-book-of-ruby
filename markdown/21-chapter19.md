---

	{
		"title": "第十九章",
		"ctime": "2019-01-03 23:00:00",
		"mtime": "2019-01-03 23:00:00"
	}

---

# 第十九章

***

## Ruby On Rails

Rails 已与 Ruby 紧密相连，以至于现在人们用 Ruby on Rails 谈论编程已经司空见惯，就好像 Ruby on Rails 是编程语言的名称一样。

实际上，Rails 是一个框架 - 一组工具和代码库 - 可以与 Ruby 一起使用。它有助于创建基于 Web 前端的数据库驱动的应用程序。Rails 使你能够开发响应用户交互的网站：例如，用户能够在一个页面上输入和保存数据，并在其它页面上搜索和显示已有数据。这使得 Rails 适合创建动态网站，可以“动态”（on the fly）生成网页，而不是加载静态的，预先设计的页面。典型应用包括：协作网站，如在线社区，多作者书籍或维基，购物网站，论坛和博客。

我们将尽快通过动手指南来创建博客。首先，让我们仔细看看 Rails 框架的细节。

<div class="note">

本章旨在让你体验 Ruby On Rails 的开发。但请记住，Rails 是一个庞大而复杂的框架。我们将只涵盖最基本的要点！我们在本章中使用的是 Rails 的第 2 版。这些示例不适用于 Rails 1，并且不保证可以与任何未来的 Rails 版本一起使用。
</div>

### 首先安装 Rails

#### A）自己安装...

Rails 不是 Ruby 标准的一部分，因此你需要单独操作来进行安装。你可以通过多种方式这么做。最简单的方法是使用 all-one 安装程序（下面介绍了一些替代方法）。但是，你也可以一次安装 Rails 及其所需的工具。可以使用 Ruby Gem '包管理器'（package manager）安装 Rails。只要你连接到互联网，就会在线查找并安装最新版本的 Rails。在命令提示符下，输入：

	gem install rails

或者，你可以从 Ruby On Rails 网站 **http://www.rubyonrails.org** 下载并安装 Rails。大多数 Rails 应用程序也需要数据库。你需要单独操作来安装数据库。免费的 MySQL 数据库服务器广泛用于此目的。你可以在附录中找到有关 MySQL 的基本的安装帮助。

#### B）或者使用'一体化'安装器...

Mac 用户可以使用 Locomotive 安装程序设置带有附加实用程序的 Rails 环境（**http://sourceforge.net/projects/locomotive**）。Windows 用户可以通过使用 InstantRails 安装程序或 Ruby In Steel 一体化（All-in-One）安装程序来节省一些精力。InstantRails 安装包括 Ruby，Rails，Apache Web 服务器和 MySQL。所有内容都放在一个单独的目录结构中，因此原则上应该能够与同一台 PC 上的任何其它 Ruby 安装共存，而不会造成任何无法预料的副作用。事实上，如果你已经单独安装了 Apache，我发现 InstantRails 有时会出现问题。不然的话，它提供了一种简单的方法来启动和运行 Rails。

从以下位置下载 InstantRails：

> **http://instantrails.rubyforge.org/wiki/wiki.pl**

Ruby In Steel 一体化（All-in-One）安装程序安装包括 Ruby，Gems，Rails，WEBrick，MySQL plus（可选）免费版 Microsoft Visual Studio。你还可以安装 Ruby In Steel IDE 的免费或商业版（或试用版）。本章中的示例均使用 Ruby In Steel 的“一体化安装程序”（all in one installer）默认配置进行了测试。

从以下位置下载 Ruby In Steel 一体化（All-in-One）安装程序：

> **http://www.sapphiresteel.com/spip?page=download**

### MVC - 模型，视图，控制器

Rails 应用程序分为三个主要部分 - 模型（Model），视图（View）和控制器（Controller）。简而言之，模型（Model）是数据部分 - 数据库和对该数据进行的任何编程操作（例如计算）；视图（View）是最终用户看到的 - 在 Rails 术语中表示浏览器中出现的网页；控制器（Controller）是将模型连接到视图的编程粘合剂。

模型-视图-控制器方法由各种编程语言和框架以各种形式使用。在*“深入探索”*部分中对此进行了更全面的描述。为了简洁起见，我今后将其称为 MVC。

### 第一个 Ruby On Rails 应用

不需要更多的麻烦，让我们开始用 Rails 编程。我假设你已经安装了 Rails 以及 Web 服务器。我碰巧使用 WEBrick 服务器，但你可以使用其它服务器，如 LightTPD 或 Mongrel。有关 Web 服务器的更多信息，请参阅附录。

本章假设你仅使用“原始”（raw）的 Rails 开发工具，至少使用文本编辑器和 Web 浏览器；因此，你会发现你经常需要启动单独的程序并在系统提示符下输入命令。集成开发环境应该可以让你更轻松地完成这些任务。

<div class="note">

*注意：*与本书中的普通Ruby代码示例不同，我没有提供了本章所述的 Ruby On Rails 应用程序的所有代码。这有三个原因：

1）每个 Rails 应用程序包含大量的文件和文件夹。
2）我还必须为每个数据库提供数据，你必须在使用它之前导入它。
3）不仅是为了让你自己创建自己的 Rails 应用程序，这样做也可以帮助你了解 Rails 的工作原理。但是，我提供了一些示例文件 - 一个完整应用程序的组件部分 - 在你运行过程中遇到问题时你可以使用它来比较自己的代码。
</div>

### 创建一个 Rails 应用

为简单起见，第一个应用程序根本不使用数据库（database）。这将让我们探索视图（View ）和控制器（Controller），而不必担心模型（Model）的复杂性。

首先，打开系统提示符（在 Windows 上，选择“开始”菜单，然后在*“运行”*或*“搜索”*框中输入 **cmd**）。导航到你打算将 Rails 应用程序放入的目录。我们假设这是 **C\railsapps**。检查是否已安装 Rails 并在系统环境变量（path）中。

	rails

一切都很好，现在你应该会在屏幕上看到关于使用 `rails` 命令的帮助信息。如果没有，则在继续之前需要修复 Rails 安装问题。

假设 Rails 可以正常工作，现在就可以创建一个应用程序。输入：

	rails helloworld

在硬盘发出一点呜呜声后，你应该会看到 Rails 刚刚创建的文件列表：

	create app/controllers
	create app/helpers
	create app/models
	create app/views/layouts
	create config/environments
	...(etcetera)

使用计算机的文件管理器（例如 Windows 资源管理器）查看这些文件。在运行 Rails 命令的目录下面（**\helloworld**），你将看到已创建了几个新目录：**\app**，**\config**，**\db** 等。其中一些有子目录。例如，**\app** 目录包含 **\controllers**，**\helpers**，**\models** 和 **\views**。 **\views** 目录本身包含一个子目录，**\layouts** 等。

Rails 应用程序中的目录结构并非随机生成；目录（或“文件夹”）及其包含的文件名称定义了应用程序各个部分之间的关系。这背后的想法是，通过采用定义明确的文件和文件夹结构，你可以避免编写大量配置文件以将应用程序的各个部分链接在一起。本章末尾的*深入探索*中提供了 rails 的默认目录结构的简化指南。

现在，在系统提示符下，将目录更改为新生成的 Rails 应用程序的顶级文件夹（**\helloworld**）。假设你仍然在 **C:\railsapps** 目录中，并且你按照之前的建议命名了 Rails 应用程序 **helloworld**，那么你将（在 Windows 上）输入此命令以更改为那个目录：

	cd helloworld

现在运行服务器。 如果（像我一样）你使用 WEBrick，你应该输入：

	ruby script/server

请注意，其它服务器可能以不同的方式启动，如果上述方法不起作用，则需要查阅服务器的文档。在上面的示例中，**script** 是在运行 `rails` 命令时创建的目录，而 **server** 是运行 WEBrick 服务器的代码文件的名称。你现在应该看到类似于以下的内容：

	=> Booting WEBrick...
	=> Rails application started on http://0.0.0.0:3000
	=> Ctrl-C to shutdown server; call with --help for options
	[2006-11-20 13:46:01] INFO WEBrick 1.3.1
	[2006-11-20 13:46:01] INFO ruby 1.8.4 (2005-12-24) [i386-mswin32]
	[2006-11-20 13:46:01] INFO WEBrick::HTTPServer#start: pid=4568 port=3000

<div class="note">
	<p class="h4"><b>问题...？</b></p>

如果你看到错误消息而不是上面的输出，请检查你是否完全从相应目录（**\helloworld**）输入了服务器命令：

	ruby script/server

如果仍有问题，则可能默认端口（3000）被占用了 - 例如，如果你已在同一台 PC 上安装了 Apache 服务器。在这种情况下，请尝试其它一些值，例如 3003，在运行脚本时将此数字放在 `-p` 之后：

	ruby script/server –p3003
</div>

现在启动一个 Web 浏览器。输入主机名，然后在其地址栏中输入冒号和端口号。主机名应该（通常）是 *localhost*，端口号应该与启动服务器时使用的端口号相匹配，否则默认为 3000。这是一个示例：

	http://localhost:3000/

浏览器现在应该显示一个欢迎您登录 Rails 的页面。如果没有，请验证你的服务器是否在 URL 中指定的端口上运行...

<div class="text-center">
	<img src="images/chapter19_rails.png" />
</div>

### 创建控制器

如前所述，控制器（Controller）是你的大部分 Ruby 代码所在的位置。它是应用程序中视图（View，浏览器中显示的内容）和模型（Model，数据发生了什么改变）之间的一部分。这是一个 "Hello world" 应用程序，让我们创建一个控制器来说 "hello"。本着原创的精神，我将其称为 **SayHello** 控制器。再一次，你可以通过在系统提示符下运行脚本来创建它。你需要在先前运行服务器脚本的目录中打开另一个命令窗口（例如，**C\railsapps\helloworld**）。你无法重新使用现有的命令窗口，因为该命令窗口正在运行服务器，你需要将其关闭以返回到提示符 - 这将阻止我们的 Rails 应用程序工作！

在提示符下输入这个（使用 **SayHello** 的首字母大写方式，如下所示）：

	ruby script/generate controller SayHello

片刻之后，你将被告知已创建以下文件和目录（该脚本还将告诉你某些目录已存在且因此未创建）：

	app/views/say_hello
	app/controllers/say_hello_controller.rb
	test/functional/say_hello_controller_test.rb
	app/helpers/say_hello_helper.rb

<div class="note">

**注意：**这个 **generate controller** 脚本还会创建另一个 Ruby 文件，**application.rb**，它是整个应用程序的控制器，加上一个文件夹 **/views/say_hello**，我们将在稍后使用它。
</div>

注意 Rails 如何将名称 SayHello 解析成两个小写的单词，say 和 hello，并用下划线分隔，它使用这个名字作为三个独立的 Ruby 文件的第一部分。这只是 Rails 使用的“按惯例配置”方法的一个示例。

这里的 Ruby 文件 **say_hello_controller_test.rb** 和 **say_hello_helper.rb** 作为存储库提供（如果你愿意），分别用于测试和实用程序（'helper'）代码。但更重要的是控制器文件本身 **say_hello_controller.rb**，它是在 **\helloworld\app\controllers** 中创建的。在文本编辑器中打开此文件。这个空方法已自动生成：

	class SayHelloController < ApplicationController
	end

在这个类中，我们可以编写一些代码，以便在显示某个页面时执行。编辑类定义以匹配以下内容：

	class SayHelloController < ApplicationController
	  def index
		render :text => "Hello world"
	  end

	  def bye
		render :text => "Bye bye"
	  end
	end

现在包含两个方法，`index` 和 `bye`。每个方法都包含一行代码。尽管我已经省略了括号（许多 Rails 开发人员喜欢使用 bracket-light 风格编码），但你可以推断出 `render` 是一种以哈希为参数的方法；哈希本身包含一个包含一个由符号和字符串构成的键值对。对于 bracket-lovers ，`index` 方法可以像这样重写：

	def index
	  render( { :text => "Hello world" } )
	end

你有了第一个真正的 Rails 应用程序。要试用它，你需要返回到 Web 浏览器并输入你刚刚编写的两个函数的完整“地址”。但首先你可能需要重新启动服务器。只需在服务器运行的命令窗口中按 <kbd>CTRL+C</kbd>。当服务器存在时，输入以下命令重启：

	ruby script/server

现在输入一个地址来访问控制器方法。地址采用主机和端口的形式（与你之前输入的相同 - 例如，**http://localhost:3000**），加上控制器的名称（**/say_hello**），最后是特定方法的名称（**/index** 或 **/bye**）。尝试将这些输入到浏览器的地址字段中，再次确保使用相应的端口号，如果不是 3000：

	http://localhost:3000/say_hello/index
	http://localhost:3000/say_hello/bye

你的浏览器应分别为每个地址显示 "Hello world" 和 "Bye bye"。如果所有都如期运行，你可以继续阅读*“剖析简单 Rails 应用”*一节。但是，如果你看到数据库错误，请首先阅读下一节_“无法找到数据库？”_...

### 无法找到数据库？

如果你选择使用 SQLite3 数据库，则应首先按照此处的说明进行安装：

	http://wiki.rubyonrails.org/rails/pages/HowtoUseSQLite

如果（像我一样）你已经决定使用 MySQL 数据库，并且假设 MySQL 已正确安装（参见附录），那么当你尝试运行应用程序时，Rails 可能会显示类似于以下内容的错误消息：

	no such file to load -- mysql

某些版本的 Rails（例如，Rails 2.2）要求将 MySQL gem 作为单独的操作安装。为此，请在系统提示符下输入：

	gem install mysql

在 Windows 上，当你现在运行应用程序时，你可能会看到与此类似的其它错误消息：

	The specified module could not be found.
	c:/ruby/lib/ruby/gems/1.8/gems/mysql-2.7.3-x86-mswin32/ext/mysql.so

如果你遇到此问题，你应该能够通过将 MySQL 二进制目录（例如，*C:\Program Files\MySQL\MySQL Server 5.0\bin*）中名为 **libmySQL.dll** 的文件的副本复制到 Ruby 二进制目录（例如，*C:\ruby\bin*）中来修复它。重新启动应用程序（关闭并重新启动服务器），然后再次尝试运行它。

我们简单的 "hello world" 应用程序不需要数据库。验证是否正确指定了数据库适配器（例如 *sqlite3* 或 *mysql*），但在数据库配置文件 *\app\config\database.yml* 的 'development' 部分中没有给出数据库名称。

当我使用 MySQL 时，我的配置如下（其中 'root' 是我的 MySQL 用户名，'mypassword' 是我的 MySQL 密码：

	development:
	  adapter: mysql
	  host: localhost
	  username: root
	  database:
	  password: mypassword

### 剖析简单的 Rails 应用

Rails 使用 `index` 方法作为默认值，因此在将地址输入浏览器时可以省略 URL 的那一部分：

	http://localhost:3000/say_hello

在继续之前，让我们仔细看看我们正在使用的类。Rails 通过将 Controller 附加到我们在运行控制器生成器脚本（**HelloWorld**）时指定的名称来命名该类，并使它成为 `ApplicationController` 类的后代：

	class SayHelloController < ApplicationController

究竟什么是 `ApplicationController` 类？现在，你可能还记得我提到我们之前运行的 **generate/controller** 脚本在 **/app/controllers** 文件夹中静默创建了一个名为 **application.rb** 的文件。此文件是应用程序控制器，如果打开它，你将看到它包含一个类名为：

	ApplicationController < ActionController::Base

因此，我们的 `SayHelloController` 类继承自 `ApplicationController` 类，该类本身继承自 `ActionController` 模块中的 `Base` 类。你可以通过遍历层次结构并要求每个类显示自己来证明这一点。

顺便说一句，这也让我们有机会尝试在 `SayHelloController` 类中进行一些真正的 Ruby 编程。

只需编辑 **say_hello_controller.rb** 文件的内容以匹配以下内容（或者复制并粘贴本章代码存档中的 **sayhello1.rb** 文件中的代码）：

<div class="code-file clearfix"><span>sayhello1.rb</span></div>

	class SayHelloController < ApplicationController
	  def showFamily( aClass, msg )
		if (aClass != nil) then
		  msg += "<br />#{aClass}"
		  showFamily( aClass.superclass, msg )
		else
		  render :text => msg
		end
	  end

	  def index
		showFamily( self.class, "Class Hierarchy of self..." )
	  end
	end

要查看结果，请在浏览器中输入此地址（如果需要，请再次更改端口号）：

	http://localhost:3000/say_hello/

你的 Web 浏览器现在应该显示...

	Class Hierarchy of self...
	SayHelloController
	ApplicationController
	ActionController::Base
	Object

如你所见，Rails 控制器文件包含 Ruby 代码。你可以在控制器中使用所有常用的 Ruby 类，例如 String 和 Hash，你可以调用方法并传递参数。

但请记住，最终结果需要显示在网页中。这有一定的后果。例如，不要将换行符 "\n" 放入字符串中，而应使用 HTML 段落，`<P>` 或换行 `<br/>` 标记，并且每次显示页面时只允许调用 `render` 一次，这就解释了为什么我在递归调用方法的过程中构造了一个字符串，然后将其传递给最后的 `render` 方法：

	def showFamily( aClass, msg )
	  if (aClass != nil) then
		msg += "<br />#{aClass}"
		showFamily( aClass.superclass, msg )
	  else
		render :text => msg
	  end
	end

<div class="note">
	<p class="h4"><b>生成控制器脚本摘要</b></p>

让我们简要回顾一下当我们运行 **generate controller** 脚本时发生的事情。每次生成一个新控制器时，它都会在 **app/controllers** 目录中创建一个 Ruby 代码文件，其名称与你输入的名称相匹配，但全部为小写，并且你指定的任何非初始大写字母前面都加了下划线并且最后附加 **_controller**。因此，如果你输入 **SayHello**，则控制器文件将被命名为 **say_hello_controller.rb** 。控制器将包含一个类定义，例如：`SayHelloController`。你还可以通过在执行脚本时包含这些视图名称来指定“视图”，例如 `index` 和 `bye` ...

	ruby script/generate controller SayHello index bye

在这种情况下，Controller 类将自动提供名称与这些视图匹配的方法（`def index` 和 `def bye`）。无论如何，无论你是否指定视图，都会在 **/views** 目录中创建一个的文件，其名称与控制器匹配（**views/say_hello**）。实际上，该脚本还会创建一些其它文件，包括 **/helpers** 文件夹中的一些更多 Ruby 文件，但我们现在可以忽略它们。

如果在运行控制器脚本时指定了视图名称，则某些名称匹配且扩展名为 **.html.erb** 的文件将添加到相应的视图文件夹中。例如，如果你输入了命令...

	ruby script/generate controller SayHello xxx

...**/views/say_hello** 目录现在应该包含一个名为 **xxx.html.erb** 的文件。另一方面，如果你输入了...

	ruby script/generate controller Blather xxx bye snibbit

...**views/blather** 目录现在应该包含三个文件：

**xxx.html.erb**, **bye.html.erb** 和 **snibbit.html.erb**。
</div>

### 创建视图

虽然通过对 Controller 内的所有内容进行编码来创建整个应用程序是可能的，但最终会出现一些非常难看的网页。要应用更多格式，您需要创建一个视图（View）。

你可以将视图（View）视为 HTML 页面，当有人登录到特定的 Web 地址时将显示该页面 - 在这种情况下，视图的名称构成了地址的最后部分，如前面的示例所示 URL 的 **/index** 和 **/bye** 部分将为我们匹配相应视图，这些视图显示的数据由控制器中的 `index` 和 `bye` 方法提供。

你可以创建与这些 Web 地址和相应方法名称匹配的 HTML 视图“模板”。使用 HTML（或纯文本）编辑器，在 **\app\views\say_hello** 目录中创建名为 **index.html.erb** 的文件。

<div class="note">

请记住，在最初生成控制器时，你可以选择创建一个或多个视图模板。这是通过在用于运行脚本以生成控制器的命令末尾附加几个名称来完成的：

	ruby script/generate controller Blather index bye snibbit

这个脚本将创建 Blather 控制器和三个视图：*index*，*bye* 和 *snibbit*。

现在我们有了一个视图模板，我们可以对其进行编辑，以便控制数据在网页中的显示方式。这意味着从现在开始我们不需要使用控制器中的 `render` 方法显示简单，无格式的文本。

</div>

但是，由于视图不受控制器的控制（可以这么说），控制器如何将数据传递给视图？事实证明，它可以通过将数据分配给实例变量来实现。

编辑 **say_hello_controller.rb** 中的代码（或删除它并粘贴来自文件 **sayhello2.rb** 中我的代码），使其与以下内容匹配：

<div class="code-file clearfix"><span>sayhello2.rb</span></div>

	class SayHelloController < ApplicationController
	  def showFamily( aClass, msg )
		if (aClass != nil) then
		  msg += "<li>#{aClass}</li>"
		  showFamily( aClass.superclass, msg )
	    else
		  return msg
	    end
	  end

	  def index
		@class_hierarchy = "<ul>#{showFamily( self.class, "" )}</ul>"
	  end
	end

此版本调用 `showFamily()` 方法，以便在两个 HTML'无序列表'标记 `<ul>` 和 `</ul>` 中构建一个字符串。每次找到类名时，它都放在两个 HTML '列表项'标签 `<li>` 和 `</li>` 之间。完整的字符串形成一个有效的 HTML 片段，`index` 方法只是将该字符串分配给一个名为 `@class_hierarchy` 的变量。

<div class="note">
	<p class="h4"><b>控制器中的 HTML 标记...？</b></p>

一些 Ruby On Rails 开发人员反对在控制器（Controller）代码中包含任何 HTML 标记，无论多少。在我看来，如果你打算在网页中显示最终结果，那么你把奇怪的 `<p>`，`<ul>` 或 `<li>` 标签放在哪里就没那么重要了。虽然 MVC 模式鼓励控制器（Controller）的程序代码与视图（View）的布局定义之间存在强烈的可拆分性，但你将不可避免地要做出一些妥协 - 至少可以通过将一些程序代码放入视图（View）中来实现。避免在控制器（Controller）中使用 HTML 标签在很大程度上是一种美学而非实用的反对意见。我个人对这个问题没有非常强烈的看法，但是（被警告！）其他人这样做...
</div>

我们现在需要做的就是找到一种方法将 HTML 片段放入一个完整组成的 HTML 页面。这就是视图（View）的用处。在 **app/views/say_hello** 文件夹中打开刚刚创建的视图文件 **index.html.erb**。根据 Rails 命名约定 - 这是与 **say_hello_controller.rb** 文件关联的默认视图（'index'页面）。由于 Rails 根据文件，文件夹，类和方法名称计算出依赖关系，因此我们不必按名称加载（load）或引入（require）任何文件，也不必编写任何详细配置信息。

在 **index.html.erb** 文件中添加：

	<h1></h1>
	<%= @class_hierarchy %>

第一行只是纯 HTML 格式，它将 `<h1></h1>` 标记所包含的文本定义为标题。下一行更有趣。它包含变量 `@class_hierarchy`。回顾一下 **say_hello_controller.rb** 中的 `index` 方法，你会发现这是我们为其分配字符串的变量。在视图中，`@class_hierarchy` 位于两个奇怪的限定符 `<%=` 和 `%>` 两者之间。这些是特殊的 Rails 标签。它们用于嵌入 Ruby 代码，这些 Ruby 代码将在浏览器中显示网页之前被执行。最终显示的页面将是一个完整格式的 HTML 页面，其中包含视图模板文件中的任何HTML片段以及任何嵌入式 Ruby 代码执行后的结果。现在尝试一下，在浏览器中输入页面地址：

	http://localhost:3000/say_hello/

现在，它应该以粗体字母显示标题 "This is the Controller's Class Hierarchy"，后跟一个类列表，每个类的前面都有一个点：

- SayHelloController
- ApplicationController
- ActionController::Base
- Object

如果你愿意，从视图文件中删除所有 HTML，可以通过在控制器中创建标题并将结果字符串分配给另一个变量。你可以通过编辑 **say_hello_controller.rb** 中的 `index` 方法来执行此操作：

	def index
	  @heading = "<h1>This is the Controller's Class Hierarchy</h1>"
	  @class_hierarchy = "<ul>#{showFamily( self.class, "" )}</ul>"
	end

然后将视图文件（**/app/views/say_hello/index.html.erb**）编辑为：

<div class="code-file clearfix"><span>say_hello.html.erb</span></div>

	<%= @heading %>
	<%= @class_hierarchy %>

如果执行此操作，则网页中显示的最终结果将保持不变。

### Rails 标记

Rails 标记（tags）有两种变体，你可以将它们放入 Rails HTML “嵌入式 Ruby”（*ERb*）模板文件中。到目前为止我们使用的那些在开头包含一个等号，`<％=`。

这些标记使 Rails 不仅可以计算 Ruby 表达式，还可以在网页中显示结果。如果在开始分隔符 `<％` 中省略等号，则将执行代码，但不会显示结果。

<div class="note">

**ERB**（'嵌入式Ruby'）文件包含混合了 HTML 标记和标记之间的 Ruby 代码，例如 `<％=` 和 `％>`。Rails 在 Web 浏览器中显示最终页面之前处理这些文件，执行嵌入式R uby 代码并构造 HTML 页面。
</div>

如果你愿意，你可以在 `<％` 和 `％>` 标记之间放置相当长的代码 - 甚至整个 Ruby 程序！然后在要在网页中显示内容时使用 `<％=` 和 `％>`。实际上，我们可以通过完全省略控制器并将所有内容放入视图来重写我们的应用程序。通过编辑 **app/views/say_hello/index.html.erb** 以匹配以下内容（或复制并粘贴 **embed_ruby.html.erb** 文件中的代码）来尝试：

<div class="code-file clearfix"><span>embed_ruby.rhtml</span></div>

	<% def showFamily( aClass, msg )
	  if (aClass != nil) then
		msg += "<li>#{aClass}</li>"
		showFamily( aClass.superclass, msg )
	  else
		return msg
	  end
	end %>

	<%= "<ul>#{showFamily( self.class, "" )}</ul>" %>

在这种特殊情况下，网页上显示的文本与之前略有不同，因为它现在显示视图类的类层次结构，而不是控制器类的类层次结构。正如你将看到的，视图继承自 `ActionView::Base` 类。

你还可以通过在 `<％` 和 `％>` 标记之间放置单独的行来分割连续的代码块，而不是将整个块放在一对标记之间。这样做的好处是它允许你将标准 HTML 标记放在单独分隔的 Ruby 代码行之外。例如，你可以将其放入视图中：

	<% arr = ['h','e','l','l','o',' ','w','o','r','l','d'] %>

	<% # sort descending from upper value down to nil
	reverse_sorted_arr = arr.sort{
	  |a,b|
	  b.to_s <=> a.to_s
	} %>

	<% i = 1 %>
	<ul>
	<% reverse_sorted_arr.each{ |item| %>
	<li><%= "Item [#{i}] = #{item}" %></li>
	<% i += 1 %>
	<% } %>
	</ul>

在这里，我为一组标签之间的变量 `arr` 分配了一组字符；我已经编写了一个块来对数组进行反向排序，并将结果分配给第二组标记之间的另一个变量；然后我给变量 `i` 分配了 1；最后我写完了这个方法：

但是，我没有将方法包含在一组标记之间，而是将每个单独的行包含在它自己的标记对中。我为什么要这样做？嗯，有两个原因。首先，我希望块中间的字符串显示在网页上，所以我需要在那里使用 `<％=` 标记：

	<%= "Item [#{i}] = #{item}" %>

其次，我希望整个字符串集显示为 HTML 列表。所以我在 Ruby 代码块之前和之后放置了 `<ul>` 和 `</ul>` 标记；并且，我已经在 `<li>` 和 `</li>` 标记中放置了显示每个数组项的代码行。请注意，这些标记位于 Ruby 代码块中，但在此特定行上的嵌入式Ruby标记之外：

	<li><%= "Item [#{i}] = #{item}" %></li>

因此，通过将一个连续的 Ruby 代码块划分为单独分隔的行，我已经掌握了能够将 HTML 混合到 Ruby 代码中的有用技巧！说实话，我根本没有把它混合在一起 -  Ruby 代码仍然在标签内部闭合；我所做的是告诉 Rails 在 Web 浏览器中显示页面之前在特定点混合使用 HTML。

顺便提一下，你可能会发现将所有嵌入式 Ruby 代码放入视图（**index.html.erb**）的应用程序的版本与将代码全部放入控制器的先前的版本（**say_hello_controller.rb**）进行比较会很有趣。并且只有很少的嵌入式 Ruby（几个变量）代码被放入视图中：

	<%= @heading %>
	<%= @class_hierarchy %>

你可能会赞成第一个版本，其中代码和格式保持独立，是整洁的。总的来说，Ruby 代码属于 Ruby 代码文件，HTML 格式属于 HTML 文件。虽然嵌入式 Ruby 提供了一种让视图和控制器进行通信的简单方法，但通常最好保持嵌入式 Ruby 代码简洁明了，并将更复杂的 Ruby 代码放入 Ruby 代码文件中。

### 让我们创建一个博客

对于许多人来说，真正“将它们吸引到” Ruby On Rails 的一件事是由 Rails 创建者 David Heinemeier Hansson 提供的二十分钟演示，其中他演示了如何创建一个简单的博客。

	http://www.rubyonrails.com/screencasts

博客是一种来展示使用 Rails 创建相当复杂的应用程序是多么容易的很好的方式。在本章的最后一部分中，我将解释如何创建一个非常简单的博客（Blog）应用程序。我将使用一个名为 "migrations"（迁移）的功能，它将减少创建“模型”（Model）数据库结构的大量工作。

请记住，我已尽力使这个应用程序的创建尽可能简单，并且它不具备功能齐全的博客的所有功能（例如，没有用户注释和管理界面）。完成我的基本博客应用程序后，你可能想要学习前面提到的截屏教程。这将带你进一步创建更复杂的博客。

<div class="code-file clearfix"><span>\blog</span></div>

<div class="note">

你可以将博客应用程序的代码与我创建的代码进行比较。这是在本章随附的代码的 **\blog** 子目录中提供的。但是，这个博客应用程序并不是“就绪状态”，因为它需要一个你必须创建的数据库。不要“按原样”运行它，使用我的博客应用程序作为参考来检查你创建的文件是否与我创建的文件匹配。
</div>

在保存 Rails 应用程序的目录中打开命令提示符（例如 **C:\railsapps**）并执行命令以创建名为 Blog 的应用程序：

	rails blog

#### 创建数据库

现在让我们创建一个数据库。再一次，我假设你正在使用 MySQL 数据库。打开 MySQL 提示符（如前所述，从 MySQL 程序组打开 MySQL 命令行客户端）。出现提示时输入你的 MySQL 密码。现在你应该看到提示：

	mysql>

在提示符处输入此内容（请记住结尾处的分号）：

	create database blog_development;

MySQL 应该回复“查询确定”（Query OK）以确认已创建。现在确保 Rails 应用程序的数据库配置文件包含开发数据库的相应配置。如果你使用的是其它数据库（而不是 MySQL），则配置条目必须引用该数据库。

打开 *\app\config\database.yml*。假设你正在使用 MySQL，请输入*'mysql'*作为适配器，_'localhost'_作为主机，输入你的 MySQL 用户名（例如*'root'*）和密码（如果有）。数据库名称应与你刚刚创建的数据库匹配。这是一个示例：

	development:
	  adapter: mysql
	  host: localhost
	  username: root
	  database: blog_development
	  password: mypassword

<div class="note">

**记住：**如果在更改 **database.yml** 时服务器正在运行，你应该在之后重新启动服务器！
</div>

#### 脚手架

我们将使用一个名为 "scaffolding"（脚手架）的功能来一次创建模型，视图和控制器。脚手架是一种快速启动和运行简单应用程序的便捷方式。进入新的 **\blog** 目录并在系统提示符下输入以下内容：

	ruby script/generate scaffold post title:string body:text created_at:datetime

这告诉脚手架生成器创建一个包含 Ruby 代码的模型来访问一个名为 'post' 的数据库表，其中有三列，'title'，'body' 和 'created_at'，每个列都有数据类型（*字符串*，*文本*和*日期时间*）在冒号后指定。

为了基于此模型创建数据库结构，我们需要运行 "migration" 来更新数据库表本身。

#### 迁移

scaffold 脚本为我们创建了一个数据库迁移（migration）文件。导航到 **\db\migrate** 目录。你将看到它包含一个带编号的迁移文件，其名称以 *_create_posts.rb* 结尾。如果打开此文件，你可以看到如何在 Ruby 代码中表示表结构：

	def self.up
	  create_table :posts do |t|
		t.string :title
		t.text :body
		t.datetime :created_at

		t.timestamps
	  end
	end

随着时间的推移，应用程序可能会获得大量迁移文件，每个迁移文件都包含有关模型特定迭代的信息 - 对数据库表结构所做的更改和添加。经验丰富的 Rails 开发人员可以有选择地使用迁移来激活不同版本的模型。但是，在这里，我们将使用此迁移来创建数据库的初始结构。在应用程序主目录（例如 **/blog**）中的系统提示符下，你可以使用 "rake" 工具运行迁移。输入以下命令：

	rake db:migrate

片刻之后，你应该看到一条消息，指出 rake 任务已完成并且 CreatePosts 已被迁移。

#### Partial

现在让我们创建一个新的 "partial" 视图模板。Partial 是网页模板的片段，Rails 可以在运行时将其插入到一个或多个完整的网页中。

例如，如果你计划在站点的多个页面中使用相同的数据输入表单，则可以在 partial 模板中创建该表单。partial 模板的名称以下划线开头。

在 *\app\views\posts\directory* 目录中创建一个名为 **_post.html.erb** 的新文件。打开此文件并编辑其内容以匹配以下内容：

	<div>
	<h2><%= link_to post.title, :action => 'show', :id => post %></h2>
	<p><%= post.body %></p>
	<p><small>
	<%= post.created_at.to_s %>
	</small></p>
	</div>

保存更改。然后打开名为 **show.html.erb** 的文件。此文件由脚手架脚本自动创建。从文件中删除以下“样板”（boilerplate）代码...

	<b>Title:</b>
	  <%=h @post.title %>
	</p>

	<p>
	  <b>Body:</b>
	  <%=h @post.body %>
	</p>

	<p>
	  <b>Created at:</b>
	  <%=h @post.created_at %>
	</p>

并用这些替换它...

	<%= render :partial => "post", :object => @post %>

这告诉 Rails 此时渲染 **_post** 局部模板。**show.html.erb** 中的代码现在应该如下所示...

	<%= render :partial => "post", :object => @post %>

	<%= link_to 'Edit', edit_post_path(@post) %> |
	<%= link_to 'Back', posts_path %>

#### 试一试

就是这样！现在你已准备好测试你的应用程序。首先，运行服务器。在 **\blog** 目录中的提示符下，输入：

	ruby script/server

<div class="note">

回想一下，如果你没有使用默认端口 3000，则需要在 `-p` 之后指定实际端口号，如本章前面所述。 例如：`ruby script/server -p3003`
</div>

进入你的 Web 浏览器并输入以下地址（如果不是 3000，请再次使用实际端口号）：

**http://localhost:3000/posts**

你应该看到你的页面的 index 页面处于活动状态。这是应该出现的...

<div class="text-center">
	<img src="images/chapter19_blog_test_index.png" />
</div>

现在单击 *New Post* 链接。在“新建帖子”页面中，输入标题和正文。然后单击 *Create*。

<div class="text-center">
	<img src="images/chapter19_blog_test_create.png" />
</div>

显示的下一页是“显示页面”。这是由 **show.html.erb** 视图和 **_post.html.erb** 部分组合定义的。现在继续输入帖子并单击链接以浏览各种已定义的视图...

<div class="text-center">
	<img src="images/chapter19_blog_test_list.png" />
</div>

<div class="note">

如前所述，本章假定你以"原始的方式"使用 Rails，在系统提示符下输入所有必需的命令。某些 IDE 提供了更加集成的环境，允许你使用内置工具和实用程序生成和编写应用程序代码。你将在附录中找到一些 Ruby 和 Rails IDE 的概述。如果你使用的是 Ruby In Steel，你可以在 SapphireSteel Software 网站上找到本博客教程的替代版本，该教程使用 Ruby In Steel 的集成工具：

**http://www.sapphiresteel.com/How-To-Create-A-Blog-With-Rails-2**
</div>

## 深入探索

### MVC

如前所述，Rails 采用模型（Model），视图（View）和控制器（Controller）（或 MVC）模式。虽然这三个组成部分在理论上是分开的实体，但实际上不可避免地存在一定程度的重叠。例如，一些计算可以在模型中完成，其它计算在控制器中完成；影响数据格式化的操作可能发生在控制器或视图中。没有硬性和绝对的规则 - 只是一个一般原则，即尽可能地在模型中发生“接近数据”的操作，“接近显示”的操作应该在视图中发生，其它一切应该进入控制器。

那是理论上的 MVC。现在让我们看看 Rails 如何实现它...

#### Model

Ruby On Rails 中的模型（Model）是数据库中表的组合 - 由 MySQL 等数据库服务器处理 - 以及一组匹配的 Ruby 类来处理这些表。例如，在 Blog 中，你可能拥有一个包含名为 Posts 的表的数据库。在这种情况下，Rails 模型还将包含一个名为 Post 的 Ruby 类（注意 Rails 与复数一起使用 - Posts 表可以包含许多 Post 对象！）。Ruby Post 类通常包含从 Posts 数据库中查找，保存或加载单个 Post 记录的方法。数据库表和相应的 Ruby 类的这种组合构成了 Rails 模型（Model）。

#### View

视图（View）几乎就是它的样子 - Ruby On Rails 应用程序的可视化表示。它（通常不一定）以 HTML 模板的形式创建，其中混合了一些 Ruby 代码。事实上，其它视图类型（例如，使用 Adobe 的 Flex 或 Microsoft 的 Silverlight 制作的图形视图）是可能的，但 Rails 默认为 HTML。这些模板，通常具有扩展名 *.html.erb*（但也可能使用扩展名 *.rhtml*，这是 Rails 1 默认的），不会直接加载到 Web 浏览器中 - 毕竟，Web 浏览器没有任何运行 Ruby 代码的方法。相反，它们由一个单独的工具预处理，该工具执行 Ruby 代码以便与模型交互（根据需要查找或编辑数据），然后，作为最终结果，它创建一个新的 HTML 页面，其基本布局由一个 ERb 模板定义，但其实际数据（即博客文章，购物车项目或其它内容）由模型提供。

#### Controller

控制器（Controller）采用 Ruby 代码文件的形式，作为链接模型和视图的中间件。例如，在网页（视图）中，用户可以单击按钮将新帖子添加到博客；使用普通的 HTML，这个按钮提交一个名为 'Create' 的值。这导致一个名为 `create` 的方法，在一个帖子'控制器'（一个 Ruby 代码文件）中将已经输入网页（视图）的新博客条目（一些文本）保存到数据库中（该模型的数据存储库）。

### Rails 文件夹

这是 Rails 生成的顶级文件夹的简化指南，简要描述了它们包含的文件和文件夹：

- **app**

	它包含特定于此应用程序的代码。子子文件夹是：*app\controllers*, *app\models*, *app\views* 和 *app\helpers*。

- **config**

	Rails 环境的配置文件，路由映射，数据库和其它依赖项；一旦我定义了数据库，会包含配置文件 *database.yml*。

- **db**

	包含 *schema.rb* 中的数据库概要信息，并且可能包含作用于数据库中数据的代码。

- **doc**

	可能包含 RDOC 文档（有关 RDOC 的更多信息，请参阅附录）。

- **lib**

	可能包含应用程序的代码库（即，逻辑上不属于 *\controllers*，*\models* 或 *\helpers* 的代码）。

- **log**

	可能包含错误日志。

- **public**

	该目录包含可由 Web 服务器使用的“静态”文件。它有图片，样式表和 javascripts 的子目录。

- **script**

	包含 Rails 用于执行各种任务的脚本，例如生成某些文件类型和运行 Web 服务器。

- **test**

	这可能包含由 Rails 生成或由用户指定的测试文件。

- **tmp**

	Rails 使用的临时文件。

- **vendor**

	可能包含第三方库，这些库不构成 Rails 默认安装的一部分。

### 其它 Ruby 框架

Rails 可能是最著名的 Ruby 框架，但它肯定不是唯一的。其它如 Ramaze，Waves 和 Sinatra 也有专门的追随者。一个名为 Merb 的框架曾被视为最接近 Rails 的竞争对手。然而，在 2008 年 12 月，Rails 和 Merb 团队宣布他们将合作进行 Rails 的下一次迭代 - "Rails 3"。

如果你有兴趣探索其它 Ruby 框架，请点击以下链接：

Merb: http://merbivore.com/

Ramaze: http://ramaze.net/

Sinatra: http://sinatra.rubyforge.org/

Waves: http://rubywaves.com/

Ramaze 开发人员维护了一个更全面的 Ruby 框架列表，你可以在他们的主页上找到它们。