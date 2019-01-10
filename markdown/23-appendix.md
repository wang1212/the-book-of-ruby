---

	{
		"title": "附录",
		"ctime": "2019-01-11 01:38:00",
		"mtime": "2019-01-11 01:38:00"
	}

---

# 附录

***

## 附录 A：使用 RDOC 记录 Ruby

RDoc 是描述源代码文档格式的工具。RDoc 工具是 Ruby 的标准工具，可以处理 Ruby 代码文件和 C 代码 Ruby 类库，以便提取文档并对其进行格式化，以便它可以显示，例如在 Web 浏览器中。可以以源代码注释的形式显式添加 RDoc 文档。RDoc 工具还可以提取源代码本身的元素，以提供类，模块和方法的名称以及方法所需的任何参数的名称。

以 RDoc 处理器可访问的方式记录你自己的代码很容易。你可以在记录代码之前编写一组普通的单行注释（例如类或方法），也可以编写由 `=begin rdoc` 和 `=end` 分隔的嵌入式多行注释。请注意，`rdoc` 必须跟随 `=begin` 后，否则 RDoc 处理器将忽略注释块。

如果要生成文档，只需从命令提示符运行 RDoc 处理器即可。要为单个文件生成文档，请输入 `rdoc`，后跟文件名：

	rdoc rdoc1.rb

要为多个文件生成文档，请在 `rdoc` 命令后输入以空格分隔的文件名：

	rdoc rdoc1.rb rdoc2.rb rdoc3.rb

Rdoc 工具将创建一个格式良好的 HTML 文件（*index.html*），顶部有三个窗格，底部有四个较大的窗格。三个顶部窗格显示文件，类和方法的名称，而底部窗格显示文档。

HTML 包含超链接，以便你可以单击类和方法名称以导航到关联的文档。文档放在它自己的子目录 *\doc* 中，还有许多必需的 HTML 文件和一个样式表来应用格式。

你可以通过在单个单词或多个单词周围的标签周围放置格式字符来为 RDoc 注释添加额外的格式。使用 `*` 和 `*` 表示粗体，`_` 和 `_` 表示斜体，`+` 和 `+` 表示'打字机'字体。较长文本的等效标记为 `<b>` 和 `</b>` 表示粗体，`<em>` 和 `</em>` 表示斜体，`<tt>` 和 `</tt>` 表示打字机字体。

如果要从 RDoc 文档中排除注释或注释的一部分，可以将它放在 `#--` 和 `#++` 注释标记之间，如下所示：

	#--
	# This comment won‟t appear
	# in the documentation
	#++
	# But this one will

还有各种特殊说明，包含在冒号对之间。例如，如果要添加要在浏览器栏中显示的标题，请使用 `:title:`，像这样：

	#:title: My Fabulous RDoc Document

RDoc 提供了更多选项，使你能够以各种方式格式化文档，并以其它格式输出来替代 HTML 格式。如果你真的想要掌握 RDoc，请务必阅读完整的文档：

**http://rdoc.sourceforge.net/doc/index.html**

## 附录 B：为 Ruby On Rails 安装 MySQL

如果你正在使用 Rails，则需要安装数据库。虽然有很多可能的选择，但最广泛使用的是 MySQL。如果你之前从未使用过 MySQL，你可能会发现一些设置选项令人困惑。在这里，我将尝试引导你完成整个过程，以避免潜在的问题。

<div class="note">

本指南基于 Windows 下的 MySQL 5.0 安装。在其它操作系统上安装其它版本时可能会有所不同。有关其它指南，请参阅 MySQL 站点。
</div>

MySQL 主站点位于 **http://www.mysql.com/**，你可以从此处导航到当前版本的下载页面。

### 下载 MySQL

我假设你将使用 MySQL 的免费版本。可以从 **http://dev.mysql.com/downloads** 下载。在撰写本文时，当前版本是 MySQL 5 Community Server。当然，名称和版本号会随着时间的推移而变化。下载当前（即将发布的，alpha 或 beta）版本。选择为你的操作系统推荐的特定版本（例如，Win32 和 Win64 可能有不同的版本）。

