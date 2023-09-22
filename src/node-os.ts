import os from 'os'

/**
 * 操作系统特定的行尾标记。
 *
 * POSIX 上是 \n
 * Windows 上是 \r\n
 */
console.log(11, os.EOL)
/**
 * 返回为其编译 Node.js 二进制文件的操作系统 CPU 架构。 可能的值为 'arm'、'arm64'、'ia32'、'mips'、'mipsel'、'ppc'、'ppc64'、's390'、's390x'、'x32' 和 'x64'。
 */
console.log(22, os.arch())
/**
 * 返回包含有关每个逻辑 CPU 内核的信息的对象数组。
 */
console.log(33, os.cpus())
/**
 * 返回当前用户的主目录的字符串路径。
 *
 * 在 POSIX 上，它使用 $HOME 环境变量（如果已定义）。 否则，它使用有效的 UID 来查找用户的主目录。
 * 在 Windows 上，它使用 USERPROFILE 环境变量（如果已定义）。 否则，它使用当前用户的配置文件目录的路径。
 */
console.log(44, os.homedir())
/**
 * 以字符串形式返回操作系统的主机名。
 */
console.log(55, os.hostname())
/**
 * 返回包含已分配网络地址的网络接口的对象。
 * 返回对象上的每个键都标识一个网络接口。 关联的值是每个对象描述一个分配的网络地址的对象数组。
 */
console.log(66, os.networkInterfaces())
/**
 * 返回 uname(3) 返回的操作系统名称。 例如，它在 Linux 上返回 'Linux'，在 macOS 上返回 'Darwin'，在 Windows 上返回 'Windows_NT'。
 */
console.log(77, os.type())
/**
 * 以秒为单位返回系统正常运行时间
 */
console.log(55, os.uptime())
/**
 * 返回标识内核版本的字符串。
 */
console.log(66, os.version())
