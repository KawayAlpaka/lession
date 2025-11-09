windows 11 中，d安装 langchain 报错。
安装命令：pip insrtall langchain langchain-text-splitters langchain-community bs4 -i https://pypi.tuna.tsinghua.edu.cn/simple 。
错误信息：note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for greenlet
  Building wheel for ormsgpack (pyproject.toml) ... error
  error: subprocess-exited-with-error

  × Building wheel for ormsgpack (pyproject.toml) did not run successfully.
  │ exit code: 1
  ╰─> [41 lines of output]
      Running `maturin pep517 build-wheel -i E:\study\lession\ai\langchain\rag_env\Scripts\python.exe --compatibility off --target i686-pc-windows-msvc`
      馃摝 Including license file `LICENSE-APACHE`
      馃摝 Including license file `LICENSE-MIT`
      馃嵐 Building a mixed python/rust project
      馃敆 Found pyo3 bindings
      馃悕 Found CPython 3.12 at E:\study\lession\ai\langchain\rag_env\Scripts\python.exe
         Compiling target-lexicon v0.13.2
         Compiling autocfg v1.4.0
         Compiling libc v0.2.171
         Compiling serde_core v1.0.228
         Compiling version_check v0.9.5
         Compiling zerocopy v0.8.25
         Compiling once_cell v1.21.3
         Compiling cfg-if v1.0.0
         Compiling serde v1.0.228
         Compiling bytecount v0.6.9
         Compiling smallvec v1.15.1
         Compiling byteorder v1.5.0
         Compiling itoa v1.0.15
         Compiling simdutf8 v0.1.5
         Compiling half v2.6.0
      error: linker `link.exe` not found
        |
        = note: program not found

      note: the msvc targets depend on the msvc linker but `link.exe` was not found

      note: please ensure that Visual Studio 2017 or later, or Build Tools for Visual Studio were installed with the Visual C++ option.

      note: VS Code is a different product, and is not sufficient.

      error: could not compile `serde_core` (build script) due to 1 previous error
      warning: build failed, waiting for other jobs to finish...
      error: could not compile `serde` (build script) due to 1 previous error
      error: could not compile `libc` (build script) due to 1 previous error
      error: could not compile `zerocopy` (build script) due to 1 previous error
      error: could not compile `target-lexicon` (build script) due to 1 previous error
      馃挜 maturin failed
        Caused by: Failed to build a native library through cargo
        Caused by: Cargo build finished with "exit code: 101": `"cargo" "rustc" "--target" "i686-pc-windows-msvc" "--message-format" "json-render-diagnostics" "--manifest-path" "C:\\Users\\my917\\AppData\\Local\\Temp\\pip-install-ebnw70jb\\ormsgpack_75f1e1d0caa548e681cd04d177f3d0e5\\Cargo.toml" "--release" "--lib"`
      Error: command ['maturin', 'pep517', 'build-wheel', '-i', 'E:\\study\\lession\\ai\\langchain\\rag_env\\Scripts\\python.exe', '--compatibility', 'off', '--target', 'i686-pc-windows-msvc'] returned non-zero exit status 1
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for ormsgpack
Failed to build greenlet ormsgpack
error: failed-wheel-build-for-install

× Failed to build installable wheels for some pyproject.toml based projects
╰─> greenlet, ormsgpack