你需要在此页面的某处向下滚动以找到适用于你的操作系统的安装程序。对于 Windows，你可以下载完整的 MySQL 包或较小的 Windows Essentials 包。完整的包包含数据库开发人员的额外工具，但这些不是简单的 Rails 开发所必需的。因此，对于大多数人来说，可以获得较小的 Windows Essentials 下载文件。

你应该单击此选项旁边的“选择镜像”（Pick A Mirror）链接。然后，你将看到一份问卷，如果你愿意，可以填写。如果你不希望这样做，只需向下滚动页面并选择一个区域下载站点。单击一个链接并保存文件，其名称类似（数字可能不同）：**mysql-essential-5.0.41-win32.msi**，磁盘上任意合适的目录。

### 安装 MySQL

下载完成后，通过在下载对话框中选择*“打开”（Open）*或_“运行”（Run）_（如果仍然可见）或通过 Windows 资源管理器双击安装文件来运行程序。

<div class="note">

**注意：**在安装 MySQL 期间，可能会在屏幕上出现一些广告。单击按钮以浏览这些。某些安全警告还可能会提示你验证是否有意安装该软件。出现提示时，应单击必要的选项以继续安装。
</div>

现在将出现安装向导的第一页。 单击<em>“下一步”（Next）</em>按钮。如果你愿意将软件安装到 <b>C:\Program Files\ </b> 下的默认 MySQL 目录中，则可以选择<em>“典型”（Typical）</em>设置选项。但是，如果要安装到其它目录，请选择<em>“自定义”（Custom）</em>。然后单击<em>下一步（Next）</em>。单击<em>“更改”（Change）</em>以更改目录。

准备好继续后，单击*“下一步”（Next）*。

你将看到屏幕上显示“准备安装程序”。验证目标文件夹是否正确，然后单击*“安装”（Install）*按钮。

根据 MySQL 的版本，你现在可能会看到显示的一些营销信息，或者可能会提示你创建一个新的 MySQL 帐户，以便你收到更改和更新的消息。这些不是软件安装的重要部分，你可以单击*“下一步”（Next）*或_“跳过”（Skip）_按钮继续安装。

现在出现向导已完成对话框。

点击*“完成”（Finish）*按钮。

### 配置 MySQL

事实上，安装并没有结束。对于某些安装程序，会弹出一个新屏幕，欢迎你使用 MySQL 服务器实例配置向导。如果没有发生这种情况，你需要自己加载。在 Windows 上，单击“开始”菜单，然后在程序组中导航到 MySQL-> MySQL Server 5.0（或你使用的任何版本号），然后再运行 MySQL Server Instance Config Wizard。点击*下一步*。

假设这是你第一次在此计算机上安装 MySQL，你可以选择标准配置（如果你要从旧版本的 MySQL 升级，则需要选择详细配置 - 这超出了此简单设置指南的范围）。点击*下一步*。在下一个对话框中，保留选中的默认选项（即，*安装为 Windows 服务；服务名称 = 'MySQL' 并自动启动 MySQL 服务器*）。然后单击*下一步*。

在下一个屏幕中，选中“修改安全设置”（Modify Security Settings），然后在前两个文本字段中输入相同的密码（你选择的密码）。你将在以后需要此密码，因此请记住它或将其记录在安全的位置。如果你可能需要从另一台计算机访问 MySQL，可以选中“从远程计算机启用 root 访问权限”（Enable root access from remote machines）。然后单击*下一步*。

<div class="note">

**注意：**默认的 MySQL 用户名是 "root"。密码是你刚输入的密码。以后在创建 Rails 应用程序时，你将需要这两项信息。
</div>

下一个屏幕只显示有关即将执行的任务的一些信息。单击*“执行”（Execute）*按钮。

<div class="note">

如果你以前安装或配置了 MySQL，则可能会看到一条错误消息，告诉你跳过安装。你可以单击*“重试”（Retry）*以查看是否可以绕过此问题。如果没有，请按 _Skip_ 键，然后重新启动 MySQL 配置过程，在出现提示时选择 <em>Reconfigure Instance</em> 和 Standard Instance。
</div>

