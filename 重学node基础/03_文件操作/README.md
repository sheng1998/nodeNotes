# <span id='top'>fs 文件系统</span>
## 常用的 fs 方法[⇧](#top)
| 方法 | 说明 |
| ---- | ---- |
| [fs.access](#access) | 检查文件或目录是否存在以及其读写等权限。 |
| [fs.appendFile](#appendFile) | 追加数据到文件，如果文件尚不存在则创建文件。 |
| [fs.close](#close) | 关闭在内存中打开的文件。 |
| [fs.copyFile](#copyFile) | 复制文件。 |
| [fs.existsSync](#existsSync) | 同步检查文件、目录是否存在。 |
| [fs.link](#link) | 创建硬链接文件(两个文件会自动同步文件内容。) |
| [fs.mkdir](#mkdir) | 异步地创建文件夹。 |
| [fs.open](#open) | 异步地打开文件。 |
| [fs.read](#read) | 从 fd 指定的文件中读取数据。 |
| [fs.readFile](#readFile) | 高度封装的read()方法. |
| [fs.readdir](#readdir) | 以数组的形式获取指定文件夹下的文件以及目录。 |
| [fs.rename](#rename) | 异步地把 oldPath 文件重命名为 newPath 提供的路径名。 如果 newPath 已存在，则覆盖它。该方法也可以移动文件夹。 |

<br />

## 文件系统标志[⇧](#top)
| 标志 | 说明|
| ---- | ---- |
| a | 打开文件用于追加。 如果文件不存在，则创建该文件。 |
| ax | 类似于 'a'，但如果路径存在，则失败。 |
| a+ | 打开文件用于读取和追加。 如果文件不存在，则创建该文件。 |
| ax+ | 类似于 'a+'，但如果路径存在，则失败。 |
| as | 打开文件用于追加（在同步模式中）。 如果文件不存在，则创建该文件。 |
| as+ | 打开文件用于读取和追加（在同步模式中）。 如果文件不存在，则创建该文件。 |
| r | 打开文件用于读取。 如果文件不存在，则会发生异常。 |
| r+ | 打开文件用于读取和写入。 如果文件不存在，则会发生异常。 |
| rs+ | 打开文件用于读取和写入（在同步模式中）。 指示操作系统绕过本地的文件系统缓存。 |
| w | 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。 |
| wx | 类似于 'w'，但如果路径存在，则失败。 |
| w+ | 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件。 |
| wx+ | 类似于 'w+'，但如果路径存在，则失败。 |

<br />

## 打开文件
### 异步打开文件
#### <span id='open'>fs.open(path[, flags[, mode]], callback)</span>[⇧](#top)
异步地打开文件，返回的是文件操作符 fd。
参数说明：
* path: 必需，需要打开的文件路径，不存在就报错。
* flags: 可选，文件系统的标志，默认为 'r'。
* mode: 可选，默认值: 0o666（可读写）
* callback: 必需，有两个返回值
    * err: 错误回调
    * fd: 文件操作符
```javascript
fs.open('./test.txt', (err, fd) => {
    if(err) {
        console.log(err)
    } else {
        console.log(fd)
    }
})
```

<br />

### 同步打开文件
#### fs.opendir(path[, options], callback)[⇧](#top)
参数说明看[fs.open(path[, flags[, mode]], callback)](#open)

<br />

## 读取文件/目录
### 异步读取文件/目录
#### <span id='read'>fs.read(fd, [options,] callback)</span>[⇧](#top)
从 fd 指定的文件中读取数据。还有一种用法：`fs.read(fd, buffer, offset, length, position, callback)`
参数说明：
* fd: 必需，文件操作符
* options: 可选，该参数为对象类型
    * buffer: 默认值：`Buffer.alloc(16384)`
    * offset: 默认值：`0`
    * length: 默认值： `buffer.length`
    * position: 默认值：`null`
* callback: 必需，有三个参数
    * err: 错误回调
    * bytesRead: 读取到的字节数
    * buffer: 读取到的内容（Buffer类型）

<br />

#### <span id='readFile'>fs.readFile(path[, options], callback)</span>[⇧](#top)
封装好的 `fs.read()`, 一般都是用这种方式读取文件
参数说明：
* path: 必需，需要读取的文件的路径
* options: 可选，该参数为对象类型
    * encoding: 读取的字符编码，默认值为：`null`
    * flag: 对文件的操作，默认值为 'r',可选值看[文件系统标志](#文件系统标志)处。
* callback: 必需
    * err: 错误回调
    * data: 读取到的数据，如果不指定字符编码该值默认为 Buffer 类型。
```javascript
fs.readFile('./test.txt', {flag: 'r', encoding: 'utf-8'}, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
```

<br />

#### <span id='readdir'>fs.readdir(path[, options], callback)</span>[⇧](#top)
以数组的形式获取指定文件夹下的文件以及目录。

<br />

### 同步读取文件/目录
#### fs.readSync(fd, buffer, [options])[⇧](#top)
同步读取文件，返回 bytesRead 的数量。另一种用法：`fs.readSync(fd, buffer, offset, length, position)`
参数说明看[fs.read(fd, [options,] callback)](#read)

<br />

#### fs.readFileSync(path[, options])[⇧](#top)
参数说明看[fs.readFile(path[, options], callback)](#readFile)

<br />

#### fs.readdirSync(path[, options])[⇧](#top)
以数组的形式获取指定文件夹下的文件以及目录。
参数说明看[fs.readdir(path[, options], callback)](#readdir)

<br />

## 创建/写入文件
### 异步创建/写入文件
#### <span id='appendFile'>fs.appendFile(path, data[, options], callback)</span>[⇧](#top)
异步地追加数据到文件，如果文件尚不存在则创建文件。 data 可以是字符串或 Buffer。
参数说明：
* path: 必需，需要追加数据的文件路径，也可以是文件描述符。
* data: 必需，需要追加到文件的数据内容。
* options: 可选，该参数是一个对象，对象的键可以为：
    * encoding: 字符编码，默认值为：utf-8
    * mode: 不太清楚，默认值为：0o666
    * flag: 对文件的操作，默认值为 'a',可选值看[文件系统标志](#文件系统标志)处。
* callback: 必需，只有一个参数
    * err: 错误回调

```javascript
fs.appendFile('文件.txt', '追加的数据', {flag: 'a', encoding: 'utf-8'}, (err) => {
    if (err) throw err;
    console.log('数据已被追加到文件');
});
```

<br />

#### <span id='link'>fs.link(existingPath, newPath, callback)</span>[⇧](#top)
创建硬链接文件(两个文件会自动同步文件内容，一个文件修改了，另一个也会被修改，但是删除一个，另一个还在。)
参数说明：
* existingPath: 必需，源文件路径
* newPath: 必需，新创建的硬链接文件路径
* callback: 必需，参数只有一个
    * err: 错误回调
```javascript
fs.link('./test1.txt', './test2.txt', err => {
    if(err) {
        throw err
    } else {
        console.log('success!')
    }
})
```

<br />

### 同步创建/写入文件
#### fs.appendFileSync(path, data[, options])[⇧](#top)
参数说明看[fs.appendFile(path, data[, options], callback)](#appendFile)

<br />

#### <span id='linkSync'>fs.linkSync(existingPath, newPath)</span>[⇧](#top)
参数说明看[fs.link(existingPath, newPath, callback)](#link)

<br />

## 关闭文件
### 异步关闭文件
#### <span id='close'>fs.close(fd, callback)</span>**[⇧](#top)**
异步关闭已经打开的文件。
参数说明：
* fd: 必需，文件描述符
* callback: 必需，只有一个参数
    * err: 错误回调

```javascript
// 异步关闭文件
fs.close(fd, err => {
    if(err) {
        throw err
    } else {
        console.log('文件已关闭！')
    }
})
```

<br />

### 同步关闭文件
#### fs.closeSync(fd)**[⇧](#top)**
参数说明看[fs.close(fd, callback)](#close)

<br />

## 创建文件夹
### 异步创建文件夹
#### <span id='mkdir'>fs.mkdir(path[, options], callback)</span>**[⇧](#top)**
异步地创建文件夹（目录）。
参数说明：

* path: 必需，创建的文件夹路径
* options: 可选，该参数为对象类型
    * recursive: 默认为 false, 表示是否创建父目录。当取值为 false 时，如果父目录不存在就会报错。
    * mode: &lt;string> | &lt;integer> 在 Windows 上不支持。默认值: 0o777。
* callback: 必需，只有一个参数
    * err: 错误回调
```javascript
fs.mkdir('./dir/dir', {recursive: true}, err => {
    if(err) {
        throw err
    } else {
        console.log('文件夹创建成功！')
    }
})
```

<br />

### 同步创建文件夹
#### fs.mkdirSync(path[, options])**[⇧](#top)**
参数说明看[fs.mkdir(path[, options], callback)](#mkdir)

<br />


## 重命名文件/目录
### 异步重命名文件/目录
#### <span id='rename'>fs.rename(oldPath, newPath, callback)</span>[⇧](#top)
异步地把 oldPath 文件重命名为 newPath 提供的路径名。 如果 newPath 已存在，则覆盖它。
```javascript
// 该方法需要存在下面的文件和文件夹
// 异步重命名文件，该方法也可以移动文件
fs.rename('./test3.txt', './test2.txt', err => {
    if(err) {
        console.log('重命名失败！')
    } else {
        console.log('重命名成功！')
    }
})
```

<br />

### 异步重命名文件/目录
#### fs.renameSync(oldPath, newPath)[⇧](#top)
参数说明看[fs.rename(oldPath, newPath, callback)](#rename)

<br />

## 删除文件/目录

<br />

## 复制文件
### 异步复制文件
#### <span id='copyFile'>fs.copyFile(src, dest[, mode], callback)</span>**[⇧](#top)**
将文件 `src` 复制到 `dest` 处，默认如果 `dest` 已经存在就覆盖它。
参数说明：
* src: 必需，要被复制的文件路径(携带文件名及后缀)
* dest: 必需，文件被复制到的路径(携带文件名及后缀)
* mode: 是一个可选的整数，默认值为 0（表示覆盖复制），指定拷贝操作的行为。 可以创建由两个或更多个值按位或组成的掩码（比如 fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE）。
    * fs.constants.COPYFILE_EXCL: 如果 dest 已存在，则拷贝操作将失败。
    * fs.constants.COPYFILE_FICLONE: 拷贝操作将尝试创建写时拷贝（copy-on-write）链接。如果平台不支持写时拷贝，则使用后备的拷贝机制。
    * fs.constants.COPYFILE_FICLONE_FORCE: 拷贝操作将尝试创建写时拷贝链接。如果平台不支持写时拷贝，则拷贝操作将失败。
* callback: 必需，只有一个参数
    * err: 错误回调

```javascript
fs.copyFile('./test.txt', './test2.txt', 0, err => {
    if(err) {
        throw err
    } else {
        console.log('文件复制成功！')
    }
})
```

<br />

#### [fs.link(existingPath, newPath, callback)](#link)**[⇧](#top)**
>注意：这种方式复制会将两个文件关联在一起

<br />

### 同步复制文件
#### fs.copyFileSync(src, dest[, mode])**[⇧](#top)**
参数说明看[fs.copyFile(src, dest[, mode], callback)](#copyFile)

<br />

#### [fs.linkSync(existingPath, newPath)](#linkSync)**[⇧](#top)**
>注意：这种方式复制会将两个文件关联在一起

<br />


## 检查文件/目录

### 异步检查文件/目录
#### <span id='access'>fs.access(path[, mode], callback)</span>**[⇧](#top)**
检查文件或目录是否存在以及其读写等权限。`（新增于: v0.11.15）`
参数说明：
* path: 必需，需要检查的文件的路径。
* mode: 可选，四个可选值
    * fs.constants.F_OK: 是否存在指定目录。(文档解释：表明文件对调用进程可见。)
    * fs.constants.R_OK: 是否可读。(文档解释：表明文件对调用进程可见。)
    * fs.constants.W_OK: 是否可写。(文档解释：表明文件对调用进程可见。)
    * fs.constants.X_OK: (文档解释：表明调用进程可以执行文件。)
* callback: 必需，只有一个参数
    * err: 错误回调

```javascript
const file = 'package.json';

// 检查文件是否存在于当前目录中。
fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? '不存在' : '存在'}`);
});

// 检查目录是否存在于当前目录中。
fs.access('dir', fs.constants.F_OK, err => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('文件夹dir不存在！')
        } else {
            throw err
        }
    } else {
        console.log('文件夹dir存在！')
    }
})

// 检查文件是否可读。
fs.access(file, fs.constants.R_OK, (err) => {
    console.log(`${file} ${err ? '不可读' : '可读'}`);
});

// 检查文件是否可写。
fs.access(file, fs.constants.W_OK, (err) => {
    console.log(`${file} ${err ? '不可写' : '可写'}`);
});

// 检查文件是否存在于当前目录中、以及是否可写。
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error(`${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
    } else {
        console.log(`${file} 存在，且可写`);
    }
});
```

<br />

### 同步检查文件/目录
#### fs.accessSync(path[, mode])**[⇧](#top)**
参数说明看[fs.access(path[, mode], callback)](#access)

<br>

#### <span id='existsSync'>fs.existsSync(path)</span>
如果路径存在，则返回 true，否则返回 false。
>注意：fs.exists() 已经弃用。

参数说明：
* path: 需要检查的路径（可以是文件或目录）
```javascript
if (fs.existsSync('./test.txt')) {
    console.log('该路径已存在');
}
```