安装完所有内容后，将出现此屏幕。单击*完成*。

就是这样！

## 附录 C：进一步阅读

以下是 Ruby 和 Rails 上一些最有用的书籍的简短列表...

### 书籍

- **Beginning Ruby: From Novice To Professional**

	by Peter Cooper $39.99 <br />
	APress: http://www.apress.com <br />
	ISBN: 1590597664 <br />
	这本书编写得很好，布局合理，解释清楚，代码示例很有用。简而言之，如果你已经拥有一些编程经验并希望获得 Ruby 世界的可访问介绍，那么这本书就是你的最佳选择。

- **Programming Ruby: The Pragmatic Programmer’s Guide**

	by Dave Thomas, with Chad Fowler and Andy Hunt $44.95 <br />
	ISBN: 0-9745140-5-5 (2 nd edition) <br />
	ISBN: 9781934356081 (3 rd edition) <br />
	Pragmatic: http://www.pragmaticprogrammer.com/titles/ruby/index.html
	有关 Ruby 语言和库的大量（超过 860 页）指南，所谓的“镐书”（pickaxe book）通常被认为是必不可少的 Ruby 参考。但是，阅读起来并不是轻松，（在我看来）它不是学习 Ruby 最好的“第一本书”。尽管如此，你可能迟早会需要它。第二版涵盖Ruby 1.8；第 3 版涵盖了 Ruby 1.9。

- **The Ruby Way**

	by Hal Fulton $39.99 <br />
	Addison-Wesley: http://www.awprofessional.com/ruby <br />
	ISBN: 0-672-32884-4 <br />
	在介绍部分，作者指出，由于相对缺乏“教程”材料，“你可能不会从这本书中学习 Ruby”。他把它描述为一种“反向引用”。不是按方法或类的名称查找，而是按功能或目的查找。我认为他大大低估了 The Ruby Way 的教程价值。然而，作者假定只你在编程方面相当熟练。

- **Ruby On Rails Up and Running**

	by Bruce A. Tate & Curt Hibbs $29.99 <br />
	O’Reilly: www.oreilly.com <br />
	ISBN: 0-596-10132-5 <br />
	我更喜欢编程书籍，而不需要太多的华夫饼干。坦率地说，我没有耐心通过 1000 多页的书籍或按照逐步指南来构建应用程序。所以这书吸引了我。在七章中，它涵盖了有关 Rails 的所有重要内容 - 它的设计模式和类；它的脚本和应用程序生成工具；它的模型，视图，控制器和脚手架; 以及使用 Ajax 和单元测试的概述。

- **Ruby For Rails**

	by David A. Black $44.95 <br />
	Manning : www.manning.com/black <br />
	ISBN 1-932394-69-9 <br />
	虽然本书主要关注 Rails 开发，但在每一步中都深入研究底层 Ruby 代码的内部工作方式。在十七章和不到 500 页的篇幅中，它将带你从第一次看从 Ruby 语言到创建 Rails 模型，控制器，视图，帮助和模板的细节。在此过程中，它解释了很多关于 Ruby 的内容，包括它的数组和散列，类，方法，块和迭代器。简而言之，如果你是 Ruby 新手，但想尽快加快 Rails 的学习速度，那么本书可能就是你所需要的。

- **Agile Web Development With Rails (3 rd edition)**

	by Sam Ruby, Dave Thomas and David Heinemeier Hansson $43.95 <br />
	Pragmatic:  http://pragprog.com/titles/rails3/agile-web-development-with-rails-third-edition <br />
	ISBN: 9781934356166 <br />
	这是关于 Rails “必备”的一本书。有几本 Ruby 编程书籍可能会争夺“必不可少”的主张，但我知道没有任何其它 Rails 书可以与 Agile Web Development 相媲美，因为它可以全面覆盖其主题。'Nuff 说：如果你认真对待 Ruby On Rails，那么买这本书吧！第 3 版涵盖了 Rails 2。

### E-Books

- **Learn To Program**

	第一版 Chris Pine 的书提供了对 Ruby 的简单介绍。 <br />
	http://pine.fm/LearnToProgram/

- **Programming Ruby: The Pragmatic Programmer’s Guide**

	可能是你读过的最奇怪的编程书 - 连同会说话的狐狸！ <br />
	http://poignantguide.net/ruby/

- **The Little Book Of Ruby**

	你正在读的这本书的配套书。 <br />
	http://www.sapphiresteel.com/The-Little-Book-Of-Ruby

## 附录 D：Web 站点

有无数的网站致力于 Ruby，Rails 和相关技术。以下是一些开始探索的内容...

### Ruby 和 Rails 信息

- **Ruby 语言站点**

	http://www.ruby-lang.org

- **Ruby 文档站点**

	http://www.ruby-doc.org/

- **Ruby 类库参考 (在线)**

	http://www.ruby-doc.org/core/

- **Ruby 类库参考（下载地址）**

	http://www.ruby-doc.org/downloads

- **Ruby On Rails 站点**

	http://www.rubyonrails.org/

- **The Book Of Ruby 作者的博客...**

	http://www.sapphiresteel.com/-Blog-

## 附录 E：Ruby 和 Rails 的开发软件

### 集成开发环境 IDE/编辑器

- **3rd Rail**

	http://www.codegear.com/products/3rdrail/ <br />
	Eclipse 的商业版 Rails-centric 集成开发环境。

- **Aptana IDE/ RADRails**

	http://www.aptana.com/ <br />
	Eclipse 的免费版 Rails-centric 集成开发环境。

- **Komodo**

	http://www.activestate.com/ <br />
	多语言（Ruby，Python，PHP，Perl，Pcl），跨平台商业集成开发环境。免费版也可用。

- **NetBeans**

	http://www.netbeans.org/products/ruby/ <br />
	NetBeans 的免费 Ruby 集成开发环境。

- **Ruby In Steel**

	http://www.sapphiresteel.com/ <br />
	适用于 Visual Studio 的商业 Ruby 和 Rails 集成开发环境。免费版也可用。

- **TextMate**

	http://www.macromates.com/ <br />
	Mac OS X 的 Ruby 编辑器。

### Web 服务器

以下是一些与 Ruby On Rails 一起使用的流行 Web 服务器。

- **WEBrick**

	http://www.webrick.org/

- **LightTPD**

	http://www.lighttpd.net/

- **Mongrel**

	http://mongrel.rubyforge.org/

- **Apache**

	http://www.apache.org/

### 数据库

- **MySQL**

	http://www.mysql.com/

- **SQLite**

	http://www.sqlite.org/

- **PostgreSQL**

	http://www.postgresql.org/

- **SQL Server Express**

	http://www.microsoft.com/sql/editions/express/

## 附录 F：Ruby 实现

在撰写本文时，Ruby 1.8.x 和 1.9.1 的版本都可用，并且将在未来某个日期发布版本 2.0。目前 Ruby 1.8.6 可能是 Ruby 使用最广泛的版本，本书的大部分内容适用于 Ruby 1.8。实际上，尽管 Ruby 1.9 已经发布，但为了支持使用该版本开发的项目，Ruby 1.8.x 仍将是一个重要的 Ruby 平台，包括使用 Ruby On Rails 和其它框架构建的应用程序。其它 Ruby 解释器，编译器和虚拟机也可用或正在开发中。以下是一个简短的网站列表，它将提供有关 Ruby 实现的更多信息（和下载）...

- **Ruby**

	“标准” Ruby 实现。 <br />
	http://www.ruby-lang.org/en/downloads/

- **JRuby**

	Ruby For Java。 <br />
	http://www.headius.com/

- **Iron Ruby**

	微软正在开发的 "Ruby For .NET"。 <br />
	http://www.ironruby.net/

- **Rubinius**

	用于 Ruby 的编译器/虚拟机（主要用 Ruby 编写）。 <br />
	http://rubini.us/

- **Maglev**

	快速 Ruby 实现（开发中）。 <br />
	http://maglev.gemstone.com/