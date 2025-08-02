'use strict';

var fs$2 = require('fs');
var path = require('path');
var require$$0 = require('zlib');
var require$$0$1 = require('crypto');
var require$$0$2 = require('constants');
var require$$0$3 = require('stream');
var require$$4 = require('util');
var require$$5 = require('assert');

var EditorFramework = globalThis.orion["@orion/orion-sdk/EditorFramework"];

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var util = {exports: {}};

var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  constants = {
    /* The local file header */
    LOCHDR: 30,
    // LOC header size
    LOCSIG: 0x04034b50,
    // "PK\003\004"
    LOCVER: 4,
    // version needed to extract
    LOCFLG: 6,
    // general purpose bit flag
    LOCHOW: 8,
    // compression method
    LOCTIM: 10,
    // modification time (2 bytes time, 2 bytes date)
    LOCCRC: 14,
    // uncompressed file crc-32 value
    LOCSIZ: 18,
    // compressed size
    LOCLEN: 22,
    // uncompressed size
    LOCNAM: 26,
    // filename length
    LOCEXT: 28,
    // extra field length

    /* The Data descriptor */
    EXTSIG: 0x08074b50,
    // "PK\007\008"
    EXTHDR: 16,
    // EXT header size
    EXTCRC: 4,
    // uncompressed file crc-32 value
    EXTSIZ: 8,
    // compressed size
    EXTLEN: 12,
    // uncompressed size

    /* The central directory file header */
    CENHDR: 46,
    // CEN header size
    CENSIG: 0x02014b50,
    // "PK\001\002"
    CENVEM: 4,
    // version made by
    CENVER: 6,
    // version needed to extract
    CENFLG: 8,
    // encrypt, decrypt flags
    CENHOW: 10,
    // compression method
    CENTIM: 12,
    // modification time (2 bytes time, 2 bytes date)
    CENCRC: 16,
    // uncompressed file crc-32 value
    CENSIZ: 20,
    // compressed size
    CENLEN: 24,
    // uncompressed size
    CENNAM: 28,
    // filename length
    CENEXT: 30,
    // extra field length
    CENCOM: 32,
    // file comment length
    CENDSK: 34,
    // volume number start
    CENATT: 36,
    // internal file attributes
    CENATX: 38,
    // external file attributes (host system dependent)
    CENOFF: 42,
    // LOC header offset

    /* The entries in the end of central directory */
    ENDHDR: 22,
    // END header size
    ENDSIG: 0x06054b50,
    // "PK\005\006"
    ENDSUB: 8,
    // number of entries on this disk
    ENDTOT: 10,
    // total number of entries
    ENDSIZ: 12,
    // central directory size in bytes
    ENDOFF: 16,
    // offset of first CEN header
    ENDCOM: 20,
    // zip file comment length

    END64HDR: 20,
    // zip64 END header size
    END64SIG: 0x07064b50,
    // zip64 Locator signature, "PK\006\007"
    END64START: 4,
    // number of the disk with the start of the zip64
    END64OFF: 8,
    // relative offset of the zip64 end of central directory
    END64NUMDISKS: 16,
    // total number of disks

    ZIP64SIG: 0x06064b50,
    // zip64 signature, "PK\006\006"
    ZIP64HDR: 56,
    // zip64 record minimum size
    ZIP64LEAD: 12,
    // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE: 4,
    // zip64 size of the central directory record
    ZIP64VEM: 12,
    // zip64 version made by
    ZIP64VER: 14,
    // zip64 version needed to extract
    ZIP64DSK: 16,
    // zip64 number of this disk
    ZIP64DSKDIR: 20,
    // number of the disk with the start of the record directory
    ZIP64SUB: 24,
    // number of entries on this disk
    ZIP64TOT: 32,
    // total number of entries
    ZIP64SIZB: 40,
    // zip64 central directory size in bytes
    ZIP64OFF: 48,
    // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA: 56,
    // extensible data sector

    /* Compression methods */
    STORED: 0,
    // no compression
    SHRUNK: 1,
    // shrunk
    REDUCED1: 2,
    // reduced with compression factor 1
    REDUCED2: 3,
    // reduced with compression factor 2
    REDUCED3: 4,
    // reduced with compression factor 3
    REDUCED4: 5,
    // reduced with compression factor 4
    IMPLODED: 6,
    // imploded
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED: 8,
    // deflated
    ENHANCED_DEFLATED: 9,
    // enhanced deflated
    PKWARE: 10,
    // PKWare DCL imploded
    // 11 reserved by PKWARE
    BZIP2: 12,
    //  compressed using BZIP2
    // 13 reserved by PKWARE
    LZMA: 14,
    // LZMA
    // 15-17 reserved by PKWARE
    IBM_TERSE: 18,
    // compressed using IBM TERSE
    IBM_LZ77: 19,
    // IBM LZ77 z
    AES_ENCRYPT: 99,
    // WinZIP AES encryption method

    /* General purpose bit flag */
    // values can obtained with expression 2**bitnr
    FLG_ENC: 1,
    // Bit 0: encrypted file
    FLG_COMP1: 2,
    // Bit 1, compression option
    FLG_COMP2: 4,
    // Bit 2, compression option
    FLG_DESC: 8,
    // Bit 3, data descriptor
    FLG_ENH: 16,
    // Bit 4, enhanced deflating
    FLG_PATCH: 32,
    // Bit 5, indicates that the file is compressed patched data.
    FLG_STR: 64,
    // Bit 6, strong encryption (patented)
    // Bits 7-10: Currently unused.
    FLG_EFS: 2048,
    // Bit 11: Language encoding flag (EFS)
    // Bit 12: Reserved by PKWARE for enhanced compression.
    // Bit 13: encrypted the Central Directory (patented).
    // Bits 14-15: Reserved by PKWARE.
    FLG_MSK: 4096,
    // mask header values

    /* Load type */
    FILE: 2,
    BUFFER: 1,
    NONE: 0,
    /* 4.5 Extensible data fields */
    EF_ID: 0,
    EF_SIZE: 2,
    /* Header IDs */
    ID_ZIP64: 0x0001,
    ID_AVINFO: 0x0007,
    ID_PFS: 0x0008,
    ID_OS2: 0x0009,
    ID_NTFS: 0x000a,
    ID_OPENVMS: 0x000c,
    ID_UNIX: 0x000d,
    ID_FORK: 0x000e,
    ID_PATCH: 0x000f,
    ID_X509_PKCS7: 0x0014,
    ID_X509_CERTID_F: 0x0015,
    ID_X509_CERTID_C: 0x0016,
    ID_STRONGENC: 0x0017,
    ID_RECORD_MGT: 0x0018,
    ID_X509_PKCS7_RL: 0x0019,
    ID_IBM1: 0x0065,
    ID_IBM2: 0x0066,
    ID_POSZIP: 0x4690,
    EF_ZIP64_OR_32: 0xffffffff,
    EF_ZIP64_OR_16: 0xffff,
    EF_ZIP64_SUNCOMP: 0,
    EF_ZIP64_SCOMP: 8,
    EF_ZIP64_RHO: 16,
    EF_ZIP64_DSN: 24
  };
  return constants;
}

var errors = {};

var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  (function (exports) {
    const errors = {
      /* Header error messages */
      INVALID_LOC: "Invalid LOC header (bad signature)",
      INVALID_CEN: "Invalid CEN header (bad signature)",
      INVALID_END: "Invalid END header (bad signature)",
      /* Descriptor */
      DESCRIPTOR_NOT_EXIST: "No descriptor present",
      DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
      DESCRIPTOR_FAULTY: "Descriptor data is malformed",
      /* ZipEntry error messages*/
      NO_DATA: "Nothing to decompress",
      BAD_CRC: "CRC32 checksum failed {0}",
      FILE_IN_THE_WAY: "There is a file in the way: {0}",
      UNKNOWN_METHOD: "Invalid/unsupported compression method",
      /* Inflater error messages */
      AVAIL_DATA: "inflate::Available inflate data did not terminate",
      INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
      TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
      INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
      INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
      INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
      INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
      INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
      INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
      INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
      /* ADM-ZIP error messages */
      CANT_EXTRACT_FILE: "Could not extract the file",
      CANT_OVERRIDE: "Target file already exists",
      DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
      NO_ZIP: "No zip file was loaded",
      NO_ENTRY: "Entry doesn't exist",
      DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
      FILE_NOT_FOUND: 'File not found: "{0}"',
      NOT_IMPLEMENTED: "Not implemented",
      INVALID_FILENAME: "Invalid filename",
      INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
      INVALID_PASS_PARAM: "Incompatible password parameter",
      WRONG_PASSWORD: "Wrong Password",
      /* ADM-ZIP */
      COMMENT_TOO_LONG: "Comment is too long",
      // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
      EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
    };

    // template
    function E(message) {
      return function (...args) {
        if (args.length) {
          // Allow {0} .. {9} arguments in error message, based on argument number
          message = message.replace(/\{(\d)\}/g, (_, n) => args[n] || '');
        }
        return new Error('ADM-ZIP: ' + message);
      };
    }

    // Init errors with template
    for (const msg of Object.keys(errors)) {
      exports[msg] = E(errors[msg]);
    }
  })(errors);
  return errors;
}

var utils$2;
var hasRequiredUtils$2;
function requireUtils$2() {
  if (hasRequiredUtils$2) return utils$2;
  hasRequiredUtils$2 = 1;
  const fsystem = fs$2;
  const pth = path;
  const Constants = requireConstants();
  const Errors = requireErrors();
  const isWin = typeof process === "object" && "win32" === process.platform;
  const is_Obj = obj => typeof obj === "object" && obj !== null;

  // generate CRC32 lookup table
  const crcTable = new Uint32Array(256).map((t, c) => {
    for (let k = 0; k < 8; k++) {
      if ((c & 1) !== 0) {
        c = 0xedb88320 ^ c >>> 1;
      } else {
        c >>>= 1;
      }
    }
    return c >>> 0;
  });

  // UTILS functions

  function Utils(opts) {
    this.sep = pth.sep;
    this.fs = fsystem;
    if (is_Obj(opts)) {
      // custom filesystem
      if (is_Obj(opts.fs) && typeof opts.fs.statSync === "function") {
        this.fs = opts.fs;
      }
    }
  }
  utils$2 = Utils;

  // INSTANTIABLE functions

  Utils.prototype.makeDir = function (/*String*/folder) {
    const self = this;

    // Sync - make directories tree
    function mkdirSync(/*String*/fpath) {
      let resolvedPath = fpath.split(self.sep)[0];
      fpath.split(self.sep).forEach(function (name) {
        if (!name || name.substr(-1, 1) === ":") return;
        resolvedPath += self.sep + name;
        var stat;
        try {
          stat = self.fs.statSync(resolvedPath);
        } catch (e) {
          self.fs.mkdirSync(resolvedPath);
        }
        if (stat && stat.isFile()) throw Errors.FILE_IN_THE_WAY(`"${resolvedPath}"`);
      });
    }
    mkdirSync(folder);
  };
  Utils.prototype.writeFileTo = function (/*String*/path, /*Buffer*/content, /*Boolean*/overwrite, /*Number*/attr) {
    const self = this;
    if (self.fs.existsSync(path)) {
      if (!overwrite) return false; // cannot overwrite

      var stat = self.fs.statSync(path);
      if (stat.isDirectory()) {
        return false;
      }
    }
    var folder = pth.dirname(path);
    if (!self.fs.existsSync(folder)) {
      self.makeDir(folder);
    }
    var fd;
    try {
      fd = self.fs.openSync(path, "w", 0o666); // 0666
    } catch (e) {
      self.fs.chmodSync(path, 0o666);
      fd = self.fs.openSync(path, "w", 0o666);
    }
    if (fd) {
      try {
        self.fs.writeSync(fd, content, 0, content.length, 0);
      } finally {
        self.fs.closeSync(fd);
      }
    }
    self.fs.chmodSync(path, attr || 0o666);
    return true;
  };
  Utils.prototype.writeFileToAsync = function (/*String*/path, /*Buffer*/content, /*Boolean*/overwrite, /*Number*/attr, /*Function*/callback) {
    if (typeof attr === "function") {
      callback = attr;
      attr = undefined;
    }
    const self = this;
    self.fs.exists(path, function (exist) {
      if (exist && !overwrite) return callback(false);
      self.fs.stat(path, function (err, stat) {
        if (exist && stat.isDirectory()) {
          return callback(false);
        }
        var folder = pth.dirname(path);
        self.fs.exists(folder, function (exists) {
          if (!exists) self.makeDir(folder);
          self.fs.open(path, "w", 0o666, function (err, fd) {
            if (err) {
              self.fs.chmod(path, 0o666, function () {
                self.fs.open(path, "w", 0o666, function (err, fd) {
                  self.fs.write(fd, content, 0, content.length, 0, function () {
                    self.fs.close(fd, function () {
                      self.fs.chmod(path, attr || 0o666, function () {
                        callback(true);
                      });
                    });
                  });
                });
              });
            } else if (fd) {
              self.fs.write(fd, content, 0, content.length, 0, function () {
                self.fs.close(fd, function () {
                  self.fs.chmod(path, attr || 0o666, function () {
                    callback(true);
                  });
                });
              });
            } else {
              self.fs.chmod(path, attr || 0o666, function () {
                callback(true);
              });
            }
          });
        });
      });
    });
  };
  Utils.prototype.findFiles = function (/*String*/path) {
    const self = this;
    function findSync(/*String*/dir, /*RegExp*/pattern, /*Boolean*/recursive) {
      if (typeof pattern === "boolean") {
        recursive = pattern;
        pattern = undefined;
      }
      let files = [];
      self.fs.readdirSync(dir).forEach(function (file) {
        const path = pth.join(dir, file);
        const stat = self.fs.statSync(path);
        if (!pattern || pattern.test(path)) {
          files.push(pth.normalize(path) + (stat.isDirectory() ? self.sep : ""));
        }
        if (stat.isDirectory() && recursive) files = files.concat(findSync(path, pattern, recursive));
      });
      return files;
    }
    return findSync(path, undefined, true);
  };

  /**
   * Callback for showing if everything was done.
   *
   * @callback filelistCallback
   * @param {Error} err - Error object
   * @param {string[]} list - was request fully completed
   */

  /**
   *
   * @param {string} dir
   * @param {filelistCallback} cb
   */
  Utils.prototype.findFilesAsync = function (dir, cb) {
    const self = this;
    let results = [];
    self.fs.readdir(dir, function (err, list) {
      if (err) return cb(err);
      let list_length = list.length;
      if (!list_length) return cb(null, results);
      list.forEach(function (file) {
        file = pth.join(dir, file);
        self.fs.stat(file, function (err, stat) {
          if (err) return cb(err);
          if (stat) {
            results.push(pth.normalize(file) + (stat.isDirectory() ? self.sep : ""));
            if (stat.isDirectory()) {
              self.findFilesAsync(file, function (err, res) {
                if (err) return cb(err);
                results = results.concat(res);
                if (! --list_length) cb(null, results);
              });
            } else {
              if (! --list_length) cb(null, results);
            }
          }
        });
      });
    });
  };
  Utils.prototype.getAttributes = function () {};
  Utils.prototype.setAttributes = function () {};

  // STATIC functions

  // crc32 single update (it is part of crc32)
  Utils.crc32update = function (crc, byte) {
    return crcTable[(crc ^ byte) & 0xff] ^ crc >>> 8;
  };
  Utils.crc32 = function (buf) {
    if (typeof buf === "string") {
      buf = Buffer.from(buf, "utf8");
    }
    let len = buf.length;
    let crc = ~0;
    for (let off = 0; off < len;) crc = Utils.crc32update(crc, buf[off++]);
    // xor and cast as uint32 number
    return ~crc >>> 0;
  };
  Utils.methodToString = function (/*Number*/method) {
    switch (method) {
      case Constants.STORED:
        return "STORED (" + method + ")";
      case Constants.DEFLATED:
        return "DEFLATED (" + method + ")";
      default:
        return "UNSUPPORTED (" + method + ")";
    }
  };

  /**
   * removes ".." style path elements
   * @param {string} path - fixable path
   * @returns string - fixed filepath
   */
  Utils.canonical = function (/*string*/path) {
    if (!path) return "";
    // trick normalize think path is absolute
    const safeSuffix = pth.posix.normalize("/" + path.split("\\").join("/"));
    return pth.join(".", safeSuffix);
  };

  /**
   * fix file names in achive
   * @param {string} path - fixable path
   * @returns string - fixed filepath
   */

  Utils.zipnamefix = function (path) {
    if (!path) return "";
    // trick normalize think path is absolute
    const safeSuffix = pth.posix.normalize("/" + path.split("\\").join("/"));
    return pth.posix.join(".", safeSuffix);
  };

  /**
   *
   * @param {Array} arr
   * @param {function} callback
   * @returns
   */
  Utils.findLast = function (arr, callback) {
    if (!Array.isArray(arr)) throw new TypeError("arr is not array");
    const len = arr.length >>> 0;
    for (let i = len - 1; i >= 0; i--) {
      if (callback(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return void 0;
  };

  // make abolute paths taking prefix as root folder
  Utils.sanitize = function (/*string*/prefix, /*string*/name) {
    prefix = pth.resolve(pth.normalize(prefix));
    var parts = name.split("/");
    for (var i = 0, l = parts.length; i < l; i++) {
      var path = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)));
      if (path.indexOf(prefix) === 0) {
        return path;
      }
    }
    return pth.normalize(pth.join(prefix, pth.basename(name)));
  };

  // converts buffer, Uint8Array, string types to buffer
  Utils.toBuffer = function toBuffer(/*buffer, Uint8Array, string*/input, /* function */encoder) {
    if (Buffer.isBuffer(input)) {
      return input;
    } else if (input instanceof Uint8Array) {
      return Buffer.from(input);
    } else {
      // expect string all other values are invalid and return empty buffer
      return typeof input === "string" ? encoder(input) : Buffer.alloc(0);
    }
  };
  Utils.readBigUInt64LE = function (/*Buffer*/buffer, /*int*/index) {
    var slice = Buffer.from(buffer.slice(index, index + 8));
    slice.swap64();
    return parseInt(`0x${slice.toString("hex")}`);
  };
  Utils.fromDOS2Date = function (val) {
    return new Date((val >> 25 & 0x7f) + 1980, Math.max((val >> 21 & 0x0f) - 1, 0), Math.max(val >> 16 & 0x1f, 1), val >> 11 & 0x1f, val >> 5 & 0x3f, (val & 0x1f) << 1);
  };
  Utils.fromDate2DOS = function (val) {
    let date = 0;
    let time = 0;
    if (val.getFullYear() > 1979) {
      date = (val.getFullYear() - 1980 & 0x7f) << 9 | val.getMonth() + 1 << 5 | val.getDate();
      time = val.getHours() << 11 | val.getMinutes() << 5 | val.getSeconds() >> 1;
    }
    return date << 16 | time;
  };
  Utils.isWin = isWin; // Do we have windows system
  Utils.crcTable = crcTable;
  return utils$2;
}

var fattr;
var hasRequiredFattr;
function requireFattr() {
  if (hasRequiredFattr) return fattr;
  hasRequiredFattr = 1;
  const pth = path;
  fattr = function (/*String*/path, /*Utils object*/{
    fs
  }) {
    var _path = path || "",
      _obj = newAttr(),
      _stat = null;
    function newAttr() {
      return {
        directory: false,
        readonly: false,
        hidden: false,
        executable: false,
        mtime: 0,
        atime: 0
      };
    }
    if (_path && fs.existsSync(_path)) {
      _stat = fs.statSync(_path);
      _obj.directory = _stat.isDirectory();
      _obj.mtime = _stat.mtime;
      _obj.atime = _stat.atime;
      _obj.executable = (0o111 & _stat.mode) !== 0; // file is executable who ever har right not just owner
      _obj.readonly = (0o200 & _stat.mode) === 0; // readonly if owner has no write right
      _obj.hidden = pth.basename(_path)[0] === ".";
    } else {
      console.warn("Invalid path: " + _path);
    }
    return {
      get directory() {
        return _obj.directory;
      },
      get readOnly() {
        return _obj.readonly;
      },
      get hidden() {
        return _obj.hidden;
      },
      get mtime() {
        return _obj.mtime;
      },
      get atime() {
        return _obj.atime;
      },
      get executable() {
        return _obj.executable;
      },
      decodeAttributes: function () {},
      encodeAttributes: function () {},
      toJSON: function () {
        return {
          path: _path,
          isDirectory: _obj.directory,
          isReadOnly: _obj.readonly,
          isHidden: _obj.hidden,
          isExecutable: _obj.executable,
          mTime: _obj.mtime,
          aTime: _obj.atime
        };
      },
      toString: function () {
        return JSON.stringify(this.toJSON(), null, "\t");
      }
    };
  };
  return fattr;
}

var decoder;
var hasRequiredDecoder;
function requireDecoder() {
  if (hasRequiredDecoder) return decoder;
  hasRequiredDecoder = 1;
  decoder = {
    efs: true,
    encode: data => Buffer.from(data, "utf8"),
    decode: data => data.toString("utf8")
  };
  return decoder;
}

var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util.exports;
  hasRequiredUtil = 1;
  util.exports = requireUtils$2();
  util.exports.Constants = requireConstants();
  util.exports.Errors = requireErrors();
  util.exports.FileAttr = requireFattr();
  util.exports.decoder = requireDecoder();
  return util.exports;
}

var headers = {};

var entryHeader;
var hasRequiredEntryHeader;
function requireEntryHeader() {
  if (hasRequiredEntryHeader) return entryHeader;
  hasRequiredEntryHeader = 1;
  var Utils = requireUtil(),
    Constants = Utils.Constants;

  /* The central directory file header */
  entryHeader = function () {
    var _verMade = 20,
      // v2.0
      _version = 10,
      // v1.0
      _flags = 0,
      _method = 0,
      _time = 0,
      _crc = 0,
      _compressedSize = 0,
      _size = 0,
      _fnameLen = 0,
      _extraLen = 0,
      _comLen = 0,
      _diskStart = 0,
      _inattr = 0,
      _attr = 0,
      _offset = 0;
    _verMade |= Utils.isWin ? 0x0a00 : 0x0300;

    // Set EFS flag since filename and comment fields are all by default encoded using UTF-8.
    // Without it file names may be corrupted for other apps when file names use unicode chars
    _flags |= Constants.FLG_EFS;
    const _localHeader = {
      extraLen: 0
    };

    // casting
    const uint32 = val => Math.max(0, val) >>> 0;
    const uint8 = val => Math.max(0, val) & 0xff;
    _time = Utils.fromDate2DOS(new Date());
    return {
      get made() {
        return _verMade;
      },
      set made(val) {
        _verMade = val;
      },
      get version() {
        return _version;
      },
      set version(val) {
        _version = val;
      },
      get flags() {
        return _flags;
      },
      set flags(val) {
        _flags = val;
      },
      get flags_efs() {
        return (_flags & Constants.FLG_EFS) > 0;
      },
      set flags_efs(val) {
        if (val) {
          _flags |= Constants.FLG_EFS;
        } else {
          _flags &= ~Constants.FLG_EFS;
        }
      },
      get flags_desc() {
        return (_flags & Constants.FLG_DESC) > 0;
      },
      set flags_desc(val) {
        if (val) {
          _flags |= Constants.FLG_DESC;
        } else {
          _flags &= ~Constants.FLG_DESC;
        }
      },
      get method() {
        return _method;
      },
      set method(val) {
        switch (val) {
          case Constants.STORED:
            this.version = 10;
          case Constants.DEFLATED:
          default:
            this.version = 20;
        }
        _method = val;
      },
      get time() {
        return Utils.fromDOS2Date(this.timeval);
      },
      set time(val) {
        this.timeval = Utils.fromDate2DOS(val);
      },
      get timeval() {
        return _time;
      },
      set timeval(val) {
        _time = uint32(val);
      },
      get timeHighByte() {
        return uint8(_time >>> 8);
      },
      get crc() {
        return _crc;
      },
      set crc(val) {
        _crc = uint32(val);
      },
      get compressedSize() {
        return _compressedSize;
      },
      set compressedSize(val) {
        _compressedSize = uint32(val);
      },
      get size() {
        return _size;
      },
      set size(val) {
        _size = uint32(val);
      },
      get fileNameLength() {
        return _fnameLen;
      },
      set fileNameLength(val) {
        _fnameLen = val;
      },
      get extraLength() {
        return _extraLen;
      },
      set extraLength(val) {
        _extraLen = val;
      },
      get extraLocalLength() {
        return _localHeader.extraLen;
      },
      set extraLocalLength(val) {
        _localHeader.extraLen = val;
      },
      get commentLength() {
        return _comLen;
      },
      set commentLength(val) {
        _comLen = val;
      },
      get diskNumStart() {
        return _diskStart;
      },
      set diskNumStart(val) {
        _diskStart = uint32(val);
      },
      get inAttr() {
        return _inattr;
      },
      set inAttr(val) {
        _inattr = uint32(val);
      },
      get attr() {
        return _attr;
      },
      set attr(val) {
        _attr = uint32(val);
      },
      // get Unix file permissions
      get fileAttr() {
        return (_attr || 0) >> 16 & 0xfff;
      },
      get offset() {
        return _offset;
      },
      set offset(val) {
        _offset = uint32(val);
      },
      get encrypted() {
        return (_flags & Constants.FLG_ENC) === Constants.FLG_ENC;
      },
      get centralHeaderSize() {
        return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
      },
      get realDataOffset() {
        return _offset + Constants.LOCHDR + _localHeader.fnameLen + _localHeader.extraLen;
      },
      get localHeader() {
        return _localHeader;
      },
      loadLocalHeaderFromBinary: function (/*Buffer*/input) {
        var data = input.slice(_offset, _offset + Constants.LOCHDR);
        // 30 bytes and should start with "PK\003\004"
        if (data.readUInt32LE(0) !== Constants.LOCSIG) {
          throw Utils.Errors.INVALID_LOC();
        }

        // version needed to extract
        _localHeader.version = data.readUInt16LE(Constants.LOCVER);
        // general purpose bit flag
        _localHeader.flags = data.readUInt16LE(Constants.LOCFLG);
        // compression method
        _localHeader.method = data.readUInt16LE(Constants.LOCHOW);
        // modification time (2 bytes time, 2 bytes date)
        _localHeader.time = data.readUInt32LE(Constants.LOCTIM);
        // uncompressed file crc-32 valu
        _localHeader.crc = data.readUInt32LE(Constants.LOCCRC);
        // compressed size
        _localHeader.compressedSize = data.readUInt32LE(Constants.LOCSIZ);
        // uncompressed size
        _localHeader.size = data.readUInt32LE(Constants.LOCLEN);
        // filename length
        _localHeader.fnameLen = data.readUInt16LE(Constants.LOCNAM);
        // extra field length
        _localHeader.extraLen = data.readUInt16LE(Constants.LOCEXT);

        // read extra data
        const extraStart = _offset + Constants.LOCHDR + _localHeader.fnameLen;
        const extraEnd = extraStart + _localHeader.extraLen;
        return input.slice(extraStart, extraEnd);
      },
      loadFromBinary: function (/*Buffer*/data) {
        // data should be 46 bytes and start with "PK 01 02"
        if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
          throw Utils.Errors.INVALID_CEN();
        }
        // version made by
        _verMade = data.readUInt16LE(Constants.CENVEM);
        // version needed to extract
        _version = data.readUInt16LE(Constants.CENVER);
        // encrypt, decrypt flags
        _flags = data.readUInt16LE(Constants.CENFLG);
        // compression method
        _method = data.readUInt16LE(Constants.CENHOW);
        // modification time (2 bytes time, 2 bytes date)
        _time = data.readUInt32LE(Constants.CENTIM);
        // uncompressed file crc-32 value
        _crc = data.readUInt32LE(Constants.CENCRC);
        // compressed size
        _compressedSize = data.readUInt32LE(Constants.CENSIZ);
        // uncompressed size
        _size = data.readUInt32LE(Constants.CENLEN);
        // filename length
        _fnameLen = data.readUInt16LE(Constants.CENNAM);
        // extra field length
        _extraLen = data.readUInt16LE(Constants.CENEXT);
        // file comment length
        _comLen = data.readUInt16LE(Constants.CENCOM);
        // volume number start
        _diskStart = data.readUInt16LE(Constants.CENDSK);
        // internal file attributes
        _inattr = data.readUInt16LE(Constants.CENATT);
        // external file attributes
        _attr = data.readUInt32LE(Constants.CENATX);
        // LOC header offset
        _offset = data.readUInt32LE(Constants.CENOFF);
      },
      localHeaderToBinary: function () {
        // LOC header size (30 bytes)
        var data = Buffer.alloc(Constants.LOCHDR);
        // "PK\003\004"
        data.writeUInt32LE(Constants.LOCSIG, 0);
        // version needed to extract
        data.writeUInt16LE(_version, Constants.LOCVER);
        // general purpose bit flag
        data.writeUInt16LE(_flags, Constants.LOCFLG);
        // compression method
        data.writeUInt16LE(_method, Constants.LOCHOW);
        // modification time (2 bytes time, 2 bytes date)
        data.writeUInt32LE(_time, Constants.LOCTIM);
        // uncompressed file crc-32 value
        data.writeUInt32LE(_crc, Constants.LOCCRC);
        // compressed size
        data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
        // uncompressed size
        data.writeUInt32LE(_size, Constants.LOCLEN);
        // filename length
        data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
        // extra field length
        data.writeUInt16LE(_localHeader.extraLen, Constants.LOCEXT);
        return data;
      },
      centralHeaderToBinary: function () {
        // CEN header size (46 bytes)
        var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
        // "PK\001\002"
        data.writeUInt32LE(Constants.CENSIG, 0);
        // version made by
        data.writeUInt16LE(_verMade, Constants.CENVEM);
        // version needed to extract
        data.writeUInt16LE(_version, Constants.CENVER);
        // encrypt, decrypt flags
        data.writeUInt16LE(_flags, Constants.CENFLG);
        // compression method
        data.writeUInt16LE(_method, Constants.CENHOW);
        // modification time (2 bytes time, 2 bytes date)
        data.writeUInt32LE(_time, Constants.CENTIM);
        // uncompressed file crc-32 value
        data.writeUInt32LE(_crc, Constants.CENCRC);
        // compressed size
        data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
        // uncompressed size
        data.writeUInt32LE(_size, Constants.CENLEN);
        // filename length
        data.writeUInt16LE(_fnameLen, Constants.CENNAM);
        // extra field length
        data.writeUInt16LE(_extraLen, Constants.CENEXT);
        // file comment length
        data.writeUInt16LE(_comLen, Constants.CENCOM);
        // volume number start
        data.writeUInt16LE(_diskStart, Constants.CENDSK);
        // internal file attributes
        data.writeUInt16LE(_inattr, Constants.CENATT);
        // external file attributes
        data.writeUInt32LE(_attr, Constants.CENATX);
        // LOC header offset
        data.writeUInt32LE(_offset, Constants.CENOFF);
        return data;
      },
      toJSON: function () {
        const bytes = function (nr) {
          return nr + " bytes";
        };
        return {
          made: _verMade,
          version: _version,
          flags: _flags,
          method: Utils.methodToString(_method),
          time: this.time,
          crc: "0x" + _crc.toString(16).toUpperCase(),
          compressedSize: bytes(_compressedSize),
          size: bytes(_size),
          fileNameLength: bytes(_fnameLen),
          extraLength: bytes(_extraLen),
          commentLength: bytes(_comLen),
          diskNumStart: _diskStart,
          inAttr: _inattr,
          attr: _attr,
          offset: _offset,
          centralHeaderSize: bytes(Constants.CENHDR + _fnameLen + _extraLen + _comLen)
        };
      },
      toString: function () {
        return JSON.stringify(this.toJSON(), null, "\t");
      }
    };
  };
  return entryHeader;
}

var mainHeader;
var hasRequiredMainHeader;
function requireMainHeader() {
  if (hasRequiredMainHeader) return mainHeader;
  hasRequiredMainHeader = 1;
  var Utils = requireUtil(),
    Constants = Utils.Constants;

  /* The entries in the end of central directory */
  mainHeader = function () {
    var _volumeEntries = 0,
      _totalEntries = 0,
      _size = 0,
      _offset = 0,
      _commentLength = 0;
    return {
      get diskEntries() {
        return _volumeEntries;
      },
      set diskEntries(/*Number*/val) {
        _volumeEntries = _totalEntries = val;
      },
      get totalEntries() {
        return _totalEntries;
      },
      set totalEntries(/*Number*/val) {
        _totalEntries = _volumeEntries = val;
      },
      get size() {
        return _size;
      },
      set size(/*Number*/val) {
        _size = val;
      },
      get offset() {
        return _offset;
      },
      set offset(/*Number*/val) {
        _offset = val;
      },
      get commentLength() {
        return _commentLength;
      },
      set commentLength(/*Number*/val) {
        _commentLength = val;
      },
      get mainHeaderSize() {
        return Constants.ENDHDR + _commentLength;
      },
      loadFromBinary: function (/*Buffer*/data) {
        // data should be 22 bytes and start with "PK 05 06"
        // or be 56+ bytes and start with "PK 06 06" for Zip64
        if ((data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) && (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)) {
          throw Utils.Errors.INVALID_END();
        }
        if (data.readUInt32LE(0) === Constants.ENDSIG) {
          // number of entries on this volume
          _volumeEntries = data.readUInt16LE(Constants.ENDSUB);
          // total number of entries
          _totalEntries = data.readUInt16LE(Constants.ENDTOT);
          // central directory size in bytes
          _size = data.readUInt32LE(Constants.ENDSIZ);
          // offset of first CEN header
          _offset = data.readUInt32LE(Constants.ENDOFF);
          // zip file comment length
          _commentLength = data.readUInt16LE(Constants.ENDCOM);
        } else {
          // number of entries on this volume
          _volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB);
          // total number of entries
          _totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT);
          // central directory size in bytes
          _size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZE);
          // offset of first CEN header
          _offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF);
          _commentLength = 0;
        }
      },
      toBinary: function () {
        var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
        // "PK 05 06" signature
        b.writeUInt32LE(Constants.ENDSIG, 0);
        b.writeUInt32LE(0, 4);
        // number of entries on this volume
        b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
        // total number of entries
        b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
        // central directory size in bytes
        b.writeUInt32LE(_size, Constants.ENDSIZ);
        // offset of first CEN header
        b.writeUInt32LE(_offset, Constants.ENDOFF);
        // zip file comment length
        b.writeUInt16LE(_commentLength, Constants.ENDCOM);
        // fill comment memory with spaces so no garbage is left there
        b.fill(" ", Constants.ENDHDR);
        return b;
      },
      toJSON: function () {
        // creates 0x0000 style output
        const offset = function (nr, len) {
          let offs = nr.toString(16).toUpperCase();
          while (offs.length < len) offs = "0" + offs;
          return "0x" + offs;
        };
        return {
          diskEntries: _volumeEntries,
          totalEntries: _totalEntries,
          size: _size + " bytes",
          offset: offset(_offset, 4),
          commentLength: _commentLength
        };
      },
      toString: function () {
        return JSON.stringify(this.toJSON(), null, "\t");
      }
    };
  };
  // Misspelled
  return mainHeader;
}

var hasRequiredHeaders;
function requireHeaders() {
  if (hasRequiredHeaders) return headers;
  hasRequiredHeaders = 1;
  headers.EntryHeader = requireEntryHeader();
  headers.MainHeader = requireMainHeader();
  return headers;
}

var methods = {};

var deflater;
var hasRequiredDeflater;
function requireDeflater() {
  if (hasRequiredDeflater) return deflater;
  hasRequiredDeflater = 1;
  deflater = function (/*Buffer*/inbuf) {
    var zlib = require$$0;
    var opts = {
      chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024
    };
    return {
      deflate: function () {
        return zlib.deflateRawSync(inbuf, opts);
      },
      deflateAsync: function (/*Function*/callback) {
        var tmp = zlib.createDeflateRaw(opts),
          parts = [],
          total = 0;
        tmp.on("data", function (data) {
          parts.push(data);
          total += data.length;
        });
        tmp.on("end", function () {
          var buf = Buffer.alloc(total),
            written = 0;
          buf.fill(0);
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            part.copy(buf, written);
            written += part.length;
          }
          callback && callback(buf);
        });
        tmp.end(inbuf);
      }
    };
  };
  return deflater;
}

var inflater;
var hasRequiredInflater;
function requireInflater() {
  if (hasRequiredInflater) return inflater;
  hasRequiredInflater = 1;
  const version = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  inflater = function (/*Buffer*/inbuf, /*number*/expectedLength) {
    var zlib = require$$0;
    const option = version >= 15 && expectedLength > 0 ? {
      maxOutputLength: expectedLength
    } : {};
    return {
      inflate: function () {
        return zlib.inflateRawSync(inbuf, option);
      },
      inflateAsync: function (/*Function*/callback) {
        var tmp = zlib.createInflateRaw(option),
          parts = [],
          total = 0;
        tmp.on("data", function (data) {
          parts.push(data);
          total += data.length;
        });
        tmp.on("end", function () {
          var buf = Buffer.alloc(total),
            written = 0;
          buf.fill(0);
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            part.copy(buf, written);
            written += part.length;
          }
          callback && callback(buf);
        });
        tmp.end(inbuf);
      }
    };
  };
  return inflater;
}

var zipcrypto;
var hasRequiredZipcrypto;
function requireZipcrypto() {
  if (hasRequiredZipcrypto) return zipcrypto;
  hasRequiredZipcrypto = 1;

  // node crypt, we use it for generate salt
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const {
    randomFillSync
  } = require$$0$1;
  const Errors = requireErrors();

  // generate CRC32 lookup table
  const crctable = new Uint32Array(256).map((t, crc) => {
    for (let j = 0; j < 8; j++) {
      if (0 !== (crc & 1)) {
        crc = crc >>> 1 ^ 0xedb88320;
      } else {
        crc >>>= 1;
      }
    }
    return crc >>> 0;
  });

  // C-style uInt32 Multiply (discards higher bits, when JS multiply discards lower bits)
  const uMul = (a, b) => Math.imul(a, b) >>> 0;

  // crc32 byte single update (actually same function is part of utils.crc32 function :) )
  const crc32update = (pCrc32, bval) => {
    return crctable[(pCrc32 ^ bval) & 0xff] ^ pCrc32 >>> 8;
  };

  // function for generating salt for encrytion header
  const genSalt = () => {
    if ("function" === typeof randomFillSync) {
      return randomFillSync(Buffer.alloc(12));
    } else {
      // fallback if function is not defined
      return genSalt.node();
    }
  };

  // salt generation with node random function (mainly as fallback)
  genSalt.node = () => {
    const salt = Buffer.alloc(12);
    const len = salt.length;
    for (let i = 0; i < len; i++) salt[i] = Math.random() * 256 & 0xff;
    return salt;
  };

  // general config
  const config = {
    genSalt
  };

  // Class Initkeys handles same basic ops with keys
  function Initkeys(pw) {
    const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw);
    this.keys = new Uint32Array([0x12345678, 0x23456789, 0x34567890]);
    for (let i = 0; i < pass.length; i++) {
      this.updateKeys(pass[i]);
    }
  }
  Initkeys.prototype.updateKeys = function (byteValue) {
    const keys = this.keys;
    keys[0] = crc32update(keys[0], byteValue);
    keys[1] += keys[0] & 0xff;
    keys[1] = uMul(keys[1], 134775813) + 1;
    keys[2] = crc32update(keys[2], keys[1] >>> 24);
    return byteValue;
  };
  Initkeys.prototype.next = function () {
    const k = (this.keys[2] | 2) >>> 0; // key
    return uMul(k, k ^ 1) >> 8 & 0xff; // decode
  };
  function make_decrypter(/*Buffer*/pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);

    // return decrypter function
    return function (/*Buffer*/data) {
      // result - we create new Buffer for results
      const result = Buffer.alloc(data.length);
      let pos = 0;
      // process input data
      for (let c of data) {
        //c ^= keys.next();
        //result[pos++] = c; // decode & Save Value
        result[pos++] = keys.updateKeys(c ^ keys.next()); // update keys with decoded byte
      }
      return result;
    };
  }
  function make_encrypter(/*Buffer*/pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);

    // return encrypting function, result and pos is here so we dont have to merge buffers later
    return function (/*Buffer*/data, /*Buffer*/result, /* Number */pos = 0) {
      // result - we create new Buffer for results
      if (!result) result = Buffer.alloc(data.length);
      // process input data
      for (let c of data) {
        const k = keys.next(); // save key byte
        result[pos++] = c ^ k; // save val
        keys.updateKeys(c); // update keys with decoded byte
      }
      return result;
    };
  }
  function decrypt(/*Buffer*/data, /*Object*/header, /*String, Buffer*/pwd) {
    if (!data || !Buffer.isBuffer(data) || data.length < 12) {
      return Buffer.alloc(0);
    }

    // 1. We Initialize and generate decrypting function
    const decrypter = make_decrypter(pwd);

    // 2. decrypt salt what is always 12 bytes and is a part of file content
    const salt = decrypter(data.slice(0, 12));

    // if bit 3 (0x08) of the general-purpose flags field is set, check salt[11] with the high byte of the header time
    // 2 byte data block (as per Info-Zip spec), otherwise check with the high byte of the header entry
    const verifyByte = (header.flags & 0x8) === 0x8 ? header.timeHighByte : header.crc >>> 24;

    //3. does password meet expectations
    if (salt[11] !== verifyByte) {
      throw Errors.WRONG_PASSWORD();
    }

    // 4. decode content
    return decrypter(data.slice(12));
  }

  // lets add way to populate salt, NOT RECOMMENDED for production but maybe useful for testing general functionality
  function _salter(data) {
    if (Buffer.isBuffer(data) && data.length >= 12) {
      // be aware - currently salting buffer data is modified
      config.genSalt = function () {
        return data.slice(0, 12);
      };
    } else if (data === "node") {
      // test salt generation with node random function
      config.genSalt = genSalt.node;
    } else {
      // if value is not acceptable config gets reset.
      config.genSalt = genSalt;
    }
  }
  function encrypt(/*Buffer*/data, /*Object*/header, /*String, Buffer*/pwd, /*Boolean*/oldlike = false) {
    // 1. test data if data is not Buffer we make buffer from it
    if (data == null) data = Buffer.alloc(0);
    // if data is not buffer be make buffer from it
    if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString());

    // 2. We Initialize and generate encrypting function
    const encrypter = make_encrypter(pwd);

    // 3. generate salt (12-bytes of random data)
    const salt = config.genSalt();
    salt[11] = header.crc >>> 24 & 0xff;

    // old implementations (before PKZip 2.04g) used two byte check
    if (oldlike) salt[10] = header.crc >>> 16 & 0xff;

    // 4. create output
    const result = Buffer.alloc(data.length + 12);
    encrypter(salt, result);

    // finally encode content
    return encrypter(data, result, 12);
  }
  zipcrypto = {
    decrypt,
    encrypt,
    _salter
  };
  return zipcrypto;
}

var hasRequiredMethods;
function requireMethods() {
  if (hasRequiredMethods) return methods;
  hasRequiredMethods = 1;
  methods.Deflater = requireDeflater();
  methods.Inflater = requireInflater();
  methods.ZipCrypto = requireZipcrypto();
  return methods;
}

var zipEntry;
var hasRequiredZipEntry;
function requireZipEntry() {
  if (hasRequiredZipEntry) return zipEntry;
  hasRequiredZipEntry = 1;
  var Utils = requireUtil(),
    Headers = requireHeaders(),
    Constants = Utils.Constants,
    Methods = requireMethods();
  zipEntry = function (/** object */options, /*Buffer*/input) {
    var _centralHeader = new Headers.EntryHeader(),
      _entryName = Buffer.alloc(0),
      _comment = Buffer.alloc(0),
      _isDirectory = false,
      uncompressedData = null,
      _extra = Buffer.alloc(0),
      _extralocal = Buffer.alloc(0),
      _efs = true;

    // assign options
    const opts = options;
    const decoder = typeof opts.decoder === "object" ? opts.decoder : Utils.decoder;
    _efs = decoder.hasOwnProperty("efs") ? decoder.efs : false;
    function getCompressedDataFromZip() {
      //if (!input || !Buffer.isBuffer(input)) {
      if (!input || !(input instanceof Uint8Array)) {
        return Buffer.alloc(0);
      }
      _extralocal = _centralHeader.loadLocalHeaderFromBinary(input);
      return input.slice(_centralHeader.realDataOffset, _centralHeader.realDataOffset + _centralHeader.compressedSize);
    }
    function crc32OK(data) {
      // if bit 3 (0x08) of the general-purpose flags field is set, then the CRC-32 and file sizes are not known when the local header is written
      if (!_centralHeader.flags_desc) {
        if (Utils.crc32(data) !== _centralHeader.localHeader.crc) {
          return false;
        }
      } else {
        const descriptor = {};
        const dataEndOffset = _centralHeader.realDataOffset + _centralHeader.compressedSize;
        // no descriptor after compressed data, instead new local header
        if (input.readUInt32LE(dataEndOffset) == Constants.LOCSIG || input.readUInt32LE(dataEndOffset) == Constants.CENSIG) {
          throw Utils.Errors.DESCRIPTOR_NOT_EXIST();
        }

        // get decriptor data
        if (input.readUInt32LE(dataEndOffset) == Constants.EXTSIG) {
          // descriptor with signature
          descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC);
          descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ);
          descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN);
        } else if (input.readUInt16LE(dataEndOffset + 12) === 0x4b50) {
          // descriptor without signature (we check is new header starting where we expect)
          descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC - 4);
          descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ - 4);
          descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN - 4);
        } else {
          throw Utils.Errors.DESCRIPTOR_UNKNOWN();
        }

        // check data integrity
        if (descriptor.compressedSize !== _centralHeader.compressedSize || descriptor.size !== _centralHeader.size || descriptor.crc !== _centralHeader.crc) {
          throw Utils.Errors.DESCRIPTOR_FAULTY();
        }
        if (Utils.crc32(data) !== descriptor.crc) {
          return false;
        }

        // @TODO: zip64 bit descriptor fields
        // if bit 3 is set and any value in local header "zip64 Extended information" extra field are set 0 (place holder)
        // then 64-bit descriptor format is used instead of 32-bit
        // central header - "zip64 Extended information" extra field should store real values and not place holders
      }
      return true;
    }
    function decompress(/*Boolean*/async, /*Function*/callback, /*String, Buffer*/pass) {
      if (typeof callback === "undefined" && typeof async === "string") {
        pass = async;
        async = void 0;
      }
      if (_isDirectory) {
        if (async && callback) {
          callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR()); //si added error.
        }
        return Buffer.alloc(0);
      }
      var compressedData = getCompressedDataFromZip();
      if (compressedData.length === 0) {
        // File is empty, nothing to decompress.
        if (async && callback) callback(compressedData);
        return compressedData;
      }
      if (_centralHeader.encrypted) {
        if ("string" !== typeof pass && !Buffer.isBuffer(pass)) {
          throw Utils.Errors.INVALID_PASS_PARAM();
        }
        compressedData = Methods.ZipCrypto.decrypt(compressedData, _centralHeader, pass);
      }
      var data = Buffer.alloc(_centralHeader.size);
      switch (_centralHeader.method) {
        case Utils.Constants.STORED:
          compressedData.copy(data);
          if (!crc32OK(data)) {
            if (async && callback) callback(data, Utils.Errors.BAD_CRC()); //si added error
            throw Utils.Errors.BAD_CRC();
          } else {
            //si added otherwise did not seem to return data.
            if (async && callback) callback(data);
            return data;
          }
        case Utils.Constants.DEFLATED:
          var inflater = new Methods.Inflater(compressedData, _centralHeader.size);
          if (!async) {
            const result = inflater.inflate(data);
            result.copy(data, 0);
            if (!crc32OK(data)) {
              throw Utils.Errors.BAD_CRC(`"${decoder.decode(_entryName)}"`);
            }
            return data;
          } else {
            inflater.inflateAsync(function (result) {
              result.copy(result, 0);
              if (callback) {
                if (!crc32OK(result)) {
                  callback(result, Utils.Errors.BAD_CRC()); //si added error
                } else {
                  callback(result);
                }
              }
            });
          }
          break;
        default:
          if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD());
          throw Utils.Errors.UNKNOWN_METHOD();
      }
    }
    function compress(/*Boolean*/async, /*Function*/callback) {
      if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
        // no data set or the data wasn't changed to require recompression
        if (async && callback) callback(getCompressedDataFromZip());
        return getCompressedDataFromZip();
      }
      if (uncompressedData.length && !_isDirectory) {
        var compressedData;
        // Local file header
        switch (_centralHeader.method) {
          case Utils.Constants.STORED:
            _centralHeader.compressedSize = _centralHeader.size;
            compressedData = Buffer.alloc(uncompressedData.length);
            uncompressedData.copy(compressedData);
            if (async && callback) callback(compressedData);
            return compressedData;
          default:
          case Utils.Constants.DEFLATED:
            var deflater = new Methods.Deflater(uncompressedData);
            if (!async) {
              var deflated = deflater.deflate();
              _centralHeader.compressedSize = deflated.length;
              return deflated;
            } else {
              deflater.deflateAsync(function (data) {
                compressedData = Buffer.alloc(data.length);
                _centralHeader.compressedSize = data.length;
                data.copy(compressedData);
                callback && callback(compressedData);
              });
            }
            deflater = null;
            break;
        }
      } else if (async && callback) {
        callback(Buffer.alloc(0));
      } else {
        return Buffer.alloc(0);
      }
    }
    function readUInt64LE(buffer, offset) {
      return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset);
    }
    function parseExtra(data) {
      try {
        var offset = 0;
        var signature, size, part;
        while (offset + 4 < data.length) {
          signature = data.readUInt16LE(offset);
          offset += 2;
          size = data.readUInt16LE(offset);
          offset += 2;
          part = data.slice(offset, offset + size);
          offset += size;
          if (Constants.ID_ZIP64 === signature) {
            parseZip64ExtendedInformation(part);
          }
        }
      } catch (error) {
        throw Utils.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }

    //Override header field values with values from the ZIP64 extra field
    function parseZip64ExtendedInformation(data) {
      var size, compressedSize, offset, diskNumStart;
      if (data.length >= Constants.EF_ZIP64_SCOMP) {
        size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP);
        if (_centralHeader.size === Constants.EF_ZIP64_OR_32) {
          _centralHeader.size = size;
        }
      }
      if (data.length >= Constants.EF_ZIP64_RHO) {
        compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP);
        if (_centralHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
          _centralHeader.compressedSize = compressedSize;
        }
      }
      if (data.length >= Constants.EF_ZIP64_DSN) {
        offset = readUInt64LE(data, Constants.EF_ZIP64_RHO);
        if (_centralHeader.offset === Constants.EF_ZIP64_OR_32) {
          _centralHeader.offset = offset;
        }
      }
      if (data.length >= Constants.EF_ZIP64_DSN + 4) {
        diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN);
        if (_centralHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
          _centralHeader.diskNumStart = diskNumStart;
        }
      }
    }
    return {
      get entryName() {
        return decoder.decode(_entryName);
      },
      get rawEntryName() {
        return _entryName;
      },
      set entryName(val) {
        _entryName = Utils.toBuffer(val, decoder.encode);
        var lastChar = _entryName[_entryName.length - 1];
        _isDirectory = lastChar === 47 || lastChar === 92;
        _centralHeader.fileNameLength = _entryName.length;
      },
      get efs() {
        if (typeof _efs === "function") {
          return _efs(this.entryName);
        } else {
          return _efs;
        }
      },
      get extra() {
        return _extra;
      },
      set extra(val) {
        _extra = val;
        _centralHeader.extraLength = val.length;
        parseExtra(val);
      },
      get comment() {
        return decoder.decode(_comment);
      },
      set comment(val) {
        _comment = Utils.toBuffer(val, decoder.encode);
        _centralHeader.commentLength = _comment.length;
        if (_comment.length > 0xffff) throw Utils.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var n = decoder.decode(_entryName);
        return _isDirectory ? n.substr(n.length - 1).split("/").pop() : n.split("/").pop();
      },
      get isDirectory() {
        return _isDirectory;
      },
      getCompressedData: function () {
        return compress(false, null);
      },
      getCompressedDataAsync: function (/*Function*/callback) {
        compress(true, callback);
      },
      setData: function (value) {
        uncompressedData = Utils.toBuffer(value, Utils.decoder.encode);
        if (!_isDirectory && uncompressedData.length) {
          _centralHeader.size = uncompressedData.length;
          _centralHeader.method = Utils.Constants.DEFLATED;
          _centralHeader.crc = Utils.crc32(value);
          _centralHeader.changed = true;
        } else {
          // folders and blank files should be stored
          _centralHeader.method = Utils.Constants.STORED;
        }
      },
      getData: function (pass) {
        if (_centralHeader.changed) {
          return uncompressedData;
        } else {
          return decompress(false, null, pass);
        }
      },
      getDataAsync: function (/*Function*/callback, pass) {
        if (_centralHeader.changed) {
          callback(uncompressedData);
        } else {
          decompress(true, callback, pass);
        }
      },
      set attr(attr) {
        _centralHeader.attr = attr;
      },
      get attr() {
        return _centralHeader.attr;
      },
      set header(/*Buffer*/data) {
        _centralHeader.loadFromBinary(data);
      },
      get header() {
        return _centralHeader;
      },
      packCentralHeader: function () {
        _centralHeader.flags_efs = this.efs;
        _centralHeader.extraLength = _extra.length;
        // 1. create header (buffer)
        var header = _centralHeader.centralHeaderToBinary();
        var addpos = Utils.Constants.CENHDR;
        // 2. add file name
        _entryName.copy(header, addpos);
        addpos += _entryName.length;
        // 3. add extra data
        _extra.copy(header, addpos);
        addpos += _centralHeader.extraLength;
        // 4. add file comment
        _comment.copy(header, addpos);
        return header;
      },
      packLocalHeader: function () {
        let addpos = 0;
        _centralHeader.flags_efs = this.efs;
        _centralHeader.extraLocalLength = _extralocal.length;
        // 1. construct local header Buffer
        const localHeaderBuf = _centralHeader.localHeaderToBinary();
        // 2. localHeader - crate header buffer
        const localHeader = Buffer.alloc(localHeaderBuf.length + _entryName.length + _centralHeader.extraLocalLength);
        // 2.1 add localheader
        localHeaderBuf.copy(localHeader, addpos);
        addpos += localHeaderBuf.length;
        // 2.2 add file name
        _entryName.copy(localHeader, addpos);
        addpos += _entryName.length;
        // 2.3 add extra field
        _extralocal.copy(localHeader, addpos);
        addpos += _extralocal.length;
        return localHeader;
      },
      toJSON: function () {
        const bytes = function (nr) {
          return "<" + (nr && nr.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: _centralHeader.toJSON(),
          compressedData: bytes(input),
          data: bytes(uncompressedData)
        };
      },
      toString: function () {
        return JSON.stringify(this.toJSON(), null, "\t");
      }
    };
  };
  return zipEntry;
}

var zipFile;
var hasRequiredZipFile;
function requireZipFile() {
  if (hasRequiredZipFile) return zipFile;
  hasRequiredZipFile = 1;
  const ZipEntry = requireZipEntry();
  const Headers = requireHeaders();
  const Utils = requireUtil();
  zipFile = function (/*Buffer|null*/inBuffer, /** object */options) {
    var entryList = [],
      entryTable = {},
      _comment = Buffer.alloc(0),
      mainHeader = new Headers.MainHeader(),
      loadedEntries = false;
    const temporary = new Set();

    // assign options
    const opts = options;
    const {
      noSort,
      decoder
    } = opts;
    if (inBuffer) {
      // is a memory buffer
      readMainHeader(opts.readEntries);
    } else {
      // none. is a new file
      loadedEntries = true;
    }
    function makeTemporaryFolders() {
      const foldersList = new Set();

      // Make list of all folders in file
      for (const elem of Object.keys(entryTable)) {
        const elements = elem.split("/");
        elements.pop(); // filename
        if (!elements.length) continue; // no folders
        for (let i = 0; i < elements.length; i++) {
          const sub = elements.slice(0, i + 1).join("/") + "/";
          foldersList.add(sub);
        }
      }

      // create missing folders as temporary
      for (const elem of foldersList) {
        if (!(elem in entryTable)) {
          const tempfolder = new ZipEntry(opts);
          tempfolder.entryName = elem;
          tempfolder.attr = 0x10;
          tempfolder.temporary = true;
          entryList.push(tempfolder);
          entryTable[tempfolder.entryName] = tempfolder;
          temporary.add(tempfolder);
        }
      }
    }
    function readEntries() {
      loadedEntries = true;
      entryTable = {};
      if (mainHeader.diskEntries > (inBuffer.length - mainHeader.offset) / Utils.Constants.CENHDR) {
        throw Utils.Errors.DISK_ENTRY_TOO_LARGE();
      }
      entryList = new Array(mainHeader.diskEntries); // total number of entries
      var index = mainHeader.offset; // offset of first CEN header
      for (var i = 0; i < entryList.length; i++) {
        var tmp = index,
          entry = new ZipEntry(opts, inBuffer);
        entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);
        entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);
        if (entry.header.extraLength) {
          entry.extra = inBuffer.slice(tmp, tmp += entry.header.extraLength);
        }
        if (entry.header.commentLength) entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);
        index += entry.header.centralHeaderSize;
        entryList[i] = entry;
        entryTable[entry.entryName] = entry;
      }
      temporary.clear();
      makeTemporaryFolders();
    }
    function readMainHeader(/*Boolean*/readNow) {
      var i = inBuffer.length - Utils.Constants.ENDHDR,
        // END header size
        max = Math.max(0, i - 0xffff),
        // 0xFFFF is the max zip file comment length
        n = max,
        endStart = inBuffer.length,
        endOffset = -1,
        // Start offset of the END header
        commentEnd = 0;

      // option to search header form entire file
      const trailingSpace = typeof opts.trailingSpace === "boolean" ? opts.trailingSpace : false;
      if (trailingSpace) max = 0;
      for (i; i >= n; i--) {
        if (inBuffer[i] !== 0x50) continue; // quick check that the byte is 'P'
        if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) {
          // "PK\005\006"
          endOffset = i;
          commentEnd = i;
          endStart = i + Utils.Constants.ENDHDR;
          // We already found a regular signature, let's look just a bit further to check if there's any zip64 signature
          n = i - Utils.Constants.END64HDR;
          continue;
        }
        if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
          // Found a zip64 signature, let's continue reading the whole zip64 record
          n = max;
          continue;
        }
        if (inBuffer.readUInt32LE(i) === Utils.Constants.ZIP64SIG) {
          // Found the zip64 record, let's determine it's size
          endOffset = i;
          endStart = i + Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) + Utils.Constants.ZIP64LEAD;
          break;
        }
      }
      if (endOffset == -1) throw Utils.Errors.INVALID_FORMAT();
      mainHeader.loadFromBinary(inBuffer.slice(endOffset, endStart));
      if (mainHeader.commentLength) {
        _comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR);
      }
      if (readNow) readEntries();
    }
    function sortEntries() {
      if (entryList.length > 1 && !noSort) {
        entryList.sort((a, b) => a.entryName.toLowerCase().localeCompare(b.entryName.toLowerCase()));
      }
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        if (!loadedEntries) {
          readEntries();
        }
        return entryList.filter(e => !temporary.has(e));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return decoder.decode(_comment);
      },
      set comment(val) {
        _comment = Utils.toBuffer(val, decoder.encode);
        mainHeader.commentLength = _comment.length;
      },
      getEntryCount: function () {
        if (!loadedEntries) {
          return mainHeader.diskEntries;
        }
        return entryList.length;
      },
      forEach: function (callback) {
        this.entries.forEach(callback);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function (/*String*/entryName) {
        if (!loadedEntries) {
          readEntries();
        }
        return entryTable[entryName] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function (/*ZipEntry*/entry) {
        if (!loadedEntries) {
          readEntries();
        }
        entryList.push(entry);
        entryTable[entry.entryName] = entry;
        mainHeader.totalEntries = entryList.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function (/*String*/entryName, withsubfolders = true) {
        if (!loadedEntries) {
          readEntries();
        }
        const entry = entryTable[entryName];
        const list = this.getEntryChildren(entry, withsubfolders).map(child => child.entryName);
        list.forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function (/*String*/entryName) {
        if (!loadedEntries) {
          readEntries();
        }
        const entry = entryTable[entryName];
        const index = entryList.indexOf(entry);
        if (index >= 0) {
          entryList.splice(index, 1);
          delete entryTable[entryName];
          mainHeader.totalEntries = entryList.length;
        }
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function (/*ZipEntry*/entry, subfolders = true) {
        if (!loadedEntries) {
          readEntries();
        }
        if (typeof entry === "object") {
          if (entry.isDirectory && subfolders) {
            const list = [];
            const name = entry.entryName;
            for (const zipEntry of entryList) {
              if (zipEntry.entryName.startsWith(name)) {
                list.push(zipEntry);
              }
            }
            return list;
          } else {
            return [entry];
          }
        }
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function (entry) {
        if (entry && entry.isDirectory) {
          const list = this.getEntryChildren(entry);
          return list.includes(entry) ? list.length - 1 : list.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function () {
        if (!loadedEntries) {
          readEntries();
        }
        sortEntries();
        const dataBlock = [];
        const headerBlocks = [];
        let totalSize = 0;
        let dindex = 0;
        mainHeader.size = 0;
        mainHeader.offset = 0;
        let totalEntries = 0;
        for (const entry of this.entries) {
          // compress data and set local and entry header accordingly. Reason why is called first
          const compressedData = entry.getCompressedData();
          entry.header.offset = dindex;

          // 1. construct local header
          const localHeader = entry.packLocalHeader();

          // 2. offsets
          const dataLength = localHeader.length + compressedData.length;
          dindex += dataLength;

          // 3. store values in sequence
          dataBlock.push(localHeader);
          dataBlock.push(compressedData);

          // 4. construct central header
          const centralHeader = entry.packCentralHeader();
          headerBlocks.push(centralHeader);
          // 5. update main header
          mainHeader.size += centralHeader.length;
          totalSize += dataLength + centralHeader.length;
          totalEntries++;
        }
        totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
        // point to end of data and beginning of central directory first record
        mainHeader.offset = dindex;
        mainHeader.totalEntries = totalEntries;
        dindex = 0;
        const outBuffer = Buffer.alloc(totalSize);
        // write data blocks
        for (const content of dataBlock) {
          content.copy(outBuffer, dindex);
          dindex += content.length;
        }

        // write central directory entries
        for (const content of headerBlocks) {
          content.copy(outBuffer, dindex);
          dindex += content.length;
        }

        // write main header
        const mh = mainHeader.toBinary();
        if (_comment) {
          _comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
        }
        mh.copy(outBuffer, dindex);

        // Since we update entry and main header offsets,
        // they are no longer valid and we have to reset content
        // (Issue 64)

        inBuffer = outBuffer;
        loadedEntries = false;
        return outBuffer;
      },
      toAsyncBuffer: function (/*Function*/onSuccess, /*Function*/onFail, /*Function*/onItemStart, /*Function*/onItemEnd) {
        try {
          if (!loadedEntries) {
            readEntries();
          }
          sortEntries();
          const dataBlock = [];
          const centralHeaders = [];
          let totalSize = 0;
          let dindex = 0;
          let totalEntries = 0;
          mainHeader.size = 0;
          mainHeader.offset = 0;
          const compress2Buffer = function (entryLists) {
            if (entryLists.length > 0) {
              const entry = entryLists.shift();
              const name = entry.entryName + entry.extra.toString();
              if (onItemStart) onItemStart(name);
              entry.getCompressedDataAsync(function (compressedData) {
                if (onItemEnd) onItemEnd(name);
                entry.header.offset = dindex;

                // 1. construct local header
                const localHeader = entry.packLocalHeader();

                // 2. offsets
                const dataLength = localHeader.length + compressedData.length;
                dindex += dataLength;

                // 3. store values in sequence
                dataBlock.push(localHeader);
                dataBlock.push(compressedData);

                // central header
                const centalHeader = entry.packCentralHeader();
                centralHeaders.push(centalHeader);
                mainHeader.size += centalHeader.length;
                totalSize += dataLength + centalHeader.length;
                totalEntries++;
                compress2Buffer(entryLists);
              });
            } else {
              totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
              // point to end of data and beginning of central directory first record
              mainHeader.offset = dindex;
              mainHeader.totalEntries = totalEntries;
              dindex = 0;
              const outBuffer = Buffer.alloc(totalSize);
              dataBlock.forEach(function (content) {
                content.copy(outBuffer, dindex); // write data blocks
                dindex += content.length;
              });
              centralHeaders.forEach(function (content) {
                content.copy(outBuffer, dindex); // write central directory entries
                dindex += content.length;
              });
              const mh = mainHeader.toBinary();
              if (_comment) {
                _comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
              }
              mh.copy(outBuffer, dindex); // write main header

              // Since we update entry and main header offsets, they are no
              // longer valid and we have to reset content using our new buffer
              // (Issue 64)

              inBuffer = outBuffer;
              loadedEntries = false;
              onSuccess(outBuffer);
            }
          };
          compress2Buffer(Array.from(this.entries));
        } catch (e) {
          onFail(e);
        }
      }
    };
  };
  return zipFile;
}

var admZip$1;
var hasRequiredAdmZip;
function requireAdmZip() {
  if (hasRequiredAdmZip) return admZip$1;
  hasRequiredAdmZip = 1;
  const Utils = requireUtil();
  const pth = path;
  const ZipEntry = requireZipEntry();
  const ZipFile = requireZipFile();
  const get_Bool = (...val) => Utils.findLast(val, c => typeof c === "boolean");
  const get_Str = (...val) => Utils.findLast(val, c => typeof c === "string");
  const get_Fun = (...val) => Utils.findLast(val, c => typeof c === "function");
  const defaultOptions = {
    // option "noSort" : if true it disables files sorting
    noSort: false,
    // read entries during load (initial loading may be slower)
    readEntries: false,
    // default method is none
    method: Utils.Constants.NONE,
    // file system
    fs: null
  };
  admZip$1 = function (/**String*/input, /** object */options) {
    let inBuffer = null;

    // create object based default options, allowing them to be overwritten
    const opts = Object.assign(Object.create(null), defaultOptions);

    // test input variable
    if (input && "object" === typeof input) {
      // if value is not buffer we accept it to be object with options
      if (!(input instanceof Uint8Array)) {
        Object.assign(opts, input);
        input = opts.input ? opts.input : undefined;
        if (opts.input) delete opts.input;
      }

      // if input is buffer
      if (Buffer.isBuffer(input)) {
        inBuffer = input;
        opts.method = Utils.Constants.BUFFER;
        input = undefined;
      }
    }

    // assign options
    Object.assign(opts, options);

    // instanciate utils filesystem
    const filetools = new Utils(opts);
    if (typeof opts.decoder !== "object" || typeof opts.decoder.encode !== "function" || typeof opts.decoder.decode !== "function") {
      opts.decoder = Utils.decoder;
    }

    // if input is file name we retrieve its content
    if (input && "string" === typeof input) {
      // load zip file
      if (filetools.fs.existsSync(input)) {
        opts.method = Utils.Constants.FILE;
        opts.filename = input;
        inBuffer = filetools.fs.readFileSync(input);
      } else {
        throw Utils.Errors.INVALID_FILENAME();
      }
    }

    // create variable
    const _zip = new ZipFile(inBuffer, opts);
    const {
      canonical,
      sanitize,
      zipnamefix
    } = Utils;
    function getEntry(/**Object*/entry) {
      if (entry && _zip) {
        var item;
        // If entry was given as a file name
        if (typeof entry === "string") item = _zip.getEntry(pth.posix.normalize(entry));
        // if entry was given as a ZipEntry object
        if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined") item = _zip.getEntry(entry.entryName);
        if (item) {
          return item;
        }
      }
      return null;
    }
    function fixPath(zipPath) {
      const {
        join,
        normalize,
        sep
      } = pth.posix;
      // convert windows file separators and normalize
      return join(".", normalize(sep + zipPath.split("\\").join(sep) + sep));
    }
    function filenameFilter(filterfn) {
      if (filterfn instanceof RegExp) {
        // if filter is RegExp wrap it
        return function (rx) {
          return function (filename) {
            return rx.test(filename);
          };
        }(filterfn);
      } else if ("function" !== typeof filterfn) {
        // if filter is not function we will replace it
        return () => true;
      }
      return filterfn;
    }

    // keep last character on folders
    const relativePath = (local, entry) => {
      let lastChar = entry.slice(-1);
      lastChar = lastChar === filetools.sep ? filetools.sep : "";
      return pth.relative(local, entry) + lastChar;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function (entry, pass) {
        var item = getEntry(entry);
        return item && item.getData(pass) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function (entry) {
        const item = getEntry(entry);
        if (item) {
          return _zip.getChildCount(item);
        }
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function (entry, callback) {
        var item = getEntry(entry);
        if (item) {
          item.getDataAsync(callback);
        } else {
          callback(null, "getEntry failed for:" + entry);
        }
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function (entry, encoding) {
        var item = getEntry(entry);
        if (item) {
          var data = item.getData();
          if (data && data.length) {
            return data.toString(encoding || "utf8");
          }
        }
        return "";
      },
      /**
       * Asynchronous readAsText
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsTextAsync: function (entry, callback, encoding) {
        var item = getEntry(entry);
        if (item) {
          item.getDataAsync(function (data, err) {
            if (err) {
              callback(data, err);
              return;
            }
            if (data && data.length) {
              callback(data.toString(encoding || "utf8"));
            } else {
              callback("");
            }
          });
        } else {
          callback("");
        }
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function (entry, withsubfolders = true) {
        // @TODO: test deleteFile
        var item = getEntry(entry);
        if (item) {
          _zip.deleteFile(item.entryName, withsubfolders);
        }
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function (entry) {
        // @TODO: test deleteEntry
        var item = getEntry(entry);
        if (item) {
          _zip.deleteEntry(item.entryName);
        }
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function (comment) {
        // @TODO: test addZipComment
        _zip.comment = comment;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function () {
        return _zip.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function (entry, comment) {
        var item = getEntry(entry);
        if (item) {
          item.comment = comment;
        }
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function (entry) {
        var item = getEntry(entry);
        if (item) {
          return item.comment || "";
        }
        return "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function (entry, content) {
        var item = getEntry(entry);
        if (item) {
          item.setData(content);
        }
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function (localPath, zipPath, zipName, comment) {
        if (filetools.fs.existsSync(localPath)) {
          // fix ZipPath
          zipPath = zipPath ? fixPath(zipPath) : "";

          // p - local file name
          const p = pth.win32.basename(pth.win32.normalize(localPath));

          // add file name into zippath
          zipPath += zipName ? zipName : p;

          // read file attributes
          const _attr = filetools.fs.statSync(localPath);

          // get file content
          const data = _attr.isFile() ? filetools.fs.readFileSync(localPath) : Buffer.alloc(0);

          // if folder
          if (_attr.isDirectory()) zipPath += filetools.sep;

          // add file into zip file
          this.addFile(zipPath, data, comment, _attr);
        } else {
          throw Utils.Errors.FILE_NOT_FOUND(localPath);
        }
      },
      /**
       * Callback for showing if everything was done.
       *
       * @callback doneCallback
       * @param {Error} err - Error object
       * @param {boolean} done - was request fully completed
       */

      /**
       * Adds a file from the disk to the archive
       *
       * @param {(object|string)} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the file.
       * @param {string} [options.comment] - Optional file comment.
       * @param {string} [options.zipPath] - Optional path inside the zip
       * @param {string} [options.zipName] - Optional name for the file
       * @param {doneCallback} callback - The callback that handles the response.
       */
      addLocalFileAsync: function (options, callback) {
        options = typeof options === "object" ? options : {
          localPath: options
        };
        const localPath = pth.resolve(options.localPath);
        const {
          comment
        } = options;
        let {
          zipPath,
          zipName
        } = options;
        const self = this;
        filetools.fs.stat(localPath, function (err, stats) {
          if (err) return callback(err, false);
          // fix ZipPath
          zipPath = zipPath ? fixPath(zipPath) : "";
          // p - local file name
          const p = pth.win32.basename(pth.win32.normalize(localPath));
          // add file name into zippath
          zipPath += zipName ? zipName : p;
          if (stats.isFile()) {
            filetools.fs.readFile(localPath, function (err, data) {
              if (err) return callback(err, false);
              self.addFile(zipPath, data, comment, stats);
              return setImmediate(callback, undefined, true);
            });
          } else if (stats.isDirectory()) {
            zipPath += filetools.sep;
            self.addFile(zipPath, Buffer.alloc(0), comment, stats);
            return setImmediate(callback, undefined, true);
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function (localPath, zipPath, filter) {
        // Prepare filter
        filter = filenameFilter(filter);

        // fix ZipPath
        zipPath = zipPath ? fixPath(zipPath) : "";

        // normalize the path first
        localPath = pth.normalize(localPath);
        if (filetools.fs.existsSync(localPath)) {
          const items = filetools.findFiles(localPath);
          const self = this;
          if (items.length) {
            for (const filepath of items) {
              const p = pth.join(zipPath, relativePath(localPath, filepath));
              if (filter(p)) {
                self.addLocalFile(filepath, pth.dirname(p));
              }
            }
          }
        } else {
          throw Utils.Errors.FILE_NOT_FOUND(localPath);
        }
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function (localPath, callback, zipPath, filter) {
        // Prepare filter
        filter = filenameFilter(filter);

        // fix ZipPath
        zipPath = zipPath ? fixPath(zipPath) : "";

        // normalize the path first
        localPath = pth.normalize(localPath);
        var self = this;
        filetools.fs.open(localPath, "r", function (err) {
          if (err && err.code === "ENOENT") {
            callback(undefined, Utils.Errors.FILE_NOT_FOUND(localPath));
          } else if (err) {
            callback(undefined, err);
          } else {
            var items = filetools.findFiles(localPath);
            var i = -1;
            var next = function () {
              i += 1;
              if (i < items.length) {
                var filepath = items[i];
                var p = relativePath(localPath, filepath).split("\\").join("/"); //windows fix
                p = p.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""); // accent fix
                if (filter(p)) {
                  filetools.fs.stat(filepath, function (er0, stats) {
                    if (er0) callback(undefined, er0);
                    if (stats.isFile()) {
                      filetools.fs.readFile(filepath, function (er1, data) {
                        if (er1) {
                          callback(undefined, er1);
                        } else {
                          self.addFile(zipPath + p, data, "", stats);
                          next();
                        }
                      });
                    } else {
                      self.addFile(zipPath + p + "/", Buffer.alloc(0), "", stats);
                      next();
                    }
                  });
                } else {
                  process.nextTick(() => {
                    next();
                  });
                }
              } else {
                callback(true, undefined);
              }
            };
            next();
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {object | string} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the folder.
       * @param {string} [options.zipPath] - optional path inside zip.
       * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [options.namefix] - optional function to help fix filename
       * @param {doneCallback} callback - The callback that handles the response.
       *
       */
      addLocalFolderAsync2: function (options, callback) {
        const self = this;
        options = typeof options === "object" ? options : {
          localPath: options
        };
        localPath = pth.resolve(fixPath(options.localPath));
        let {
          zipPath,
          filter,
          namefix
        } = options;
        if (filter instanceof RegExp) {
          filter = function (rx) {
            return function (filename) {
              return rx.test(filename);
            };
          }(filter);
        } else if ("function" !== typeof filter) {
          filter = function () {
            return true;
          };
        }

        // fix ZipPath
        zipPath = zipPath ? fixPath(zipPath) : "";

        // Check Namefix function
        if (namefix == "latin1") {
          namefix = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""); // accent fix (latin1 characers only)
        }
        if (typeof namefix !== "function") namefix = str => str;

        // internal, create relative path + fix the name
        const relPathFix = entry => pth.join(zipPath, namefix(relativePath(localPath, entry)));
        const fileNameFix = entry => pth.win32.basename(pth.win32.normalize(namefix(entry)));
        filetools.fs.open(localPath, "r", function (err) {
          if (err && err.code === "ENOENT") {
            callback(undefined, Utils.Errors.FILE_NOT_FOUND(localPath));
          } else if (err) {
            callback(undefined, err);
          } else {
            filetools.findFilesAsync(localPath, function (err, fileEntries) {
              if (err) return callback(err);
              fileEntries = fileEntries.filter(dir => filter(relPathFix(dir)));
              if (!fileEntries.length) callback(undefined, false);
              setImmediate(fileEntries.reverse().reduce(function (next, entry) {
                return function (err, done) {
                  if (err || done === false) return setImmediate(next, err, false);
                  self.addLocalFileAsync({
                    localPath: entry,
                    zipPath: pth.dirname(relPathFix(entry)),
                    zipName: fileNameFix(entry)
                  }, next);
                };
              }, callback));
            });
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - path where files will be extracted
       * @param {object} props - optional properties
       * @param {string} [props.zipPath] - optional path inside zip
       * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [props.namefix] - optional function to help fix filename
       */
      addLocalFolderPromise: function (localPath, props) {
        return new Promise((resolve, reject) => {
          this.addLocalFolderAsync2(Object.assign({
            localPath
          }, props), (err, done) => {
            if (err) reject(err);
            if (done) resolve(this);
          });
        });
      },
      /**
       * Allows you to create a entry (file or directory) in the zip file.
       * If you want to create a directory the entryName must end in / and a null buffer should be provided.
       * Comment and attributes are optional
       *
       * @param {string} entryName
       * @param {Buffer | string} content - file content as buffer or utf8 coded string
       * @param {string} [comment] - file comment
       * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
       */
      addFile: function (entryName, content, comment, attr) {
        entryName = zipnamefix(entryName);
        let entry = getEntry(entryName);
        const update = entry != null;

        // prepare new entry
        if (!update) {
          entry = new ZipEntry(opts);
          entry.entryName = entryName;
        }
        entry.comment = comment || "";
        const isStat = "object" === typeof attr && attr instanceof filetools.fs.Stats;

        // last modification time from file stats
        if (isStat) {
          entry.header.time = attr.mtime;
        }

        // Set file attribute
        var fileattr = entry.isDirectory ? 0x10 : 0; // (MS-DOS directory flag)

        // extended attributes field for Unix
        // set file type either S_IFDIR / S_IFREG
        let unix = entry.isDirectory ? 0x4000 : 0x8000;
        if (isStat) {
          // File attributes from file stats
          unix |= 0xfff & attr.mode;
        } else if ("number" === typeof attr) {
          // attr from given attr values
          unix |= 0xfff & attr;
        } else {
          // Default values:
          unix |= entry.isDirectory ? 0o755 : 0o644; // permissions (drwxr-xr-x) or (-r-wr--r--)
        }
        fileattr = (fileattr | unix << 16) >>> 0; // add attributes

        entry.attr = fileattr;
        entry.setData(content);
        if (!update) _zip.setEntry(entry);
        return entry;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function (password) {
        _zip.password = password;
        return _zip ? _zip.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function (/**String*/name) {
        return getEntry(name);
      },
      getEntryCount: function () {
        return _zip.getEntryCount();
      },
      forEach: function (callback) {
        return _zip.forEach(callback);
      },
      /**
       * Extracts the given entry to the given targetPath
       * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
       *
       * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
       * @param {string} targetPath - Target folder where to write the file
       * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
       * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
       * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
       * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
       *
       * @return Boolean
       */
      extractEntryTo: function (entry, targetPath, maintainEntryPath, overwrite, keepOriginalPermission, outFileName) {
        overwrite = get_Bool(false, overwrite);
        keepOriginalPermission = get_Bool(false, keepOriginalPermission);
        maintainEntryPath = get_Bool(true, maintainEntryPath);
        outFileName = get_Str(keepOriginalPermission, outFileName);
        var item = getEntry(entry);
        if (!item) {
          throw Utils.Errors.NO_ENTRY();
        }
        var entryName = canonical(item.entryName);
        var target = sanitize(targetPath, outFileName && !item.isDirectory ? outFileName : maintainEntryPath ? entryName : pth.basename(entryName));
        if (item.isDirectory) {
          var children = _zip.getEntryChildren(item);
          children.forEach(function (child) {
            if (child.isDirectory) return;
            var content = child.getData();
            if (!content) {
              throw Utils.Errors.CANT_EXTRACT_FILE();
            }
            var name = canonical(child.entryName);
            var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name));
            // The reverse operation for attr depend on method addFile()
            const fileAttr = keepOriginalPermission ? child.header.fileAttr : undefined;
            filetools.writeFileTo(childName, content, overwrite, fileAttr);
          });
          return true;
        }
        var content = item.getData(_zip.password);
        if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();
        if (filetools.fs.existsSync(target) && !overwrite) {
          throw Utils.Errors.CANT_OVERRIDE();
        }
        // The reverse operation for attr depend on method addFile()
        const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
        filetools.writeFileTo(target, content, overwrite, fileAttr);
        return true;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function (pass) {
        if (!_zip) {
          return false;
        }
        for (var entry in _zip.entries) {
          try {
            if (entry.isDirectory) {
              continue;
            }
            var content = _zip.entries[entry].getData(pass);
            if (!content) {
              return false;
            }
          } catch (err) {
            return false;
          }
        }
        return true;
      },
      /**
       * Extracts the entire archive to the given location
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {string|Buffer} [pass] password
       */
      extractAllTo: function (targetPath, overwrite, keepOriginalPermission, pass) {
        keepOriginalPermission = get_Bool(false, keepOriginalPermission);
        pass = get_Str(keepOriginalPermission, pass);
        overwrite = get_Bool(false, overwrite);
        if (!_zip) throw Utils.Errors.NO_ZIP();
        _zip.entries.forEach(function (entry) {
          var entryName = sanitize(targetPath, canonical(entry.entryName));
          if (entry.isDirectory) {
            filetools.makeDir(entryName);
            return;
          }
          var content = entry.getData(pass);
          if (!content) {
            throw Utils.Errors.CANT_EXTRACT_FILE();
          }
          // The reverse operation for attr depend on method addFile()
          const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
          filetools.writeFileTo(entryName, content, overwrite, fileAttr);
          try {
            filetools.fs.utimesSync(entryName, entry.header.time, entry.header.time);
          } catch (err) {
            throw Utils.Errors.CANT_EXTRACT_FILE();
          }
        });
      },
      /**
       * Asynchronous extractAllTo
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
       */
      extractAllToAsync: function (targetPath, overwrite, keepOriginalPermission, callback) {
        callback = get_Fun(overwrite, keepOriginalPermission, callback);
        keepOriginalPermission = get_Bool(false, keepOriginalPermission);
        overwrite = get_Bool(false, overwrite);
        if (!callback) {
          return new Promise((resolve, reject) => {
            this.extractAllToAsync(targetPath, overwrite, keepOriginalPermission, function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(this);
              }
            });
          });
        }
        if (!_zip) {
          callback(Utils.Errors.NO_ZIP());
          return;
        }
        targetPath = pth.resolve(targetPath);
        // convert entryName to
        const getPath = entry => sanitize(targetPath, pth.normalize(canonical(entry.entryName)));
        const getError = (msg, file) => new Error(msg + ': "' + file + '"');

        // separate directories from files
        const dirEntries = [];
        const fileEntries = [];
        _zip.entries.forEach(e => {
          if (e.isDirectory) {
            dirEntries.push(e);
          } else {
            fileEntries.push(e);
          }
        });

        // Create directory entries first synchronously
        // this prevents race condition and assures folders are there before writing files
        for (const entry of dirEntries) {
          const dirPath = getPath(entry);
          // The reverse operation for attr depend on method addFile()
          const dirAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
          try {
            filetools.makeDir(dirPath);
            if (dirAttr) filetools.fs.chmodSync(dirPath, dirAttr);
            // in unix timestamp will change if files are later added to folder, but still
            filetools.fs.utimesSync(dirPath, entry.header.time, entry.header.time);
          } catch (er) {
            callback(getError("Unable to create folder", dirPath));
          }
        }
        fileEntries.reverse().reduce(function (next, entry) {
          return function (err) {
            if (err) {
              next(err);
            } else {
              const entryName = pth.normalize(canonical(entry.entryName));
              const filePath = sanitize(targetPath, entryName);
              entry.getDataAsync(function (content, err_1) {
                if (err_1) {
                  next(err_1);
                } else if (!content) {
                  next(Utils.Errors.CANT_EXTRACT_FILE());
                } else {
                  // The reverse operation for attr depend on method addFile()
                  const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                  filetools.writeFileToAsync(filePath, content, overwrite, fileAttr, function (succ) {
                    if (!succ) {
                      next(getError("Unable to write file", filePath));
                    }
                    filetools.fs.utimes(filePath, entry.header.time, entry.header.time, function (err_2) {
                      if (err_2) {
                        next(getError("Unable to set times", filePath));
                      } else {
                        next();
                      }
                    });
                  });
                }
              });
            }
          };
        }, callback)();
      },
      /**
       * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
       *
       * @param {string} targetFileName
       * @param {function} callback
       */
      writeZip: function (targetFileName, callback) {
        if (arguments.length === 1) {
          if (typeof targetFileName === "function") {
            callback = targetFileName;
            targetFileName = "";
          }
        }
        if (!targetFileName && opts.filename) {
          targetFileName = opts.filename;
        }
        if (!targetFileName) return;
        var zipData = _zip.compressToBuffer();
        if (zipData) {
          var ok = filetools.writeFileTo(targetFileName, zipData, true);
          if (typeof callback === "function") callback(!ok ? new Error("failed") : null, "");
        }
      },
      /**
       *
       * @param {string} targetFileName
       * @param {object} [props]
       * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
       * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
        * @returns {Promise<void>}
       */
      writeZipPromise: function (/**String*/targetFileName, /* object */props) {
        const {
          overwrite,
          perm
        } = Object.assign({
          overwrite: true
        }, props);
        return new Promise((resolve, reject) => {
          // find file name
          if (!targetFileName && opts.filename) targetFileName = opts.filename;
          if (!targetFileName) reject("ADM-ZIP: ZIP File Name Missing");
          this.toBufferPromise().then(zipData => {
            const ret = done => done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file");
            filetools.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret);
          }, reject);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function () {
        return new Promise((resolve, reject) => {
          _zip.toAsyncBuffer(resolve, reject);
        });
      },
      /**
       * Returns the content of the entire zip file as a Buffer object
       *
       * @prop {function} [onSuccess]
       * @prop {function} [onFail]
       * @prop {function} [onItemStart]
       * @prop {function} [onItemEnd]
       * @returns {Buffer}
       */
      toBuffer: function (onSuccess, onFail, onItemStart, onItemEnd) {
        if (typeof onSuccess === "function") {
          _zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
          return null;
        }
        return _zip.compressToBuffer();
      }
    };
  };
  return admZip$1;
}

var admZipExports = requireAdmZip();
var admZip = /*@__PURE__*/getDefaultExportFromCjs(admZipExports);

/**
 * Just used in the export opimizer.
 * @alpha
 */
class PackageInfos {
  /** @alpha */

  inMemory = false;
  /** @alpha */
  allPngFiles = [];
  /** @alpha */
  allTextFiles = [];
  /** @alpha */

  /** @alpha */

  effectPkgBufferTmpFiles = [];
}

/**
 * base clase for export strategy
 * @alpha
 */
class EffectExportStrategy {
  /** @alpha */

  /** @alpha */

  /** @alpha */

  /** @alpha */
  applied = false;
  /** @alpha */
  constructor(parameters, pkgInfos, zipObj) {
    this.strategyConfig = parameters;
    this.pkgInfos = pkgInfos;
    this.zipObj = zipObj;
  }
  /** @alpha */

  /** @alpha */

  /** @alpha */

  /** @alpha */
  getStrategyConfig() {
    return this.strategyConfig;
  }

  /** @alpha */
  static replaceKeywordInFile(filePath, oldKeyword, newKeyword) {
    return new Promise((resolve, reject) => {
      fs$2.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const result = data.replace(new RegExp(oldKeyword, 'g'), newKeyword);
          fs$2.writeFile(filePath, result, 'utf8', writeErr => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve();
            }
          });
        }
      });
    });
  }

  /** @alpha */
  static replaceReference(allTextFiles, replaceSet) {
    allTextFiles.forEach(async file => {
      for (const [oldKeyword, newKeyword] of replaceSet) {
        await this.replaceKeywordInFile(file, oldKeyword, newKeyword);
      }
    });
  }
}

const ALIAS = Symbol.for('yaml.alias');
const DOC = Symbol.for('yaml.document');
const MAP = Symbol.for('yaml.map');
const PAIR = Symbol.for('yaml.pair');
const SCALAR$1 = Symbol.for('yaml.scalar');
const SEQ = Symbol.for('yaml.seq');
const NODE_TYPE = Symbol.for('yaml.node.type');
const isAlias = node => !!node && typeof node === 'object' && node[NODE_TYPE] === ALIAS;
const isDocument = node => !!node && typeof node === 'object' && node[NODE_TYPE] === DOC;
const isMap = node => !!node && typeof node === 'object' && node[NODE_TYPE] === MAP;
const isPair = node => !!node && typeof node === 'object' && node[NODE_TYPE] === PAIR;
const isScalar$1 = node => !!node && typeof node === 'object' && node[NODE_TYPE] === SCALAR$1;
const isSeq = node => !!node && typeof node === 'object' && node[NODE_TYPE] === SEQ;
function isCollection$1(node) {
  if (node && typeof node === 'object') switch (node[NODE_TYPE]) {
    case MAP:
    case SEQ:
      return true;
  }
  return false;
}
function isNode(node) {
  if (node && typeof node === 'object') switch (node[NODE_TYPE]) {
    case ALIAS:
    case MAP:
    case SCALAR$1:
    case SEQ:
      return true;
  }
  return false;
}
const hasAnchor = node => (isScalar$1(node) || isCollection$1(node)) && !!node.anchor;

const BREAK$1 = Symbol('break visit');
const SKIP$1 = Symbol('skip children');
const REMOVE$1 = Symbol('remove node');
/**
 * Apply a visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
function visit$1(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE$1) node.contents = null;
  } else visit_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit$1.BREAK = BREAK$1;
/** Do not visit the children of the current node */
visit$1.SKIP = SKIP$1;
/** Remove the current node */
visit$1.REMOVE = REMOVE$1;
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visit_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== 'symbol') {
    if (isCollection$1(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path);
        if (typeof ci === 'number') i = ci - 1;else if (ci === BREAK$1) return BREAK$1;else if (ci === REMOVE$1) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = visit_('key', node.key, visitor, path);
      if (ck === BREAK$1) return BREAK$1;else if (ck === REMOVE$1) node.key = null;
      const cv = visit_('value', node.value, visitor, path);
      if (cv === BREAK$1) return BREAK$1;else if (cv === REMOVE$1) node.value = null;
    }
  }
  return ctrl;
}
/**
 * Apply an async visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `Promise`: Must resolve to one of the following values
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE$1) node.contents = null;
  } else await visitAsync_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visitAsync.BREAK = BREAK$1;
/** Do not visit the children of the current node */
visitAsync.SKIP = SKIP$1;
/** Remove the current node */
visitAsync.REMOVE = REMOVE$1;
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visitAsync_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== 'symbol') {
    if (isCollection$1(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path);
        if (typeof ci === 'number') i = ci - 1;else if (ci === BREAK$1) return BREAK$1;else if (ci === REMOVE$1) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = await visitAsync_('key', node.key, visitor, path);
      if (ck === BREAK$1) return BREAK$1;else if (ck === REMOVE$1) node.key = null;
      const cv = await visitAsync_('value', node.value, visitor, path);
      if (cv === BREAK$1) return BREAK$1;else if (cv === REMOVE$1) node.value = null;
    }
  }
  return ctrl;
}
function initVisitor(visitor) {
  if (typeof visitor === 'object' && (visitor.Collection || visitor.Node || visitor.Value)) {
    return Object.assign({
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node
    }, visitor.Value && {
      Map: visitor.Value,
      Scalar: visitor.Value,
      Seq: visitor.Value
    }, visitor.Collection && {
      Map: visitor.Collection,
      Seq: visitor.Collection
    }, visitor);
  }
  return visitor;
}
function callVisitor(key, node, visitor, path) {
  var _visitor$Map, _visitor$Seq, _visitor$Pair, _visitor$Scalar, _visitor$Alias;
  if (typeof visitor === 'function') return visitor(key, node, path);
  if (isMap(node)) return (_visitor$Map = visitor.Map) === null || _visitor$Map === void 0 ? void 0 : _visitor$Map.call(visitor, key, node, path);
  if (isSeq(node)) return (_visitor$Seq = visitor.Seq) === null || _visitor$Seq === void 0 ? void 0 : _visitor$Seq.call(visitor, key, node, path);
  if (isPair(node)) return (_visitor$Pair = visitor.Pair) === null || _visitor$Pair === void 0 ? void 0 : _visitor$Pair.call(visitor, key, node, path);
  if (isScalar$1(node)) return (_visitor$Scalar = visitor.Scalar) === null || _visitor$Scalar === void 0 ? void 0 : _visitor$Scalar.call(visitor, key, node, path);
  if (isAlias(node)) return (_visitor$Alias = visitor.Alias) === null || _visitor$Alias === void 0 ? void 0 : _visitor$Alias.call(visitor, key, node, path);
  return undefined;
}
function replaceNode(key, path, node) {
  const parent = path[path.length - 1];
  if (isCollection$1(parent)) {
    parent.items[key] = node;
  } else if (isPair(parent)) {
    if (key === 'key') parent.key = node;else parent.value = node;
  } else if (isDocument(parent)) {
    parent.contents = node;
  } else {
    const pt = isAlias(parent) ? 'alias' : 'scalar';
    throw new Error(`Cannot replace node with ${pt} parent`);
  }
}

const escapeChars = {
  '!': '%21',
  ',': '%2C',
  '[': '%5B',
  ']': '%5D',
  '{': '%7B',
  '}': '%7D'
};
const escapeTagName = tn => tn.replace(/[!,[\]{}]/g, ch => escapeChars[ch]);
class Directives {
  constructor(yaml, tags) {
    /**
     * The directives-end/doc-start marker `---`. If `null`, a marker may still be
     * included in the document's stringified representation.
     */
    this.docStart = null;
    /** The doc-end marker `...`.  */
    this.docEnd = false;
    this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
    this.tags = Object.assign({}, Directives.defaultTags, tags);
  }
  clone() {
    const copy = new Directives(this.yaml, this.tags);
    copy.docStart = this.docStart;
    return copy;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const res = new Directives(this.yaml, this.tags);
    switch (this.yaml.version) {
      case '1.1':
        this.atNextDocument = true;
        break;
      case '1.2':
        this.atNextDocument = false;
        this.yaml = {
          explicit: Directives.defaultYaml.explicit,
          version: '1.2'
        };
        this.tags = Object.assign({}, Directives.defaultTags);
        break;
    }
    return res;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(line, onError) {
    if (this.atNextDocument) {
      this.yaml = {
        explicit: Directives.defaultYaml.explicit,
        version: '1.1'
      };
      this.tags = Object.assign({}, Directives.defaultTags);
      this.atNextDocument = false;
    }
    const parts = line.trim().split(/[ \t]+/);
    const name = parts.shift();
    switch (name) {
      case '%TAG':
        {
          if (parts.length !== 2) {
            onError(0, '%TAG directive should contain exactly two parts');
            if (parts.length < 2) return false;
          }
          const [handle, prefix] = parts;
          this.tags[handle] = prefix;
          return true;
        }
      case '%YAML':
        {
          this.yaml.explicit = true;
          if (parts.length !== 1) {
            onError(0, '%YAML directive should contain exactly one part');
            return false;
          }
          const [version] = parts;
          if (version === '1.1' || version === '1.2') {
            this.yaml.version = version;
            return true;
          } else {
            const isValid = /^\d+\.\d+$/.test(version);
            onError(6, `Unsupported YAML version ${version}`, isValid);
            return false;
          }
        }
      default:
        onError(0, `Unknown directive ${name}`, true);
        return false;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(source, onError) {
    if (source === '!') return '!'; // non-specific tag
    if (source[0] !== '!') {
      onError(`Not a valid tag: ${source}`);
      return null;
    }
    if (source[1] === '<') {
      const verbatim = source.slice(2, -1);
      if (verbatim === '!' || verbatim === '!!') {
        onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
        return null;
      }
      if (source[source.length - 1] !== '>') onError('Verbatim tags must end with a >');
      return verbatim;
    }
    const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
    if (!suffix) onError(`The ${source} tag has no suffix`);
    const prefix = this.tags[handle];
    if (prefix) {
      try {
        return prefix + decodeURIComponent(suffix);
      } catch (error) {
        onError(String(error));
        return null;
      }
    }
    if (handle === '!') return source; // local tag
    onError(`Could not resolve tag: ${source}`);
    return null;
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(tag) {
    for (const [handle, prefix] of Object.entries(this.tags)) {
      if (tag.startsWith(prefix)) return handle + escapeTagName(tag.substring(prefix.length));
    }
    return tag[0] === '!' ? tag : `!<${tag}>`;
  }
  toString(doc) {
    const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || '1.2'}`] : [];
    const tagEntries = Object.entries(this.tags);
    let tagNames;
    if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
      const tags = {};
      visit$1(doc.contents, (_key, node) => {
        if (isNode(node) && node.tag) tags[node.tag] = true;
      });
      tagNames = Object.keys(tags);
    } else tagNames = [];
    for (const [handle, prefix] of tagEntries) {
      if (handle === '!!' && prefix === 'tag:yaml.org,2002:') continue;
      if (!doc || tagNames.some(tn => tn.startsWith(prefix))) lines.push(`%TAG ${handle} ${prefix}`);
    }
    return lines.join('\n');
  }
}
Directives.defaultYaml = {
  explicit: false,
  version: '1.2'
};
Directives.defaultTags = {
  '!!': 'tag:yaml.org,2002:'
};

/**
 * Verify that the input string is a valid anchor.
 *
 * Will throw on errors.
 */
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const sa = JSON.stringify(anchor);
    const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
    throw new Error(msg);
  }
  return true;
}
function anchorNames(root) {
  const anchors = new Set();
  visit$1(root, {
    Value(_key, node) {
      if (node.anchor) anchors.add(node.anchor);
    }
  });
  return anchors;
}
/** Find a new anchor name with the given `prefix` and a one-indexed suffix. */
function findNewAnchor(prefix, exclude) {
  for (let i = 1; true; ++i) {
    const name = `${prefix}${i}`;
    if (!exclude.has(name)) return name;
  }
}
function createNodeAnchors(doc, prefix) {
  const aliasObjects = [];
  const sourceObjects = new Map();
  let prevAnchors = null;
  return {
    onAnchor: source => {
      aliasObjects.push(source);
      if (!prevAnchors) prevAnchors = anchorNames(doc);
      const anchor = findNewAnchor(prefix, prevAnchors);
      prevAnchors.add(anchor);
      return anchor;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source);
        if (typeof ref === 'object' && ref.anchor && (isScalar$1(ref.node) || isCollection$1(ref.node))) {
          ref.node.anchor = ref.anchor;
        } else {
          const error = new Error('Failed to resolve repeated object (this should not happen)');
          error.source = source;
          throw error;
        }
      }
    },
    sourceObjects
  };
}

/**
 * Applies the JSON.parse reviver algorithm as defined in the ECMA-262 spec,
 * in section 24.5.1.1 "Runtime Semantics: InternalizeJSONProperty" of the
 * 2021 edition: https://tc39.es/ecma262/#sec-json.parse
 *
 * Includes extensions for handling Map and Set objects.
 */
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === 'object') {
    if (Array.isArray(val)) {
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i];
        const v1 = applyReviver(reviver, val, String(i), v0);
        // eslint-disable-next-line @typescript-eslint/no-array-delete
        if (v1 === undefined) delete val[i];else if (v1 !== v0) val[i] = v1;
      }
    } else if (val instanceof Map) {
      for (const k of Array.from(val.keys())) {
        const v0 = val.get(k);
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === undefined) val.delete(k);else if (v1 !== v0) val.set(k, v1);
      }
    } else if (val instanceof Set) {
      for (const v0 of Array.from(val)) {
        const v1 = applyReviver(reviver, val, v0, v0);
        if (v1 === undefined) val.delete(v0);else if (v1 !== v0) {
          val.delete(v0);
          val.add(v1);
        }
      }
    } else {
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === undefined) delete val[k];else if (v1 !== v0) val[k] = v1;
      }
    }
  }
  return reviver.call(obj, key, val);
}

/**
 * Recursively convert any node or its contents to native JavaScript
 *
 * @param value - The input value
 * @param arg - If `value` defines a `toJSON()` method, use this
 *   as its first argument
 * @param ctx - Conversion context, originally set in Document#toJS(). If
 *   `{ keep: true }` is not set, output should be suitable for JSON
 *   stringification.
 */
function toJS(value, arg, ctx) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (Array.isArray(value)) return value.map((v, i) => toJS(v, String(i), ctx));
  if (value && typeof value.toJSON === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!ctx || !hasAnchor(value)) return value.toJSON(arg, ctx);
    const data = {
      aliasCount: 0,
      count: 1,
      res: undefined
    };
    ctx.anchors.set(value, data);
    ctx.onCreate = res => {
      data.res = res;
      delete ctx.onCreate;
    };
    const res = value.toJSON(arg, ctx);
    if (ctx.onCreate) ctx.onCreate(res);
    return res;
  }
  if (typeof value === 'bigint' && !(ctx !== null && ctx !== void 0 && ctx.keep)) return Number(value);
  return value;
}

class NodeBase {
  constructor(type) {
    Object.defineProperty(this, NODE_TYPE, {
      value: type
    });
  }
  /** Create a copy of this node.  */
  clone() {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (this.range) copy.range = this.range.slice();
    return copy;
  }
  /** A plain JavaScript representation of this node. */
  toJS(doc, {
    mapAsMap,
    maxAliasCount,
    onAnchor,
    reviver
  } = {}) {
    if (!isDocument(doc)) throw new TypeError('A document argument is required');
    const ctx = {
      anchors: new Map(),
      doc,
      keep: true,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100
    };
    const res = toJS(this, '', ctx);
    if (typeof onAnchor === 'function') for (const {
      count,
      res
    } of ctx.anchors.values()) onAnchor(res, count);
    return typeof reviver === 'function' ? applyReviver(reviver, {
      '': res
    }, '', res) : res;
  }
}

class Alias extends NodeBase {
  constructor(source) {
    super(ALIAS);
    this.source = source;
    Object.defineProperty(this, 'tag', {
      set() {
        throw new Error('Alias nodes cannot have tags');
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(doc) {
    let found = undefined;
    visit$1(doc, {
      Node: (_key, node) => {
        if (node === this) return visit$1.BREAK;
        if (node.anchor === this.source) found = node;
      }
    });
    return found;
  }
  toJSON(_arg, ctx) {
    if (!ctx) return {
      source: this.source
    };
    const {
      anchors,
      doc,
      maxAliasCount
    } = ctx;
    const source = this.resolve(doc);
    if (!source) {
      const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(msg);
    }
    let data = anchors.get(source);
    if (!data) {
      // Resolve anchors for Node.prototype.toJS()
      toJS(source, null, ctx);
      data = anchors.get(source);
    }
    /* istanbul ignore if */
    if (!data || data.res === undefined) {
      const msg = 'This should not happen: Alias anchor was not resolved?';
      throw new ReferenceError(msg);
    }
    if (maxAliasCount >= 0) {
      data.count += 1;
      if (data.aliasCount === 0) data.aliasCount = getAliasCount(doc, source, anchors);
      if (data.count * data.aliasCount > maxAliasCount) {
        const msg = 'Excessive alias count indicates a resource exhaustion attack';
        throw new ReferenceError(msg);
      }
    }
    return data.res;
  }
  toString(ctx, _onComment, _onChompKeep) {
    const src = `*${this.source}`;
    if (ctx) {
      anchorIsValid(this.source);
      if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(msg);
      }
      if (ctx.implicitKey) return `${src} `;
    }
    return src;
  }
}
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc);
    const anchor = anchors && source && anchors.get(source);
    return anchor ? anchor.count * anchor.aliasCount : 0;
  } else if (isCollection$1(node)) {
    let count = 0;
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors);
      if (c > count) count = c;
    }
    return count;
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors);
    const vc = getAliasCount(doc, node.value, anchors);
    return Math.max(kc, vc);
  }
  return 1;
}

const isScalarValue = value => !value || typeof value !== 'function' && typeof value !== 'object';
class Scalar extends NodeBase {
  constructor(value) {
    super(SCALAR$1);
    this.value = value;
  }
  toJSON(arg, ctx) {
    return ctx !== null && ctx !== void 0 && ctx.keep ? this.value : toJS(this.value, arg, ctx);
  }
  toString() {
    return String(this.value);
  }
}
Scalar.BLOCK_FOLDED = 'BLOCK_FOLDED';
Scalar.BLOCK_LITERAL = 'BLOCK_LITERAL';
Scalar.PLAIN = 'PLAIN';
Scalar.QUOTE_DOUBLE = 'QUOTE_DOUBLE';
Scalar.QUOTE_SINGLE = 'QUOTE_SINGLE';

const defaultTagPrefix = 'tag:yaml.org,2002:';
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter(t => t.tag === tagName);
    const tagObj = match.find(t => !t.format) ?? match[0];
    if (!tagObj) throw new Error(`Tag ${tagName} not found`);
    return tagObj;
  }
  return tags.find(t => {
    var _t$identify;
    return ((_t$identify = t.identify) === null || _t$identify === void 0 ? void 0 : _t$identify.call(t, value)) && !t.format;
  });
}
function createNode(value, tagName, ctx) {
  var _tagName, _tagObj, _tagObj2;
  if (isDocument(value)) value = value.contents;
  if (isNode(value)) return value;
  if (isPair(value)) {
    var _ctx$schema$MAP$creat, _ctx$schema$MAP;
    const map = (_ctx$schema$MAP$creat = (_ctx$schema$MAP = ctx.schema[MAP]).createNode) === null || _ctx$schema$MAP$creat === void 0 ? void 0 : _ctx$schema$MAP$creat.call(_ctx$schema$MAP, ctx.schema, null, ctx);
    map.items.push(value);
    return map;
  }
  if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== 'undefined' && value instanceof BigInt // not supported everywhere
  ) {
    // https://tc39.es/ecma262/#sec-serializejsonproperty
    value = value.valueOf();
  }
  const {
    aliasDuplicateObjects,
    onAnchor,
    onTagObj,
    schema,
    sourceObjects
  } = ctx;
  // Detect duplicate references to the same object & use Alias nodes for all
  // after first. The `ref` wrapper allows for circular references to resolve.
  let ref = undefined;
  if (aliasDuplicateObjects && value && typeof value === 'object') {
    ref = sourceObjects.get(value);
    if (ref) {
      if (!ref.anchor) ref.anchor = onAnchor(value);
      return new Alias(ref.anchor);
    } else {
      ref = {
        anchor: null,
        node: null
      };
      sourceObjects.set(value, ref);
    }
  }
  if ((_tagName = tagName) !== null && _tagName !== void 0 && _tagName.startsWith('!!')) tagName = defaultTagPrefix + tagName.slice(2);
  let tagObj = findTagObject(value, tagName, schema.tags);
  if (!tagObj) {
    if (value && typeof value.toJSON === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      value = value.toJSON();
    }
    if (!value || typeof value !== 'object') {
      const node = new Scalar(value);
      if (ref) ref.node = node;
      return node;
    }
    tagObj = value instanceof Map ? schema[MAP] : Symbol.iterator in Object(value) ? schema[SEQ] : schema[MAP];
  }
  if (onTagObj) {
    onTagObj(tagObj);
    delete ctx.onTagObj;
  }
  const node = (_tagObj = tagObj) !== null && _tagObj !== void 0 && _tagObj.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof ((_tagObj2 = tagObj) === null || _tagObj2 === void 0 || (_tagObj2 = _tagObj2.nodeClass) === null || _tagObj2 === void 0 ? void 0 : _tagObj2.from) === 'function' ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
  if (tagName) node.tag = tagName;else if (!tagObj.default) node.tag = tagObj.tag;
  if (ref) ref.node = node;
  return node;
}

function collectionFromPath(schema, path, value) {
  let v = value;
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i];
    if (typeof k === 'number' && Number.isInteger(k) && k >= 0) {
      const a = [];
      a[k] = v;
      v = a;
    } else {
      v = new Map([[k, v]]);
    }
  }
  return createNode(v, undefined, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: () => {
      throw new Error('This should not happen, please report a bug.');
    },
    schema,
    sourceObjects: new Map()
  });
}
// Type guard is intentionally a little wrong so as to be more useful,
// as it does not cover untypable empty non-string iterables (e.g. []).
const isEmptyPath = path => path == null || typeof path === 'object' && !!path[Symbol.iterator]().next().done;
class Collection extends NodeBase {
  constructor(type, schema) {
    super(type);
    Object.defineProperty(this, 'schema', {
      value: schema,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(schema) {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (schema) copy.schema = schema;
    copy.items = copy.items.map(it => isNode(it) || isPair(it) ? it.clone(schema) : it);
    if (this.range) copy.range = this.range.slice();
    return copy;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(path, value) {
    if (isEmptyPath(path)) this.add(value);else {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (isCollection$1(node)) node.addIn(rest, value);else if (node === undefined && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0) return this.delete(key);
    const node = this.get(key, true);
    if (isCollection$1(node)) return node.deleteIn(rest);else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    const [key, ...rest] = path;
    const node = this.get(key, true);
    if (rest.length === 0) return !keepScalar && isScalar$1(node) ? node.value : node;else return isCollection$1(node) ? node.getIn(rest, keepScalar) : undefined;
  }
  hasAllNullValues(allowScalar) {
    return this.items.every(node => {
      if (!isPair(node)) return false;
      const n = node.value;
      return n == null || allowScalar && isScalar$1(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0) return this.has(key);
    const node = this.get(key, true);
    return isCollection$1(node) ? node.hasIn(rest) : false;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    const [key, ...rest] = path;
    if (rest.length === 0) {
      this.set(key, value);
    } else {
      const node = this.get(key, true);
      if (isCollection$1(node)) node.setIn(rest, value);else if (node === undefined && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
}

/**
 * Stringifies a comment.
 *
 * Empty comment lines are left empty,
 * lines consisting of a single space are replaced by `#`,
 * and all other lines are prefixed with a `#`.
 */
const stringifyComment = str => str.replace(/^(?!$)(?: $)?/gm, '#');
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment)) return comment.substring(1);
  return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
const lineComment = (str, indent, comment) => str.endsWith('\n') ? indentComment(comment, indent) : comment.includes('\n') ? '\n' + indentComment(comment, indent) : (str.endsWith(' ') ? '' : ' ') + comment;

const FOLD_FLOW = 'flow';
const FOLD_BLOCK = 'block';
const FOLD_QUOTED = 'quoted';
/**
 * Tries to keep input at up to `lineWidth` characters, splitting only on spaces
 * not followed by newlines or spaces unless `mode` is `'quoted'`. Lines are
 * terminated with `\n` and started with `indent`.
 */
function foldFlowLines(text, indent, mode = 'flow', {
  indentAtStart,
  lineWidth = 80,
  minContentWidth = 20,
  onFold,
  onOverflow
} = {}) {
  if (!lineWidth || lineWidth < 0) return text;
  if (lineWidth < minContentWidth) minContentWidth = 0;
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
  if (text.length <= endStep) return text;
  const folds = [];
  const escapedFolds = {};
  let end = lineWidth - indent.length;
  if (typeof indentAtStart === 'number') {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0);else end = lineWidth - indentAtStart;
  }
  let split = undefined;
  let prev = undefined;
  let overflow = false;
  let i = -1;
  let escStart = -1;
  let escEnd = -1;
  if (mode === FOLD_BLOCK) {
    i = consumeMoreIndentedLines(text, i, indent.length);
    if (i !== -1) end = i + endStep;
  }
  for (let ch; ch = text[i += 1];) {
    if (mode === FOLD_QUOTED && ch === '\\') {
      escStart = i;
      switch (text[i + 1]) {
        case 'x':
          i += 3;
          break;
        case 'u':
          i += 5;
          break;
        case 'U':
          i += 9;
          break;
        default:
          i += 1;
      }
      escEnd = i;
    }
    if (ch === '\n') {
      if (mode === FOLD_BLOCK) i = consumeMoreIndentedLines(text, i, indent.length);
      end = i + indent.length + endStep;
      split = undefined;
    } else {
      if (ch === ' ' && prev && prev !== ' ' && prev !== '\n' && prev !== '\t') {
        // space surrounded by non-space can be replaced with newline + indent
        const next = text[i + 1];
        if (next && next !== ' ' && next !== '\n' && next !== '\t') split = i;
      }
      if (i >= end) {
        if (split) {
          folds.push(split);
          end = split + endStep;
          split = undefined;
        } else if (mode === FOLD_QUOTED) {
          // white-space collected at end may stretch past lineWidth
          while (prev === ' ' || prev === '\t') {
            prev = ch;
            ch = text[i += 1];
            overflow = true;
          }
          // Account for newline escape, but don't break preceding escape
          const j = i > escEnd + 1 ? i - 2 : escStart - 1;
          // Bail out if lineWidth & minContentWidth are shorter than an escape string
          if (escapedFolds[j]) return text;
          folds.push(j);
          escapedFolds[j] = true;
          end = j + endStep;
          split = undefined;
        } else {
          overflow = true;
        }
      }
    }
    prev = ch;
  }
  if (overflow && onOverflow) onOverflow();
  if (folds.length === 0) return text;
  if (onFold) onFold();
  let res = text.slice(0, folds[0]);
  for (let i = 0; i < folds.length; ++i) {
    const fold = folds[i];
    const end = folds[i + 1] || text.length;
    if (fold === 0) res = `\n${indent}${text.slice(0, end)}`;else {
      if (mode === FOLD_QUOTED && escapedFolds[fold]) res += `${text[fold]}\\`;
      res += `\n${indent}${text.slice(fold + 1, end)}`;
    }
  }
  return res;
}
/**
 * Presumes `i + 1` is at the start of a line
 * @returns index of last newline in more-indented block
 */
function consumeMoreIndentedLines(text, i, indent) {
  let end = i;
  let start = i + 1;
  let ch = text[start];
  while (ch === ' ' || ch === '\t') {
    if (i < start + indent) {
      ch = text[++i];
    } else {
      do {
        ch = text[++i];
      } while (ch && ch !== '\n');
      end = i;
      start = i + 1;
      ch = text[start];
    }
  }
  return end;
}

const getFoldOptions = (ctx, isBlock) => ({
  indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
  lineWidth: ctx.options.lineWidth,
  minContentWidth: ctx.options.minContentWidth
});
// Also checks for lines starting with %, as parsing the output as YAML 1.1 will
// presume that's starting a new document.
const containsDocumentMarker = str => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0) return false;
  const limit = lineWidth - indentLength;
  const strLen = str.length;
  if (strLen <= limit) return false;
  for (let i = 0, start = 0; i < strLen; ++i) {
    if (str[i] === '\n') {
      if (i - start > limit) return true;
      start = i + 1;
      if (strLen - start <= limit) return false;
    }
  }
  return true;
}
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value);
  if (ctx.options.doubleQuotedAsJSON) return json;
  const {
    implicitKey
  } = ctx;
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
  const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
  let str = '';
  let start = 0;
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === ' ' && json[i + 1] === '\\' && json[i + 2] === 'n') {
      // space before newline needs to be escaped to not be folded
      str += json.slice(start, i) + '\\ ';
      i += 1;
      start = i;
      ch = '\\';
    }
    if (ch === '\\') switch (json[i + 1]) {
      case 'u':
        {
          str += json.slice(start, i);
          const code = json.substr(i + 2, 4);
          switch (code) {
            case '0000':
              str += '\\0';
              break;
            case '0007':
              str += '\\a';
              break;
            case '000b':
              str += '\\v';
              break;
            case '001b':
              str += '\\e';
              break;
            case '0085':
              str += '\\N';
              break;
            case '00a0':
              str += '\\_';
              break;
            case '2028':
              str += '\\L';
              break;
            case '2029':
              str += '\\P';
              break;
            default:
              if (code.substr(0, 2) === '00') str += '\\x' + code.substr(2);else str += json.substr(i, 6);
          }
          i += 5;
          start = i + 1;
        }
        break;
      case 'n':
        if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
          i += 1;
        } else {
          // folding will eat first newline
          str += json.slice(start, i) + '\n\n';
          while (json[i + 2] === '\\' && json[i + 3] === 'n' && json[i + 4] !== '"') {
            str += '\n';
            i += 2;
          }
          str += indent;
          // space after newline needs to be escaped to not be folded
          if (json[i + 2] === ' ') str += '\\';
          i += 1;
          start = i + 1;
        }
        break;
      default:
        i += 1;
    }
  }
  str = start ? str + json.slice(start) : json;
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
  if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes('\n') || /[ \t]\n|\n[ \t]/.test(value) // single quoted string can't have leading or trailing whitespace around newline
  ) return doubleQuotedString(value, ctx);
  const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
  const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&\n${indent}`) + "'";
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
  const {
    singleQuote
  } = ctx.options;
  let qs;
  if (singleQuote === false) qs = doubleQuotedString;else {
    const hasDouble = value.includes('"');
    const hasSingle = value.includes("'");
    if (hasDouble && !hasSingle) qs = singleQuotedString;else if (hasSingle && !hasDouble) qs = doubleQuotedString;else qs = singleQuote ? singleQuotedString : doubleQuotedString;
  }
  return qs(value, ctx);
}
// The negative lookbehind avoids a polynomial search,
// but isn't supported yet on Safari: https://caniuse.com/js-regexp-lookbehind
let blockEndNewlines;
try {
  blockEndNewlines = new RegExp('(^|(?<!\n))\n+(?!\n|$)', 'g');
} catch {
  blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({
  comment,
  type,
  value
}, ctx, onComment, onChompKeep) {
  const {
    blockQuote,
    commentString,
    lineWidth
  } = ctx.options;
  // 1. Block can't end in whitespace unless the last line is non-empty.
  // 2. Strings consisting of only whitespace are best rendered explicitly.
  if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
    return quotedString(value, ctx);
  }
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? '  ' : '');
  const literal = blockQuote === 'literal' ? true : blockQuote === 'folded' || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
  if (!value) return literal ? '|\n' : '>\n';
  // determine chomping from whitespace at value end
  let chomp;
  let endStart;
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1];
    if (ch !== '\n' && ch !== '\t' && ch !== ' ') break;
  }
  let end = value.substring(endStart);
  const endNlPos = end.indexOf('\n');
  if (endNlPos === -1) {
    chomp = '-'; // strip
  } else if (value === end || endNlPos !== end.length - 1) {
    chomp = '+'; // keep
    if (onChompKeep) onChompKeep();
  } else {
    chomp = ''; // clip
  }
  if (end) {
    value = value.slice(0, -end.length);
    if (end[end.length - 1] === '\n') end = end.slice(0, -1);
    end = end.replace(blockEndNewlines, `$&${indent}`);
  }
  // determine indent indicator from whitespace at value start
  let startWithSpace = false;
  let startEnd;
  let startNlPos = -1;
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd];
    if (ch === ' ') startWithSpace = true;else if (ch === '\n') startNlPos = startEnd;else break;
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
  if (start) {
    value = value.substring(start.length);
    start = start.replace(/\n+/g, `$&${indent}`);
  }
  const indentSize = indent ? '2' : '1'; // root is at -1
  // Leading | or > is added later
  let header = (startWithSpace ? indentSize : '') + chomp;
  if (comment) {
    header += ' ' + commentString(comment.replace(/ ?[\r\n]+/g, ' '));
    if (onComment) onComment();
  }
  if (!literal) {
    const foldedValue = value.replace(/\n+/g, '\n$&').replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2') // more-indented lines aren't folded
    //                ^ more-ind. ^ empty     ^ capture next empty lines only at end of indent
    .replace(/\n+/g, `$&${indent}`);
    let literalFallback = false;
    const foldOptions = getFoldOptions(ctx, true);
    if (blockQuote !== 'folded' && type !== Scalar.BLOCK_FOLDED) {
      foldOptions.onOverflow = () => {
        literalFallback = true;
      };
    }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
    if (!literalFallback) return `>${header}\n${indent}${body}`;
  }
  value = value.replace(/\n+/g, `$&${indent}`);
  return `|${header}\n${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
  const {
    type,
    value
  } = item;
  const {
    actualString,
    implicitKey,
    indent,
    indentStep,
    inFlow
  } = ctx;
  if (implicitKey && value.includes('\n') || inFlow && /[[\]{},]/.test(value)) {
    return quotedString(value, ctx);
  }
  if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
    // not allowed:
    // - empty string, '-' or '?'
    // - start with an indicator character (except [?:-]) or /[?-] /
    // - '\n ', ': ' or ' \n' anywhere
    // - '#' not preceded by a non-space char
    // - end with ' ' or ':'
    return implicitKey || inFlow || !value.includes('\n') ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
  }
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes('\n')) {
    // Where allowed & type not set explicitly, prefer block style for multiline strings
    return blockString(item, ctx, onComment, onChompKeep);
  }
  if (containsDocumentMarker(value)) {
    if (indent === '') {
      ctx.forceBlockIndent = true;
      return blockString(item, ctx, onComment, onChompKeep);
    } else if (implicitKey && indent === indentStep) {
      return quotedString(value, ctx);
    }
  }
  const str = value.replace(/\n+/g, `$&\n${indent}`);
  // Verify that output will be parsed as a string, as e.g. plain numbers and
  // booleans get parsed with those types in v1.2 (e.g. '42', 'true' & '0.9e-3'),
  // and others in v1.1.
  if (actualString) {
    const test = tag => {
      var _tag$test;
      return tag.default && tag.tag !== 'tag:yaml.org,2002:str' && ((_tag$test = tag.test) === null || _tag$test === void 0 ? void 0 : _tag$test.test(str));
    };
    const {
      compat,
      tags
    } = ctx.doc.schema;
    if (tags.some(test) || compat !== null && compat !== void 0 && compat.some(test)) return quotedString(value, ctx);
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
  const {
    implicitKey,
    inFlow
  } = ctx;
  const ss = typeof item.value === 'string' ? item : Object.assign({}, item, {
    value: String(item.value)
  });
  let {
    type
  } = item;
  if (type !== Scalar.QUOTE_DOUBLE) {
    // force double quotes on control characters & unpaired surrogates
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value)) type = Scalar.QUOTE_DOUBLE;
  }
  const _stringify = _type => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow ? quotedString(ss.value, ctx) // blocks are not valid inside flow containers
        : blockString(ss, ctx, onComment, onChompKeep);
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx);
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx);
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep);
      default:
        return null;
    }
  };
  let res = _stringify(type);
  if (res === null) {
    const {
      defaultKeyType,
      defaultStringType
    } = ctx.options;
    const t = implicitKey && defaultKeyType || defaultStringType;
    res = _stringify(t);
    if (res === null) throw new Error(`Unsupported default string type ${t}`);
  }
  return res;
}

function createStringifyContext(doc, options) {
  const opt = Object.assign({
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: 'PLAIN',
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: 'false',
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: 'null',
    simpleKeys: false,
    singleQuote: null,
    trueStr: 'true',
    verifyAliasOrder: true
  }, doc.schema.toStringOptions, options);
  let inFlow;
  switch (opt.collectionStyle) {
    case 'block':
      inFlow = false;
      break;
    case 'flow':
      inFlow = true;
      break;
    default:
      inFlow = null;
  }
  return {
    anchors: new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? ' ' : '',
    indent: '',
    indentStep: typeof opt.indent === 'number' ? ' '.repeat(opt.indent) : '  ',
    inFlow,
    options: opt
  };
}
function getTagObject(tags, item) {
  if (item.tag) {
    const match = tags.filter(t => t.tag === item.tag);
    if (match.length > 0) return match.find(t => t.format === item.format) ?? match[0];
  }
  let tagObj = undefined;
  let obj;
  if (isScalar$1(item)) {
    obj = item.value;
    let match = tags.filter(t => {
      var _t$identify;
      return (_t$identify = t.identify) === null || _t$identify === void 0 ? void 0 : _t$identify.call(t, obj);
    });
    if (match.length > 1) {
      const testMatch = match.filter(t => t.test);
      if (testMatch.length > 0) match = testMatch;
    }
    tagObj = match.find(t => t.format === item.format) ?? match.find(t => !t.format);
  } else {
    obj = item;
    tagObj = tags.find(t => t.nodeClass && obj instanceof t.nodeClass);
  }
  if (!tagObj) {
    var _obj;
    const name = ((_obj = obj) === null || _obj === void 0 || (_obj = _obj.constructor) === null || _obj === void 0 ? void 0 : _obj.name) ?? typeof obj;
    throw new Error(`Tag not resolved for ${name} value`);
  }
  return tagObj;
}
// needs to be called before value stringifier to allow for circular anchor refs
function stringifyProps(node, tagObj, {
  anchors,
  doc
}) {
  if (!doc.directives) return '';
  const props = [];
  const anchor = (isScalar$1(node) || isCollection$1(node)) && node.anchor;
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor);
    props.push(`&${anchor}`);
  }
  const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
  if (tag) props.push(doc.directives.tagString(tag));
  return props.join(' ');
}
function stringify$2(item, ctx, onComment, onChompKeep) {
  if (isPair(item)) return item.toString(ctx, onComment, onChompKeep);
  if (isAlias(item)) {
    var _ctx$resolvedAliases;
    if (ctx.doc.directives) return item.toString(ctx);
    if ((_ctx$resolvedAliases = ctx.resolvedAliases) !== null && _ctx$resolvedAliases !== void 0 && _ctx$resolvedAliases.has(item)) {
      throw new TypeError(`Cannot stringify circular structure without alias nodes`);
    } else {
      if (ctx.resolvedAliases) ctx.resolvedAliases.add(item);else ctx.resolvedAliases = new Set([item]);
      item = item.resolve(ctx.doc);
    }
  }
  let tagObj = undefined;
  const node = isNode(item) ? item : ctx.doc.createNode(item, {
    onTagObj: o => tagObj = o
  });
  if (!tagObj) tagObj = getTagObject(ctx.doc.schema.tags, node);
  const props = stringifyProps(node, tagObj, ctx);
  if (props.length > 0) ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
  const str = typeof tagObj.stringify === 'function' ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar$1(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
  if (!props) return str;
  return isScalar$1(node) || str[0] === '{' || str[0] === '[' ? `${props} ${str}` : `${props}\n${ctx.indent}${str}`;
}

function stringifyPair({
  key,
  value
}, ctx, onComment, onChompKeep) {
  const {
    allNullValues,
    doc,
    indent,
    indentStep,
    options: {
      commentString,
      indentSeq,
      simpleKeys
    }
  } = ctx;
  let keyComment = isNode(key) && key.comment || null;
  if (simpleKeys) {
    if (keyComment) {
      throw new Error('With simple keys, key nodes cannot have comments');
    }
    if (isCollection$1(key) || !isNode(key) && typeof key === 'object') {
      const msg = 'With simple keys, collection cannot be used as a key value';
      throw new Error(msg);
    }
  }
  let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection$1(key) || (isScalar$1(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === 'object'));
  ctx = Object.assign({}, ctx, {
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep
  });
  let keyCommentDone = false;
  let chompKeep = false;
  let str = stringify$2(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys) throw new Error('With simple keys, single line scalar must not span more than 1024 characters');
    explicitKey = true;
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment) onComment();
      return str === '' ? '?' : explicitKey ? `? ${str}` : str;
    }
  } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
    str = `? ${str}`;
    if (keyComment && !keyCommentDone) {
      str += lineComment(str, ctx.indent, commentString(keyComment));
    } else if (chompKeep && onChompKeep) onChompKeep();
    return str;
  }
  if (keyCommentDone) keyComment = null;
  if (explicitKey) {
    if (keyComment) str += lineComment(str, ctx.indent, commentString(keyComment));
    str = `? ${str}\n${indent}:`;
  } else {
    str = `${str}:`;
    if (keyComment) str += lineComment(str, ctx.indent, commentString(keyComment));
  }
  let vsb, vcb, valueComment;
  if (isNode(value)) {
    vsb = !!value.spaceBefore;
    vcb = value.commentBefore;
    valueComment = value.comment;
  } else {
    vsb = false;
    vcb = null;
    valueComment = null;
    if (value && typeof value === 'object') value = doc.createNode(value);
  }
  ctx.implicitKey = false;
  if (!explicitKey && !keyComment && isScalar$1(value)) ctx.indentAtStart = str.length + 1;
  chompKeep = false;
  if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
    // If indentSeq === false, consider '- ' as part of indentation where possible
    ctx.indent = ctx.indent.substring(2);
  }
  let valueCommentDone = false;
  const valueStr = stringify$2(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
  let ws = ' ';
  if (keyComment || vsb || vcb) {
    ws = vsb ? '\n' : '';
    if (vcb) {
      const cs = commentString(vcb);
      ws += `\n${indentComment(cs, ctx.indent)}`;
    }
    if (valueStr === '' && !ctx.inFlow) {
      if (ws === '\n') ws = '\n\n';
    } else {
      ws += `\n${ctx.indent}`;
    }
  } else if (!explicitKey && isCollection$1(value)) {
    const vs0 = valueStr[0];
    const nl0 = valueStr.indexOf('\n');
    const hasNewline = nl0 !== -1;
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
    if (hasNewline || !flow) {
      let hasPropsLine = false;
      if (hasNewline && (vs0 === '&' || vs0 === '!')) {
        let sp0 = valueStr.indexOf(' ');
        if (vs0 === '&' && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === '!') {
          sp0 = valueStr.indexOf(' ', sp0 + 1);
        }
        if (sp0 === -1 || nl0 < sp0) hasPropsLine = true;
      }
      if (!hasPropsLine) ws = `\n${ctx.indent}`;
    }
  } else if (valueStr === '' || valueStr[0] === '\n') {
    ws = '';
  }
  str += ws + valueStr;
  if (ctx.inFlow) {
    if (valueCommentDone && onComment) onComment();
  } else if (valueComment && !valueCommentDone) {
    str += lineComment(str, ctx.indent, commentString(valueComment));
  } else if (chompKeep && onChompKeep) {
    onChompKeep();
  }
  return str;
}

function warn(logLevel, warning) {
  if (logLevel === 'debug' || logLevel === 'warn') {
    console.warn(warning);
  }
}

// If the value associated with a merge key is a single mapping node, each of
// its key/value pairs is inserted into the current mapping, unless the key
// already exists in it. If the value associated with the merge key is a
// sequence, then this sequence is expected to contain mapping nodes and each
// of these nodes is merged in turn according to its order in the sequence.
// Keys in mapping nodes earlier in the sequence override keys specified in
// later mapping nodes. -- http://yaml.org/type/merge.html
const MERGE_KEY = '<<';
const merge = {
  identify: value => value === MERGE_KEY || typeof value === 'symbol' && value.description === MERGE_KEY,
  default: 'key',
  tag: 'tag:yaml.org,2002:merge',
  test: /^<<$/,
  resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
    addToJSMap: addMergeToJSMap
  }),
  stringify: () => MERGE_KEY
};
const isMergeKey = (ctx, key) => (merge.identify(key) || isScalar$1(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && (ctx === null || ctx === void 0 ? void 0 : ctx.doc.schema.tags.some(tag => tag.tag === merge.tag && tag.default));
function addMergeToJSMap(ctx, map, value) {
  value = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (isSeq(value)) for (const it of value.items) mergeValue(ctx, map, it);else if (Array.isArray(value)) for (const it of value) mergeValue(ctx, map, it);else mergeValue(ctx, map, value);
}
function mergeValue(ctx, map, value) {
  const source = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (!isMap(source)) throw new Error('Merge sources must be maps or map aliases');
  const srcMap = source.toJSON(null, ctx, Map);
  for (const [key, value] of srcMap) {
    if (map instanceof Map) {
      if (!map.has(key)) map.set(key, value);
    } else if (map instanceof Set) {
      map.add(key);
    } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
      Object.defineProperty(map, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  return map;
}

function addPairToJSMap(ctx, map, {
  key,
  value
}) {
  if (isNode(key) && key.addToJSMap) key.addToJSMap(ctx, map, value);
  // TODO: Should drop this special case for bare << handling
  else if (isMergeKey(ctx, key)) addMergeToJSMap(ctx, map, value);else {
    const jsKey = toJS(key, '', ctx);
    if (map instanceof Map) {
      map.set(jsKey, toJS(value, jsKey, ctx));
    } else if (map instanceof Set) {
      map.add(jsKey);
    } else {
      const stringKey = stringifyKey(key, jsKey, ctx);
      const jsValue = toJS(value, stringKey, ctx);
      if (stringKey in map) Object.defineProperty(map, stringKey, {
        value: jsValue,
        writable: true,
        enumerable: true,
        configurable: true
      });else map[stringKey] = jsValue;
    }
  }
  return map;
}
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null) return '';
  if (typeof jsKey !== 'object') return String(jsKey);
  if (isNode(key) && ctx !== null && ctx !== void 0 && ctx.doc) {
    const strCtx = createStringifyContext(ctx.doc, {});
    strCtx.anchors = new Set();
    for (const node of ctx.anchors.keys()) strCtx.anchors.add(node.anchor);
    strCtx.inFlow = true;
    strCtx.inStringifyKey = true;
    const strKey = key.toString(strCtx);
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey);
      if (jsonStr.length > 40) jsonStr = jsonStr.substring(0, 36) + '..."';
      warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
      ctx.mapKeyWarned = true;
    }
    return strKey;
  }
  return JSON.stringify(jsKey);
}

function createPair(key, value, ctx) {
  const k = createNode(key, undefined, ctx);
  const v = createNode(value, undefined, ctx);
  return new Pair(k, v);
}
class Pair {
  constructor(key, value = null) {
    Object.defineProperty(this, NODE_TYPE, {
      value: PAIR
    });
    this.key = key;
    this.value = value;
  }
  clone(schema) {
    let {
      key,
      value
    } = this;
    if (isNode(key)) key = key.clone(schema);
    if (isNode(value)) value = value.clone(schema);
    return new Pair(key, value);
  }
  toJSON(_, ctx) {
    const pair = ctx !== null && ctx !== void 0 && ctx.mapAsMap ? new Map() : {};
    return addPairToJSMap(ctx, pair, this);
  }
  toString(ctx, onComment, onChompKeep) {
    return ctx !== null && ctx !== void 0 && ctx.doc ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
  }
}

function stringifyCollection(collection, ctx, options) {
  const flow = ctx.inFlow ?? collection.flow;
  const stringify = flow ? stringifyFlowCollection : stringifyBlockCollection;
  return stringify(collection, ctx, options);
}
function stringifyBlockCollection({
  comment,
  items
}, ctx, {
  blockItemPrefix,
  flowChars,
  itemIndent,
  onChompKeep,
  onComment
}) {
  const {
    indent,
    options: {
      commentString
    }
  } = ctx;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    type: null
  });
  let chompKeep = false; // flag for the preceding node's status
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore) lines.push('');
      addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
      if (item.comment) comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (!chompKeep && ik.spaceBefore) lines.push('');
        addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
      }
    }
    chompKeep = false;
    let str = stringify$2(item, itemCtx, () => comment = null, () => chompKeep = true);
    if (comment) str += lineComment(str, itemIndent, commentString(comment));
    if (chompKeep && comment) chompKeep = false;
    lines.push(blockItemPrefix + str);
  }
  let str;
  if (lines.length === 0) {
    str = flowChars.start + flowChars.end;
  } else {
    str = lines[0];
    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i];
      str += line ? `\n${indent}${line}` : '\n';
    }
  }
  if (comment) {
    str += '\n' + indentComment(commentString(comment), indent);
    if (onComment) onComment();
  } else if (chompKeep && onChompKeep) onChompKeep();
  return str;
}
function stringifyFlowCollection({
  items
}, ctx, {
  flowChars,
  itemIndent
}) {
  const {
    indent,
    indentStep,
    flowCollectionPadding: fcPadding,
    options: {
      commentString
    }
  } = ctx;
  itemIndent += indentStep;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    inFlow: true,
    type: null
  });
  let reqNewline = false;
  let linesAtValue = 0;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (item.spaceBefore) lines.push('');
      addCommentBefore(ctx, lines, item.commentBefore, false);
      if (item.comment) comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (ik.spaceBefore) lines.push('');
        addCommentBefore(ctx, lines, ik.commentBefore, false);
        if (ik.comment) reqNewline = true;
      }
      const iv = isNode(item.value) ? item.value : null;
      if (iv) {
        if (iv.comment) comment = iv.comment;
        if (iv.commentBefore) reqNewline = true;
      } else if (item.value == null && ik !== null && ik !== void 0 && ik.comment) {
        comment = ik.comment;
      }
    }
    if (comment) reqNewline = true;
    let str = stringify$2(item, itemCtx, () => comment = null);
    if (i < items.length - 1) str += ',';
    if (comment) str += lineComment(str, itemIndent, commentString(comment));
    if (!reqNewline && (lines.length > linesAtValue || str.includes('\n'))) reqNewline = true;
    lines.push(str);
    linesAtValue = lines.length;
  }
  const {
    start,
    end
  } = flowChars;
  if (lines.length === 0) {
    return start + end;
  } else {
    if (!reqNewline) {
      const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
    }
    if (reqNewline) {
      let str = start;
      for (const line of lines) str += line ? `\n${indentStep}${indent}${line}` : '\n';
      return `${str}\n${indent}${end}`;
    } else {
      return `${start}${fcPadding}${lines.join(' ')}${fcPadding}${end}`;
    }
  }
}
function addCommentBefore({
  indent,
  options: {
    commentString
  }
}, lines, comment, chompKeep) {
  if (comment && chompKeep) comment = comment.replace(/^\n+/, '');
  if (comment) {
    const ic = indentComment(commentString(comment), indent);
    lines.push(ic.trimStart()); // Avoid double indent on first line
  }
}

function findPair(items, key) {
  const k = isScalar$1(key) ? key.value : key;
  for (const it of items) {
    if (isPair(it)) {
      if (it.key === key || it.key === k) return it;
      if (isScalar$1(it.key) && it.key.value === k) return it;
    }
  }
  return undefined;
}
class YAMLMap extends Collection {
  static get tagName() {
    return 'tag:yaml.org,2002:map';
  }
  constructor(schema) {
    super(MAP, schema);
    this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(schema, obj, ctx) {
    const {
      keepUndefined,
      replacer
    } = ctx;
    const map = new this(schema);
    const add = (key, value) => {
      if (typeof replacer === 'function') value = replacer.call(obj, key, value);else if (Array.isArray(replacer) && !replacer.includes(key)) return;
      if (value !== undefined || keepUndefined) map.items.push(createPair(key, value, ctx));
    };
    if (obj instanceof Map) {
      for (const [key, value] of obj) add(key, value);
    } else if (obj && typeof obj === 'object') {
      for (const key of Object.keys(obj)) add(key, obj[key]);
    }
    if (typeof schema.sortMapEntries === 'function') {
      map.items.sort(schema.sortMapEntries);
    }
    return map;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(pair, overwrite) {
    var _this$schema;
    let _pair;
    if (isPair(pair)) _pair = pair;else if (!pair || typeof pair !== 'object' || !('key' in pair)) {
      // In TypeScript, this never happens.
      _pair = new Pair(pair, pair === null || pair === void 0 ? void 0 : pair.value);
    } else _pair = new Pair(pair.key, pair.value);
    const prev = findPair(this.items, _pair.key);
    const sortEntries = (_this$schema = this.schema) === null || _this$schema === void 0 ? void 0 : _this$schema.sortMapEntries;
    if (prev) {
      if (!overwrite) throw new Error(`Key ${_pair.key} already set`);
      // For scalars, keep the old node & its comments and anchors
      if (isScalar$1(prev.value) && isScalarValue(_pair.value)) prev.value.value = _pair.value;else prev.value = _pair.value;
    } else if (sortEntries) {
      const i = this.items.findIndex(item => sortEntries(_pair, item) < 0);
      if (i === -1) this.items.push(_pair);else this.items.splice(i, 0, _pair);
    } else {
      this.items.push(_pair);
    }
  }
  delete(key) {
    const it = findPair(this.items, key);
    if (!it) return false;
    const del = this.items.splice(this.items.indexOf(it), 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const it = findPair(this.items, key);
    const node = it === null || it === void 0 ? void 0 : it.value;
    return (!keepScalar && isScalar$1(node) ? node.value : node) ?? undefined;
  }
  has(key) {
    return !!findPair(this.items, key);
  }
  set(key, value) {
    this.add(new Pair(key, value), true);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(_, ctx, Type) {
    const map = Type ? new Type() : ctx !== null && ctx !== void 0 && ctx.mapAsMap ? new Map() : {};
    if (ctx !== null && ctx !== void 0 && ctx.onCreate) ctx.onCreate(map);
    for (const item of this.items) addPairToJSMap(ctx, map, item);
    return map;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx) return JSON.stringify(this);
    for (const item of this.items) {
      if (!isPair(item)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
    }
    if (!ctx.allNullValues && this.hasAllNullValues(false)) ctx = Object.assign({}, ctx, {
      allNullValues: true
    });
    return stringifyCollection(this, ctx, {
      blockItemPrefix: '',
      flowChars: {
        start: '{',
        end: '}'
      },
      itemIndent: ctx.indent || '',
      onChompKeep,
      onComment
    });
  }
}

const map = {
  collection: 'map',
  default: true,
  nodeClass: YAMLMap,
  tag: 'tag:yaml.org,2002:map',
  resolve(map, onError) {
    if (!isMap(map)) onError('Expected a mapping for this tag');
    return map;
  },
  createNode: (schema, obj, ctx) => YAMLMap.from(schema, obj, ctx)
};

class YAMLSeq extends Collection {
  static get tagName() {
    return 'tag:yaml.org,2002:seq';
  }
  constructor(schema) {
    super(SEQ, schema);
    this.items = [];
  }
  add(value) {
    this.items.push(value);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    const idx = asItemIndex(key);
    if (typeof idx !== 'number') return false;
    const del = this.items.splice(idx, 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const idx = asItemIndex(key);
    if (typeof idx !== 'number') return undefined;
    const it = this.items[idx];
    return !keepScalar && isScalar$1(it) ? it.value : it;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(key) {
    const idx = asItemIndex(key);
    return typeof idx === 'number' && idx < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(key, value) {
    const idx = asItemIndex(key);
    if (typeof idx !== 'number') throw new Error(`Expected a valid index, not ${key}.`);
    const prev = this.items[idx];
    if (isScalar$1(prev) && isScalarValue(value)) prev.value = value;else this.items[idx] = value;
  }
  toJSON(_, ctx) {
    const seq = [];
    if (ctx !== null && ctx !== void 0 && ctx.onCreate) ctx.onCreate(seq);
    let i = 0;
    for (const item of this.items) seq.push(toJS(item, String(i++), ctx));
    return seq;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx) return JSON.stringify(this);
    return stringifyCollection(this, ctx, {
      blockItemPrefix: '- ',
      flowChars: {
        start: '[',
        end: ']'
      },
      itemIndent: (ctx.indent || '') + '  ',
      onChompKeep,
      onComment
    });
  }
  static from(schema, obj, ctx) {
    const {
      replacer
    } = ctx;
    const seq = new this(schema);
    if (obj && Symbol.iterator in Object(obj)) {
      let i = 0;
      for (let it of obj) {
        if (typeof replacer === 'function') {
          const key = obj instanceof Set ? it : String(i++);
          it = replacer.call(obj, key, it);
        }
        seq.items.push(createNode(it, undefined, ctx));
      }
    }
    return seq;
  }
}
function asItemIndex(key) {
  let idx = isScalar$1(key) ? key.value : key;
  if (idx && typeof idx === 'string') idx = Number(idx);
  return typeof idx === 'number' && Number.isInteger(idx) && idx >= 0 ? idx : null;
}

const seq = {
  collection: 'seq',
  default: true,
  nodeClass: YAMLSeq,
  tag: 'tag:yaml.org,2002:seq',
  resolve(seq, onError) {
    if (!isSeq(seq)) onError('Expected a sequence for this tag');
    return seq;
  },
  createNode: (schema, obj, ctx) => YAMLSeq.from(schema, obj, ctx)
};

const string = {
  identify: value => typeof value === 'string',
  default: true,
  tag: 'tag:yaml.org,2002:str',
  resolve: str => str,
  stringify(item, ctx, onComment, onChompKeep) {
    ctx = Object.assign({
      actualString: true
    }, ctx);
    return stringifyString(item, ctx, onComment, onChompKeep);
  }
};

const nullTag = {
  identify: value => value == null,
  createNode: () => new Scalar(null),
  default: true,
  tag: 'tag:yaml.org,2002:null',
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new Scalar(null),
  stringify: ({
    source
  }, ctx) => typeof source === 'string' && nullTag.test.test(source) ? source : ctx.options.nullStr
};

const boolTag = {
  identify: value => typeof value === 'boolean',
  default: true,
  tag: 'tag:yaml.org,2002:bool',
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: str => new Scalar(str[0] === 't' || str[0] === 'T'),
  stringify({
    source,
    value
  }, ctx) {
    if (source && boolTag.test.test(source)) {
      const sv = source[0] === 't' || source[0] === 'T';
      if (value === sv) return source;
    }
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
};

function stringifyNumber({
  format,
  minFractionDigits,
  tag,
  value
}) {
  if (typeof value === 'bigint') return String(value);
  const num = typeof value === 'number' ? value : Number(value);
  if (!isFinite(num)) return isNaN(num) ? '.nan' : num < 0 ? '-.inf' : '.inf';
  let n = JSON.stringify(value);
  if (!format && minFractionDigits && (!tag || tag === 'tag:yaml.org,2002:float') && /^\d/.test(n)) {
    let i = n.indexOf('.');
    if (i < 0) {
      i = n.length;
      n += '.';
    }
    let d = minFractionDigits - (n.length - i - 1);
    while (d-- > 0) n += '0';
  }
  return n;
}

const floatNaN$1 = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: str => str.slice(-3).toLowerCase() === 'nan' ? NaN : str[0] === '-' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
const floatExp$1 = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  format: 'EXP',
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: str => parseFloat(str),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
const float$1 = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str));
    const dot = str.indexOf('.');
    if (dot !== -1 && str[str.length - 1] === '0') node.minFractionDigits = str.length - dot - 1;
    return node;
  },
  stringify: stringifyNumber
};

const intIdentify$2 = value => typeof value === 'bigint' || Number.isInteger(value);
const intResolve$1 = (str, offset, radix, {
  intAsBigInt
}) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
function intStringify$1(node, radix, prefix) {
  const {
    value
  } = node;
  if (intIdentify$2(value) && value >= 0) return prefix + value.toString(radix);
  return stringifyNumber(node);
}
const intOct$1 = {
  identify: value => intIdentify$2(value) && value >= 0,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  format: 'OCT',
  test: /^0o[0-7]+$/,
  resolve: (str, _onError, opt) => intResolve$1(str, 2, 8, opt),
  stringify: node => intStringify$1(node, 8, '0o')
};
const int$1 = {
  identify: intIdentify$2,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  test: /^[-+]?[0-9]+$/,
  resolve: (str, _onError, opt) => intResolve$1(str, 0, 10, opt),
  stringify: stringifyNumber
};
const intHex$1 = {
  identify: value => intIdentify$2(value) && value >= 0,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  format: 'HEX',
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (str, _onError, opt) => intResolve$1(str, 2, 16, opt),
  stringify: node => intStringify$1(node, 16, '0x')
};

const schema$2 = [map, seq, string, nullTag, boolTag, intOct$1, int$1, intHex$1, floatNaN$1, floatExp$1, float$1];

function intIdentify$1(value) {
  return typeof value === 'bigint' || Number.isInteger(value);
}
const stringifyJSON = ({
  value
}) => JSON.stringify(value);
const jsonScalars = [{
  identify: value => typeof value === 'string',
  default: true,
  tag: 'tag:yaml.org,2002:str',
  resolve: str => str,
  stringify: stringifyJSON
}, {
  identify: value => value == null,
  createNode: () => new Scalar(null),
  default: true,
  tag: 'tag:yaml.org,2002:null',
  test: /^null$/,
  resolve: () => null,
  stringify: stringifyJSON
}, {
  identify: value => typeof value === 'boolean',
  default: true,
  tag: 'tag:yaml.org,2002:bool',
  test: /^true$|^false$/,
  resolve: str => str === 'true',
  stringify: stringifyJSON
}, {
  identify: intIdentify$1,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  test: /^-?(?:0|[1-9][0-9]*)$/,
  resolve: (str, _onError, {
    intAsBigInt
  }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
  stringify: ({
    value
  }) => intIdentify$1(value) ? value.toString() : JSON.stringify(value)
}, {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
  resolve: str => parseFloat(str),
  stringify: stringifyJSON
}];
const jsonError = {
  default: true,
  tag: '',
  test: /^/,
  resolve(str, onError) {
    onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    return str;
  }
};
const schema$1 = [map, seq].concat(jsonScalars, jsonError);

const binary = {
  identify: value => value instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: false,
  tag: 'tag:yaml.org,2002:binary',
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(src, onError) {
    if (typeof atob === 'function') {
      // On IE 11, atob() can't handle newlines
      const str = atob(src.replace(/[\n\r]/g, ''));
      const buffer = new Uint8Array(str.length);
      for (let i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i);
      return buffer;
    } else {
      onError('This environment does not support reading binary tags; either Buffer or atob is required');
      return src;
    }
  },
  stringify({
    comment,
    type,
    value
  }, ctx, onComment, onChompKeep) {
    const buf = value; // checked earlier by binary.identify()
    let str;
    if (typeof btoa === 'function') {
      let s = '';
      for (let i = 0; i < buf.length; ++i) s += String.fromCharCode(buf[i]);
      str = btoa(s);
    } else {
      throw new Error('This environment does not support writing binary tags; either Buffer or btoa is required');
    }
    if (!type) type = Scalar.BLOCK_LITERAL;
    if (type !== Scalar.QUOTE_DOUBLE) {
      const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
      const n = Math.ceil(str.length / lineWidth);
      const lines = new Array(n);
      for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
        lines[i] = str.substr(o, lineWidth);
      }
      str = lines.join(type === Scalar.BLOCK_LITERAL ? '\n' : ' ');
    }
    return stringifyString({
      comment,
      type,
      value: str
    }, ctx, onComment, onChompKeep);
  }
};

function resolvePairs(seq, onError) {
  if (isSeq(seq)) {
    for (let i = 0; i < seq.items.length; ++i) {
      let item = seq.items[i];
      if (isPair(item)) continue;else if (isMap(item)) {
        if (item.items.length > 1) onError('Each pair must have its own sequence indicator');
        const pair = item.items[0] || new Pair(new Scalar(null));
        if (item.commentBefore) pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}\n${pair.key.commentBefore}` : item.commentBefore;
        if (item.comment) {
          const cn = pair.value ?? pair.key;
          cn.comment = cn.comment ? `${item.comment}\n${cn.comment}` : item.comment;
        }
        item = pair;
      }
      seq.items[i] = isPair(item) ? item : new Pair(item);
    }
  } else onError('Expected a sequence for this tag');
  return seq;
}
function createPairs(schema, iterable, ctx) {
  const {
    replacer
  } = ctx;
  const pairs = new YAMLSeq(schema);
  pairs.tag = 'tag:yaml.org,2002:pairs';
  let i = 0;
  if (iterable && Symbol.iterator in Object(iterable)) for (let it of iterable) {
    if (typeof replacer === 'function') it = replacer.call(iterable, String(i++), it);
    let key, value;
    if (Array.isArray(it)) {
      if (it.length === 2) {
        key = it[0];
        value = it[1];
      } else throw new TypeError(`Expected [key, value] tuple: ${it}`);
    } else if (it && it instanceof Object) {
      const keys = Object.keys(it);
      if (keys.length === 1) {
        key = keys[0];
        value = it[key];
      } else {
        throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
      }
    } else {
      key = it;
    }
    pairs.items.push(createPair(key, value, ctx));
  }
  return pairs;
}
const pairs = {
  collection: 'seq',
  default: false,
  tag: 'tag:yaml.org,2002:pairs',
  resolve: resolvePairs,
  createNode: createPairs
};

class YAMLOMap extends YAMLSeq {
  constructor() {
    super();
    this.add = YAMLMap.prototype.add.bind(this);
    this.delete = YAMLMap.prototype.delete.bind(this);
    this.get = YAMLMap.prototype.get.bind(this);
    this.has = YAMLMap.prototype.has.bind(this);
    this.set = YAMLMap.prototype.set.bind(this);
    this.tag = YAMLOMap.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(_, ctx) {
    if (!ctx) return super.toJSON(_);
    const map = new Map();
    if (ctx !== null && ctx !== void 0 && ctx.onCreate) ctx.onCreate(map);
    for (const pair of this.items) {
      let key, value;
      if (isPair(pair)) {
        key = toJS(pair.key, '', ctx);
        value = toJS(pair.value, key, ctx);
      } else {
        key = toJS(pair, '', ctx);
      }
      if (map.has(key)) throw new Error('Ordered maps must not include duplicate keys');
      map.set(key, value);
    }
    return map;
  }
  static from(schema, iterable, ctx) {
    const pairs = createPairs(schema, iterable, ctx);
    const omap = new this();
    omap.items = pairs.items;
    return omap;
  }
}
YAMLOMap.tag = 'tag:yaml.org,2002:omap';
const omap = {
  collection: 'seq',
  identify: value => value instanceof Map,
  nodeClass: YAMLOMap,
  default: false,
  tag: 'tag:yaml.org,2002:omap',
  resolve(seq, onError) {
    const pairs = resolvePairs(seq, onError);
    const seenKeys = [];
    for (const {
      key
    } of pairs.items) {
      if (isScalar$1(key)) {
        if (seenKeys.includes(key.value)) {
          onError(`Ordered maps must not include duplicate keys: ${key.value}`);
        } else {
          seenKeys.push(key.value);
        }
      }
    }
    return Object.assign(new YAMLOMap(), pairs);
  },
  createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
};

function boolStringify({
  value,
  source
}, ctx) {
  const boolObj = value ? trueTag : falseTag;
  if (source && boolObj.test.test(source)) return source;
  return value ? ctx.options.trueStr : ctx.options.falseStr;
}
const trueTag = {
  identify: value => value === true,
  default: true,
  tag: 'tag:yaml.org,2002:bool',
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new Scalar(true),
  stringify: boolStringify
};
const falseTag = {
  identify: value => value === false,
  default: true,
  tag: 'tag:yaml.org,2002:bool',
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new Scalar(false),
  stringify: boolStringify
};

const floatNaN = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: str => str.slice(-3).toLowerCase() === 'nan' ? NaN : str[0] === '-' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
const floatExp = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  format: 'EXP',
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: str => parseFloat(str.replace(/_/g, '')),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
const float = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str.replace(/_/g, '')));
    const dot = str.indexOf('.');
    if (dot !== -1) {
      const f = str.substring(dot + 1).replace(/_/g, '');
      if (f[f.length - 1] === '0') node.minFractionDigits = f.length;
    }
    return node;
  },
  stringify: stringifyNumber
};

const intIdentify = value => typeof value === 'bigint' || Number.isInteger(value);
function intResolve(str, offset, radix, {
  intAsBigInt
}) {
  const sign = str[0];
  if (sign === '-' || sign === '+') offset += 1;
  str = str.substring(offset).replace(/_/g, '');
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`;
        break;
      case 8:
        str = `0o${str}`;
        break;
      case 16:
        str = `0x${str}`;
        break;
    }
    const n = BigInt(str);
    return sign === '-' ? BigInt(-1) * n : n;
  }
  const n = parseInt(str, radix);
  return sign === '-' ? -1 * n : n;
}
function intStringify(node, radix, prefix) {
  const {
    value
  } = node;
  if (intIdentify(value)) {
    const str = value.toString(radix);
    return value < 0 ? '-' + prefix + str.substr(1) : prefix + str;
  }
  return stringifyNumber(node);
}
const intBin = {
  identify: intIdentify,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  format: 'BIN',
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
  stringify: node => intStringify(node, 2, '0b')
};
const intOct = {
  identify: intIdentify,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  format: 'OCT',
  test: /^[-+]?0[0-7_]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
  stringify: node => intStringify(node, 8, '0')
};
const int = {
  identify: intIdentify,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
  stringify: stringifyNumber
};
const intHex = {
  identify: intIdentify,
  default: true,
  tag: 'tag:yaml.org,2002:int',
  format: 'HEX',
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
  stringify: node => intStringify(node, 16, '0x')
};

class YAMLSet extends YAMLMap {
  constructor(schema) {
    super(schema);
    this.tag = YAMLSet.tag;
  }
  add(key) {
    let pair;
    if (isPair(key)) pair = key;else if (key && typeof key === 'object' && 'key' in key && 'value' in key && key.value === null) pair = new Pair(key.key, null);else pair = new Pair(key, null);
    const prev = findPair(this.items, pair.key);
    if (!prev) this.items.push(pair);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(key, keepPair) {
    const pair = findPair(this.items, key);
    return !keepPair && isPair(pair) ? isScalar$1(pair.key) ? pair.key.value : pair.key : pair;
  }
  set(key, value) {
    if (typeof value !== 'boolean') throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
    const prev = findPair(this.items, key);
    if (prev && !value) {
      this.items.splice(this.items.indexOf(prev), 1);
    } else if (!prev && value) {
      this.items.push(new Pair(key));
    }
  }
  toJSON(_, ctx) {
    return super.toJSON(_, ctx, Set);
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx) return JSON.stringify(this);
    if (this.hasAllNullValues(true)) return super.toString(Object.assign({}, ctx, {
      allNullValues: true
    }), onComment, onChompKeep);else throw new Error('Set items must all have null values');
  }
  static from(schema, iterable, ctx) {
    const {
      replacer
    } = ctx;
    const set = new this(schema);
    if (iterable && Symbol.iterator in Object(iterable)) for (let value of iterable) {
      if (typeof replacer === 'function') value = replacer.call(iterable, value, value);
      set.items.push(createPair(value, null, ctx));
    }
    return set;
  }
}
YAMLSet.tag = 'tag:yaml.org,2002:set';
const set = {
  collection: 'map',
  identify: value => value instanceof Set,
  nodeClass: YAMLSet,
  default: false,
  tag: 'tag:yaml.org,2002:set',
  createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
  resolve(map, onError) {
    if (isMap(map)) {
      if (map.hasAllNullValues(true)) return Object.assign(new YAMLSet(), map);else onError('Set items must all have null values');
    } else onError('Expected a mapping for this tag');
    return map;
  }
};

/** Internal types handle bigint as number, because TS can't figure it out. */
function parseSexagesimal(str, asBigInt) {
  const sign = str[0];
  const parts = sign === '-' || sign === '+' ? str.substring(1) : str;
  const num = n => asBigInt ? BigInt(n) : Number(n);
  const res = parts.replace(/_/g, '').split(':').reduce((res, p) => res * num(60) + num(p), num(0));
  return sign === '-' ? num(-1) * res : res;
}
/**
 * hhhh:mm:ss.sss
 *
 * Internal types handle bigint as number, because TS can't figure it out.
 */
function stringifySexagesimal(node) {
  let {
    value
  } = node;
  let num = n => n;
  if (typeof value === 'bigint') num = n => BigInt(n);else if (isNaN(value) || !isFinite(value)) return stringifyNumber(node);
  let sign = '';
  if (value < 0) {
    sign = '-';
    value *= num(-1);
  }
  const _60 = num(60);
  const parts = [value % _60]; // seconds, including ms
  if (value < 60) {
    parts.unshift(0); // at least one : is required
  } else {
    value = (value - parts[0]) / _60;
    parts.unshift(value % _60); // minutes
    if (value >= 60) {
      value = (value - parts[0]) / _60;
      parts.unshift(value); // hours
    }
  }
  return sign + parts.map(n => String(n).padStart(2, '0')).join(':').replace(/000000\d*$/, '') // % 60 may introduce error
  ;
}
const intTime = {
  identify: value => typeof value === 'bigint' || Number.isInteger(value),
  default: true,
  tag: 'tag:yaml.org,2002:int',
  format: 'TIME',
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (str, _onError, {
    intAsBigInt
  }) => parseSexagesimal(str, intAsBigInt),
  stringify: stringifySexagesimal
};
const floatTime = {
  identify: value => typeof value === 'number',
  default: true,
  tag: 'tag:yaml.org,2002:float',
  format: 'TIME',
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: str => parseSexagesimal(str, false),
  stringify: stringifySexagesimal
};
const timestamp = {
  identify: value => value instanceof Date,
  default: true,
  tag: 'tag:yaml.org,2002:timestamp',
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp('^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})' +
  // YYYY-Mm-Dd
  '(?:' +
  // time is optional
  '(?:t|T|[ \\t]+)' +
  // t | T | whitespace
  '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)' +
  // Hh:Mm:Ss(.ss)?
  '(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?' +
  // Z | +5 | -03:30
  ')?$'),
  resolve(str) {
    const match = str.match(timestamp.test);
    if (!match) throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd');
    const [, year, month, day, hour, minute, second] = match.map(Number);
    const millisec = match[7] ? Number((match[7] + '00').substr(1, 3)) : 0;
    let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
    const tz = match[8];
    if (tz && tz !== 'Z') {
      let d = parseSexagesimal(tz, false);
      if (Math.abs(d) < 30) d *= 60;
      date -= 60000 * d;
    }
    return new Date(date);
  },
  stringify: ({
    value
  }) => value.toISOString().replace(/(T00:00:00)?\.000Z$/, '')
};

const schema = [map, seq, string, nullTag, trueTag, falseTag, intBin, intOct, int, intHex, floatNaN, floatExp, float, binary, merge, omap, pairs, set, intTime, floatTime, timestamp];

const schemas = new Map([['core', schema$2], ['failsafe', [map, seq, string]], ['json', schema$1], ['yaml11', schema], ['yaml-1.1', schema]]);
const tagsByName = {
  binary,
  bool: boolTag,
  float: float$1,
  floatExp: floatExp$1,
  floatNaN: floatNaN$1,
  floatTime,
  int: int$1,
  intHex: intHex$1,
  intOct: intOct$1,
  intTime,
  map,
  merge,
  null: nullTag,
  omap,
  pairs,
  seq,
  set,
  timestamp
};
const coreKnownTags = {
  'tag:yaml.org,2002:binary': binary,
  'tag:yaml.org,2002:merge': merge,
  'tag:yaml.org,2002:omap': omap,
  'tag:yaml.org,2002:pairs': pairs,
  'tag:yaml.org,2002:set': set,
  'tag:yaml.org,2002:timestamp': timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName);
  if (schemaTags && !customTags) {
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
  }
  let tags = schemaTags;
  if (!tags) {
    if (Array.isArray(customTags)) tags = [];else {
      const keys = Array.from(schemas.keys()).filter(key => key !== 'yaml11').map(key => JSON.stringify(key)).join(', ');
      throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
    }
  }
  if (Array.isArray(customTags)) {
    for (const tag of customTags) tags = tags.concat(tag);
  } else if (typeof customTags === 'function') {
    tags = customTags(tags.slice());
  }
  if (addMergeTag) tags = tags.concat(merge);
  return tags.reduce((tags, tag) => {
    const tagObj = typeof tag === 'string' ? tagsByName[tag] : tag;
    if (!tagObj) {
      const tagName = JSON.stringify(tag);
      const keys = Object.keys(tagsByName).map(key => JSON.stringify(key)).join(', ');
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
    }
    if (!tags.includes(tagObj)) tags.push(tagObj);
    return tags;
  }, []);
}

const sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
class Schema {
  constructor({
    compat,
    customTags,
    merge,
    resolveKnownTags,
    schema,
    sortMapEntries,
    toStringDefaults
  }) {
    this.compat = Array.isArray(compat) ? getTags(compat, 'compat') : compat ? getTags(null, compat) : null;
    this.name = typeof schema === 'string' && schema || 'core';
    this.knownTags = resolveKnownTags ? coreKnownTags : {};
    this.tags = getTags(customTags, this.name, merge);
    this.toStringOptions = toStringDefaults ?? null;
    Object.defineProperty(this, MAP, {
      value: map
    });
    Object.defineProperty(this, SCALAR$1, {
      value: string
    });
    Object.defineProperty(this, SEQ, {
      value: seq
    });
    // Used by createMap()
    this.sortMapEntries = typeof sortMapEntries === 'function' ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
  }
  clone() {
    const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
    copy.tags = this.tags.slice();
    return copy;
  }
}

function stringifyDocument(doc, options) {
  var _doc$directives;
  const lines = [];
  let hasDirectives = options.directives === true;
  if (options.directives !== false && doc.directives) {
    const dir = doc.directives.toString(doc);
    if (dir) {
      lines.push(dir);
      hasDirectives = true;
    } else if (doc.directives.docStart) hasDirectives = true;
  }
  if (hasDirectives) lines.push('---');
  const ctx = createStringifyContext(doc, options);
  const {
    commentString
  } = ctx.options;
  if (doc.commentBefore) {
    if (lines.length !== 1) lines.unshift('');
    const cs = commentString(doc.commentBefore);
    lines.unshift(indentComment(cs, ''));
  }
  let chompKeep = false;
  let contentComment = null;
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives) lines.push('');
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore);
        lines.push(indentComment(cs, ''));
      }
      // top-level block scalars need to be indented if followed by a comment
      ctx.forceBlockIndent = !!doc.comment;
      contentComment = doc.contents.comment;
    }
    const onChompKeep = contentComment ? undefined : () => chompKeep = true;
    let body = stringify$2(doc.contents, ctx, () => contentComment = null, onChompKeep);
    if (contentComment) body += lineComment(body, '', commentString(contentComment));
    if ((body[0] === '|' || body[0] === '>') && lines[lines.length - 1] === '---') {
      // Top-level block scalars with a preceding doc marker ought to use the
      // same line for their header.
      lines[lines.length - 1] = `--- ${body}`;
    } else lines.push(body);
  } else {
    lines.push(stringify$2(doc.contents, ctx));
  }
  if ((_doc$directives = doc.directives) !== null && _doc$directives !== void 0 && _doc$directives.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment);
      if (cs.includes('\n')) {
        lines.push('...');
        lines.push(indentComment(cs, ''));
      } else {
        lines.push(`... ${cs}`);
      }
    } else {
      lines.push('...');
    }
  } else {
    let dc = doc.comment;
    if (dc && chompKeep) dc = dc.replace(/^\n+/, '');
    if (dc) {
      if ((!chompKeep || contentComment) && lines[lines.length - 1] !== '') lines.push('');
      lines.push(indentComment(commentString(dc), ''));
    }
  }
  return lines.join('\n') + '\n';
}

class Document {
  constructor(value, replacer, options) {
    var _options;
    /** A comment before this Document */
    this.commentBefore = null;
    /** A comment immediately after this Document */
    this.comment = null;
    /** Errors encountered during parsing. */
    this.errors = [];
    /** Warnings encountered during parsing. */
    this.warnings = [];
    Object.defineProperty(this, NODE_TYPE, {
      value: DOC
    });
    let _replacer = null;
    if (typeof replacer === 'function' || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === undefined && replacer) {
      options = replacer;
      replacer = undefined;
    }
    const opt = Object.assign({
      intAsBigInt: false,
      keepSourceTokens: false,
      logLevel: 'warn',
      prettyErrors: true,
      strict: true,
      stringKeys: false,
      uniqueKeys: true,
      version: '1.2'
    }, options);
    this.options = opt;
    let {
      version
    } = opt;
    if ((_options = options) !== null && _options !== void 0 && _options._directives) {
      this.directives = options._directives.atDocument();
      if (this.directives.yaml.explicit) version = this.directives.yaml.version;
    } else this.directives = new Directives({
      version
    });
    this.setSchema(version, options);
    // @ts-expect-error We can't really know that this matches Contents.
    this.contents = value === undefined ? null : this.createNode(value, _replacer, options);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const copy = Object.create(Document.prototype, {
      [NODE_TYPE]: {
        value: DOC
      }
    });
    copy.commentBefore = this.commentBefore;
    copy.comment = this.comment;
    copy.errors = this.errors.slice();
    copy.warnings = this.warnings.slice();
    copy.options = Object.assign({}, this.options);
    if (this.directives) copy.directives = this.directives.clone();
    copy.schema = this.schema.clone();
    // @ts-expect-error We can't really know that this matches Contents.
    copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
    if (this.range) copy.range = this.range.slice();
    return copy;
  }
  /** Adds a value to the document. */
  add(value) {
    if (assertCollection(this.contents)) this.contents.add(value);
  }
  /** Adds a value to the document. */
  addIn(path, value) {
    if (assertCollection(this.contents)) this.contents.addIn(path, value);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(node, name) {
    if (!node.anchor) {
      const prev = anchorNames(this);
      node.anchor =
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !name || prev.has(name) ? findNewAnchor(name || 'a', prev) : name;
    }
    return new Alias(node.anchor);
  }
  createNode(value, replacer, options) {
    let _replacer = undefined;
    if (typeof replacer === 'function') {
      value = replacer.call({
        '': value
      }, '', value);
      _replacer = replacer;
    } else if (Array.isArray(replacer)) {
      const keyToStr = v => typeof v === 'number' || v instanceof String || v instanceof Number;
      const asStr = replacer.filter(keyToStr).map(String);
      if (asStr.length > 0) replacer = replacer.concat(asStr);
      _replacer = replacer;
    } else if (options === undefined && replacer) {
      options = replacer;
      replacer = undefined;
    }
    const {
      aliasDuplicateObjects,
      anchorPrefix,
      flow,
      keepUndefined,
      onTagObj,
      tag
    } = options ?? {};
    const {
      onAnchor,
      setAnchors,
      sourceObjects
    } = createNodeAnchors(this,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    anchorPrefix || 'a');
    const ctx = {
      aliasDuplicateObjects: aliasDuplicateObjects ?? true,
      keepUndefined: keepUndefined ?? false,
      onAnchor,
      onTagObj,
      replacer: _replacer,
      schema: this.schema,
      sourceObjects
    };
    const node = createNode(value, tag, ctx);
    if (flow && isCollection$1(node)) node.flow = true;
    setAnchors();
    return node;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(key, value, options = {}) {
    const k = this.createNode(key, null, options);
    const v = this.createNode(value, null, options);
    return new Pair(k, v);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    return assertCollection(this.contents) ? this.contents.delete(key) : false;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    if (isEmptyPath(path)) {
      if (this.contents == null) return false;
      // @ts-expect-error Presumed impossible if Strict extends false
      this.contents = null;
      return true;
    }
    return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(key, keepScalar) {
    return isCollection$1(this.contents) ? this.contents.get(key, keepScalar) : undefined;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    if (isEmptyPath(path)) return !keepScalar && isScalar$1(this.contents) ? this.contents.value : this.contents;
    return isCollection$1(this.contents) ? this.contents.getIn(path, keepScalar) : undefined;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(key) {
    return isCollection$1(this.contents) ? this.contents.has(key) : false;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(path) {
    if (isEmptyPath(path)) return this.contents !== undefined;
    return isCollection$1(this.contents) ? this.contents.hasIn(path) : false;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(key, value) {
    if (this.contents == null) {
      // @ts-expect-error We can't really know that this matches Contents.
      this.contents = collectionFromPath(this.schema, [key], value);
    } else if (assertCollection(this.contents)) {
      this.contents.set(key, value);
    }
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    if (isEmptyPath(path)) {
      // @ts-expect-error We can't really know that this matches Contents.
      this.contents = value;
    } else if (this.contents == null) {
      // @ts-expect-error We can't really know that this matches Contents.
      this.contents = collectionFromPath(this.schema, Array.from(path), value);
    } else if (assertCollection(this.contents)) {
      this.contents.setIn(path, value);
    }
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(version, options = {}) {
    if (typeof version === 'number') version = String(version);
    let opt;
    switch (version) {
      case '1.1':
        if (this.directives) this.directives.yaml.version = '1.1';else this.directives = new Directives({
          version: '1.1'
        });
        opt = {
          resolveKnownTags: false,
          schema: 'yaml-1.1'
        };
        break;
      case '1.2':
      case 'next':
        if (this.directives) this.directives.yaml.version = version;else this.directives = new Directives({
          version
        });
        opt = {
          resolveKnownTags: true,
          schema: 'core'
        };
        break;
      case null:
        if (this.directives) delete this.directives;
        opt = null;
        break;
      default:
        {
          const sv = JSON.stringify(version);
          throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
        }
    }
    // Not using `instanceof Schema` to allow for duck typing
    if (options.schema instanceof Object) this.schema = options.schema;else if (opt) this.schema = new Schema(Object.assign(opt, options));else throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
  }
  // json & jsonArg are only used from toJSON()
  toJS({
    json,
    jsonArg,
    mapAsMap,
    maxAliasCount,
    onAnchor,
    reviver
  } = {}) {
    const ctx = {
      anchors: new Map(),
      doc: this,
      keep: !json,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100
    };
    const res = toJS(this.contents, jsonArg ?? '', ctx);
    if (typeof onAnchor === 'function') for (const {
      count,
      res
    } of ctx.anchors.values()) onAnchor(res, count);
    return typeof reviver === 'function' ? applyReviver(reviver, {
      '': res
    }, '', res) : res;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(jsonArg, onAnchor) {
    return this.toJS({
      json: true,
      jsonArg,
      mapAsMap: false,
      onAnchor
    });
  }
  /** A YAML representation of the document. */
  toString(options = {}) {
    if (this.errors.length > 0) throw new Error('Document with errors cannot be stringified');
    if ('indent' in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
      const s = JSON.stringify(options.indent);
      throw new Error(`"indent" option must be a positive integer, not ${s}`);
    }
    return stringifyDocument(this, options);
  }
}
function assertCollection(contents) {
  if (isCollection$1(contents)) return true;
  throw new Error('Expected a YAML collection as document contents');
}

class YAMLError extends Error {
  constructor(name, pos, code, message) {
    super();
    this.name = name;
    this.code = code;
    this.message = message;
    this.pos = pos;
  }
}
class YAMLParseError extends YAMLError {
  constructor(pos, code, message) {
    super('YAMLParseError', pos, code, message);
  }
}
class YAMLWarning extends YAMLError {
  constructor(pos, code, message) {
    super('YAMLWarning', pos, code, message);
  }
}
const prettifyError = (src, lc) => error => {
  if (error.pos[0] === -1) return;
  error.linePos = error.pos.map(pos => lc.linePos(pos));
  const {
    line,
    col
  } = error.linePos[0];
  error.message += ` at line ${line}, column ${col}`;
  let ci = col - 1;
  let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, '');
  // Trim to max 80 chars, keeping col position near the middle
  if (ci >= 60 && lineStr.length > 80) {
    const trimStart = Math.min(ci - 39, lineStr.length - 79);
    lineStr = '…' + lineStr.substring(trimStart);
    ci -= trimStart - 1;
  }
  if (lineStr.length > 80) lineStr = lineStr.substring(0, 79) + '…';
  // Include previous line in context if pointing at line start
  if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
    // Regexp won't match if start is trimmed
    let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
    if (prev.length > 80) prev = prev.substring(0, 79) + '…\n';
    lineStr = prev + lineStr;
  }
  if (/[^ ]/.test(lineStr)) {
    let count = 1;
    const end = error.linePos[1];
    if (end && end.line === line && end.col > col) {
      count = Math.max(1, Math.min(end.col - col, 80 - ci));
    }
    const pointer = ' '.repeat(ci) + '^'.repeat(count);
    error.message += `:\n\n${lineStr}\n${pointer}\n`;
  }
};

function resolveProps(tokens, {
  flow,
  indicator,
  next,
  offset,
  onError,
  parentIndent,
  startOnNewline
}) {
  let spaceBefore = false;
  let atNewline = startOnNewline;
  let hasSpace = startOnNewline;
  let comment = '';
  let commentSep = '';
  let hasNewline = false;
  let reqSpace = false;
  let tab = null;
  let anchor = null;
  let tag = null;
  let newlineAfterProp = null;
  let comma = null;
  let found = null;
  let start = null;
  for (const token of tokens) {
    if (reqSpace) {
      if (token.type !== 'space' && token.type !== 'newline' && token.type !== 'comma') onError(token.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
      reqSpace = false;
    }
    if (tab) {
      if (atNewline && token.type !== 'comment' && token.type !== 'newline') {
        onError(tab, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
      }
      tab = null;
    }
    switch (token.type) {
      case 'space':
        // At the doc level, tabs at line start may be parsed
        // as leading white space rather than indentation.
        // In a flow collection, only the parser handles indent.
        if (!flow && (indicator !== 'doc-start' || (next === null || next === void 0 ? void 0 : next.type) !== 'flow-collection') && token.source.includes('\t')) {
          tab = token;
        }
        hasSpace = true;
        break;
      case 'comment':
        {
          if (!hasSpace) onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
          const cb = token.source.substring(1) || ' ';
          if (!comment) comment = cb;else comment += commentSep + cb;
          commentSep = '';
          atNewline = false;
          break;
        }
      case 'newline':
        if (atNewline) {
          if (comment) comment += token.source;else if (!found || indicator !== 'seq-item-ind') spaceBefore = true;
        } else commentSep += token.source;
        atNewline = true;
        hasNewline = true;
        if (anchor || tag) newlineAfterProp = token;
        hasSpace = true;
        break;
      case 'anchor':
        if (anchor) onError(token, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor');
        if (token.source.endsWith(':')) onError(token.offset + token.source.length - 1, 'BAD_ALIAS', 'Anchor ending in : is ambiguous', true);
        anchor = token;
        if (start === null) start = token.offset;
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      case 'tag':
        {
          if (tag) onError(token, 'MULTIPLE_TAGS', 'A node can have at most one tag');
          tag = token;
          if (start === null) start = token.offset;
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        }
      case indicator:
        // Could here handle preceding comments differently
        if (anchor || tag) onError(token, 'BAD_PROP_ORDER', `Anchors and tags must be after the ${token.source} indicator`);
        if (found) onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.source} in ${flow ?? 'collection'}`);
        found = token;
        atNewline = indicator === 'seq-item-ind' || indicator === 'explicit-key-ind';
        hasSpace = false;
        break;
      case 'comma':
        if (flow) {
          if (comma) onError(token, 'UNEXPECTED_TOKEN', `Unexpected , in ${flow}`);
          comma = token;
          atNewline = false;
          hasSpace = false;
          break;
        }
      // else fallthrough
      default:
        onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.type} token`);
        atNewline = false;
        hasSpace = false;
    }
  }
  const last = tokens[tokens.length - 1];
  const end = last ? last.offset + last.source.length : offset;
  if (reqSpace && next && next.type !== 'space' && next.type !== 'newline' && next.type !== 'comma' && (next.type !== 'scalar' || next.source !== '')) {
    onError(next.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
  }
  if (tab && (atNewline && tab.indent <= parentIndent || (next === null || next === void 0 ? void 0 : next.type) === 'block-map' || (next === null || next === void 0 ? void 0 : next.type) === 'block-seq')) onError(tab, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
  return {
    comma,
    found,
    spaceBefore,
    comment,
    hasNewline,
    anchor,
    tag,
    newlineAfterProp,
    end,
    start: start ?? end
  };
}

function containsNewline(key) {
  if (!key) return null;
  switch (key.type) {
    case 'alias':
    case 'scalar':
    case 'double-quoted-scalar':
    case 'single-quoted-scalar':
      if (key.source.includes('\n')) return true;
      if (key.end) for (const st of key.end) if (st.type === 'newline') return true;
      return false;
    case 'flow-collection':
      for (const it of key.items) {
        for (const st of it.start) if (st.type === 'newline') return true;
        if (it.sep) for (const st of it.sep) if (st.type === 'newline') return true;
        if (containsNewline(it.key) || containsNewline(it.value)) return true;
      }
      return false;
    default:
      return true;
  }
}

function flowIndentCheck(indent, fc, onError) {
  if ((fc === null || fc === void 0 ? void 0 : fc.type) === 'flow-collection') {
    const end = fc.end[0];
    if (end.indent === indent && (end.source === ']' || end.source === '}') && containsNewline(fc)) {
      const msg = 'Flow end indicator should be more indented than parent';
      onError(end, 'BAD_INDENT', msg, true);
    }
  }
}

function mapIncludes(ctx, items, search) {
  const {
    uniqueKeys
  } = ctx.options;
  if (uniqueKeys === false) return false;
  const isEqual = typeof uniqueKeys === 'function' ? uniqueKeys : (a, b) => a === b || isScalar$1(a) && isScalar$1(b) && a.value === b.value;
  return items.some(pair => isEqual(pair.key, search));
}

const startColMsg = 'All mapping items must start at the same column';
function resolveBlockMap({
  composeNode,
  composeEmptyNode
}, ctx, bm, onError, tag) {
  const NodeClass = (tag === null || tag === void 0 ? void 0 : tag.nodeClass) ?? YAMLMap;
  const map = new NodeClass(ctx.schema);
  if (ctx.atRoot) ctx.atRoot = false;
  let offset = bm.offset;
  let commentEnd = null;
  for (const collItem of bm.items) {
    var _keyProps$found;
    const {
      start,
      key,
      sep,
      value
    } = collItem;
    // key properties
    const keyProps = resolveProps(start, {
      indicator: 'explicit-key-ind',
      next: key ?? (sep === null || sep === void 0 ? void 0 : sep[0]),
      offset,
      onError,
      parentIndent: bm.indent,
      startOnNewline: true
    });
    const implicitKey = !keyProps.found;
    if (implicitKey) {
      if (key) {
        if (key.type === 'block-seq') onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'A block sequence may not be used as an implicit map key');else if ('indent' in key && key.indent !== bm.indent) onError(offset, 'BAD_INDENT', startColMsg);
      }
      if (!keyProps.anchor && !keyProps.tag && !sep) {
        commentEnd = keyProps.end;
        if (keyProps.comment) {
          if (map.comment) map.comment += '\n' + keyProps.comment;else map.comment = keyProps.comment;
        }
        continue;
      }
      if (keyProps.newlineAfterProp || containsNewline(key)) {
        onError(key ?? start[start.length - 1], 'MULTILINE_IMPLICIT_KEY', 'Implicit keys need to be on a single line');
      }
    } else if (((_keyProps$found = keyProps.found) === null || _keyProps$found === void 0 ? void 0 : _keyProps$found.indent) !== bm.indent) {
      onError(offset, 'BAD_INDENT', startColMsg);
    }
    // key value
    ctx.atKey = true;
    const keyStart = keyProps.end;
    const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
    if (ctx.schema.compat) flowIndentCheck(bm.indent, key, onError);
    ctx.atKey = false;
    if (mapIncludes(ctx, map.items, keyNode)) onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
    // value properties
    const valueProps = resolveProps(sep ?? [], {
      indicator: 'map-value-ind',
      next: value,
      offset: keyNode.range[2],
      onError,
      parentIndent: bm.indent,
      startOnNewline: !key || key.type === 'block-scalar'
    });
    offset = valueProps.end;
    if (valueProps.found) {
      if (implicitKey) {
        if ((value === null || value === void 0 ? void 0 : value.type) === 'block-map' && !valueProps.hasNewline) onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'Nested mappings are not allowed in compact mappings');
        if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024) onError(keyNode.range, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit block mapping key');
      }
      // value value
      const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
      if (ctx.schema.compat) flowIndentCheck(bm.indent, value, onError);
      offset = valueNode.range[2];
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
      map.items.push(pair);
    } else {
      // key with no value
      if (implicitKey) onError(keyNode.range, 'MISSING_CHAR', 'Implicit map keys need to be followed by map values');
      if (valueProps.comment) {
        if (keyNode.comment) keyNode.comment += '\n' + valueProps.comment;else keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode);
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
      map.items.push(pair);
    }
  }
  if (commentEnd && commentEnd < offset) onError(commentEnd, 'IMPOSSIBLE', 'Map comment with trailing content');
  map.range = [bm.offset, offset, commentEnd ?? offset];
  return map;
}

function resolveBlockSeq({
  composeNode,
  composeEmptyNode
}, ctx, bs, onError, tag) {
  const NodeClass = (tag === null || tag === void 0 ? void 0 : tag.nodeClass) ?? YAMLSeq;
  const seq = new NodeClass(ctx.schema);
  if (ctx.atRoot) ctx.atRoot = false;
  if (ctx.atKey) ctx.atKey = false;
  let offset = bs.offset;
  let commentEnd = null;
  for (const {
    start,
    value
  } of bs.items) {
    const props = resolveProps(start, {
      indicator: 'seq-item-ind',
      next: value,
      offset,
      onError,
      parentIndent: bs.indent,
      startOnNewline: true
    });
    if (!props.found) {
      if (props.anchor || props.tag || value) {
        if (value && value.type === 'block-seq') onError(props.end, 'BAD_INDENT', 'All sequence items must start at the same column');else onError(offset, 'MISSING_CHAR', 'Sequence item without - indicator');
      } else {
        commentEnd = props.end;
        if (props.comment) seq.comment = props.comment;
        continue;
      }
    }
    const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
    if (ctx.schema.compat) flowIndentCheck(bs.indent, value, onError);
    offset = node.range[2];
    seq.items.push(node);
  }
  seq.range = [bs.offset, offset, commentEnd ?? offset];
  return seq;
}

function resolveEnd(end, offset, reqSpace, onError) {
  let comment = '';
  if (end) {
    let hasSpace = false;
    let sep = '';
    for (const token of end) {
      const {
        source,
        type
      } = token;
      switch (type) {
        case 'space':
          hasSpace = true;
          break;
        case 'comment':
          {
            if (reqSpace && !hasSpace) onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
            const cb = source.substring(1) || ' ';
            if (!comment) comment = cb;else comment += sep + cb;
            sep = '';
            break;
          }
        case 'newline':
          if (comment) sep += source;
          hasSpace = true;
          break;
        default:
          onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${type} at node end`);
      }
      offset += source.length;
    }
  }
  return {
    comment,
    offset
  };
}

const blockMsg = 'Block collections are not allowed within flow collections';
const isBlock = token => token && (token.type === 'block-map' || token.type === 'block-seq');
function resolveFlowCollection({
  composeNode,
  composeEmptyNode
}, ctx, fc, onError, tag) {
  const isMap = fc.start.source === '{';
  const fcName = isMap ? 'flow map' : 'flow sequence';
  const NodeClass = (tag === null || tag === void 0 ? void 0 : tag.nodeClass) ?? (isMap ? YAMLMap : YAMLSeq);
  const coll = new NodeClass(ctx.schema);
  coll.flow = true;
  const atRoot = ctx.atRoot;
  if (atRoot) ctx.atRoot = false;
  if (ctx.atKey) ctx.atKey = false;
  let offset = fc.offset + fc.start.source.length;
  for (let i = 0; i < fc.items.length; ++i) {
    const collItem = fc.items[i];
    const {
      start,
      key,
      sep,
      value
    } = collItem;
    const props = resolveProps(start, {
      flow: fcName,
      indicator: 'explicit-key-ind',
      next: key ?? (sep === null || sep === void 0 ? void 0 : sep[0]),
      offset,
      onError,
      parentIndent: fc.indent,
      startOnNewline: false
    });
    if (!props.found) {
      if (!props.anchor && !props.tag && !sep && !value) {
        if (i === 0 && props.comma) onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);else if (i < fc.items.length - 1) onError(props.start, 'UNEXPECTED_TOKEN', `Unexpected empty item in ${fcName}`);
        if (props.comment) {
          if (coll.comment) coll.comment += '\n' + props.comment;else coll.comment = props.comment;
        }
        offset = props.end;
        continue;
      }
      if (!isMap && ctx.options.strict && containsNewline(key)) onError(key,
      // checked by containsNewline()
      'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
    }
    if (i === 0) {
      if (props.comma) onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
    } else {
      if (!props.comma) onError(props.start, 'MISSING_CHAR', `Missing , between ${fcName} items`);
      if (props.comment) {
        let prevItemComment = '';
        loop: for (const st of start) {
          switch (st.type) {
            case 'comma':
            case 'space':
              break;
            case 'comment':
              prevItemComment = st.source.substring(1);
              break loop;
            default:
              break loop;
          }
        }
        if (prevItemComment) {
          let prev = coll.items[coll.items.length - 1];
          if (isPair(prev)) prev = prev.value ?? prev.key;
          if (prev.comment) prev.comment += '\n' + prevItemComment;else prev.comment = prevItemComment;
          props.comment = props.comment.substring(prevItemComment.length + 1);
        }
      }
    }
    if (!isMap && !sep && !props.found) {
      // item is a value in a seq
      // → key & sep are empty, start does not include ? or :
      const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
      coll.items.push(valueNode);
      offset = valueNode.range[2];
      if (isBlock(value)) onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
    } else {
      // item is a key+value pair
      // key value
      ctx.atKey = true;
      const keyStart = props.end;
      const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
      if (isBlock(key)) onError(keyNode.range, 'BLOCK_IN_FLOW', blockMsg);
      ctx.atKey = false;
      // value properties
      const valueProps = resolveProps(sep ?? [], {
        flow: fcName,
        indicator: 'map-value-ind',
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (valueProps.found) {
        if (!isMap && !props.found && ctx.options.strict) {
          if (sep) for (const st of sep) {
            if (st === valueProps.found) break;
            if (st.type === 'newline') {
              onError(st, 'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
              break;
            }
          }
          if (props.start < valueProps.found.offset - 1024) onError(valueProps.found, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key');
        }
      } else if (value) {
        if ('source' in value && value.source && value.source[0] === ':') onError(value, 'MISSING_CHAR', `Missing space after : in ${fcName}`);else onError(valueProps.start, 'MISSING_CHAR', `Missing , or : between ${fcName} items`);
      }
      // value value
      const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
      if (valueNode) {
        if (isBlock(value)) onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
      } else if (valueProps.comment) {
        if (keyNode.comment) keyNode.comment += '\n' + valueProps.comment;else keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
      if (isMap) {
        const map = coll;
        if (mapIncludes(ctx, map.items, keyNode)) onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
        map.items.push(pair);
      } else {
        const map = new YAMLMap(ctx.schema);
        map.flow = true;
        map.items.push(pair);
        const endRange = (valueNode ?? keyNode).range;
        map.range = [keyNode.range[0], endRange[1], endRange[2]];
        coll.items.push(map);
      }
      offset = valueNode ? valueNode.range[2] : valueProps.end;
    }
  }
  const expectedEnd = isMap ? '}' : ']';
  const [ce, ...ee] = fc.end;
  let cePos = offset;
  if (ce && ce.source === expectedEnd) cePos = ce.offset + ce.source.length;else {
    const name = fcName[0].toUpperCase() + fcName.substring(1);
    const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
    onError(offset, atRoot ? 'MISSING_CHAR' : 'BAD_INDENT', msg);
    if (ce && ce.source.length !== 1) ee.unshift(ce);
  }
  if (ee.length > 0) {
    const end = resolveEnd(ee, cePos, ctx.options.strict, onError);
    if (end.comment) {
      if (coll.comment) coll.comment += '\n' + end.comment;else coll.comment = end.comment;
    }
    coll.range = [fc.offset, cePos, end.offset];
  } else {
    coll.range = [fc.offset, cePos, cePos];
  }
  return coll;
}

function resolveCollection(CN, ctx, token, onError, tagName, tag) {
  const coll = token.type === 'block-map' ? resolveBlockMap(CN, ctx, token, onError, tag) : token.type === 'block-seq' ? resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection(CN, ctx, token, onError, tag);
  const Coll = coll.constructor;
  // If we got a tagName matching the class, or the tag name is '!',
  // then use the tagName from the node class used to create it.
  if (tagName === '!' || tagName === Coll.tagName) {
    coll.tag = Coll.tagName;
    return coll;
  }
  if (tagName) coll.tag = tagName;
  return coll;
}
function composeCollection(CN, ctx, token, props, onError) {
  var _tag$resolve, _tag, _tag2;
  const tagToken = props.tag;
  const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg));
  if (token.type === 'block-seq') {
    const {
      anchor,
      newlineAfterProp: nl
    } = props;
    const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
    if (lastProp && (!nl || nl.offset < lastProp.offset)) {
      const message = 'Missing newline after block sequence props';
      onError(lastProp, 'MISSING_CHAR', message);
    }
  }
  const expType = token.type === 'block-map' ? 'map' : token.type === 'block-seq' ? 'seq' : token.start.source === '{' ? 'map' : 'seq';
  // shortcut: check if it's a generic YAMLMap or YAMLSeq
  // before jumping into the custom tag logic.
  if (!tagToken || !tagName || tagName === '!' || tagName === YAMLMap.tagName && expType === 'map' || tagName === YAMLSeq.tagName && expType === 'seq') {
    return resolveCollection(CN, ctx, token, onError, tagName);
  }
  let tag = ctx.schema.tags.find(t => t.tag === tagName && t.collection === expType);
  if (!tag) {
    const kt = ctx.schema.knownTags[tagName];
    if (kt && kt.collection === expType) {
      ctx.schema.tags.push(Object.assign({}, kt, {
        default: false
      }));
      tag = kt;
    } else {
      if (kt !== null && kt !== void 0 && kt.collection) {
        onError(tagToken, 'BAD_COLLECTION_TYPE', `${kt.tag} used for ${expType} collection, but expects ${kt.collection}`, true);
      } else {
        onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, true);
      }
      return resolveCollection(CN, ctx, token, onError, tagName);
    }
  }
  const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
  const res = ((_tag$resolve = (_tag = tag).resolve) === null || _tag$resolve === void 0 ? void 0 : _tag$resolve.call(_tag, coll, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg), ctx.options)) ?? coll;
  const node = isNode(res) ? res : new Scalar(res);
  node.range = coll.range;
  node.tag = tagName;
  if ((_tag2 = tag) !== null && _tag2 !== void 0 && _tag2.format) node.format = tag.format;
  return node;
}

function resolveBlockScalar(ctx, scalar, onError) {
  const start = scalar.offset;
  const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
  if (!header) return {
    value: '',
    type: null,
    comment: '',
    range: [start, start, start]
  };
  const type = header.mode === '>' ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
  const lines = scalar.source ? splitLines(scalar.source) : [];
  // determine the end of content & start of chomping
  let chompStart = lines.length;
  for (let i = lines.length - 1; i >= 0; --i) {
    const content = lines[i][1];
    if (content === '' || content === '\r') chompStart = i;else break;
  }
  // shortcut for empty contents
  if (chompStart === 0) {
    const value = header.chomp === '+' && lines.length > 0 ? '\n'.repeat(Math.max(1, lines.length - 1)) : '';
    let end = start + header.length;
    if (scalar.source) end += scalar.source.length;
    return {
      value,
      type,
      comment: header.comment,
      range: [start, end, end]
    };
  }
  // find the indentation level to trim from start
  let trimIndent = scalar.indent + header.indent;
  let offset = scalar.offset + header.length;
  let contentStart = 0;
  for (let i = 0; i < chompStart; ++i) {
    const [indent, content] = lines[i];
    if (content === '' || content === '\r') {
      if (header.indent === 0 && indent.length > trimIndent) trimIndent = indent.length;
    } else {
      if (indent.length < trimIndent) {
        const message = 'Block scalars with more-indented leading empty lines must use an explicit indentation indicator';
        onError(offset + indent.length, 'MISSING_CHAR', message);
      }
      if (header.indent === 0) trimIndent = indent.length;
      contentStart = i;
      if (trimIndent === 0 && !ctx.atRoot) {
        const message = 'Block scalar values in collections must be indented';
        onError(offset, 'BAD_INDENT', message);
      }
      break;
    }
    offset += indent.length + content.length + 1;
  }
  // include trailing more-indented empty lines in content
  for (let i = lines.length - 1; i >= chompStart; --i) {
    if (lines[i][0].length > trimIndent) chompStart = i + 1;
  }
  let value = '';
  let sep = '';
  let prevMoreIndented = false;
  // leading whitespace is kept intact
  for (let i = 0; i < contentStart; ++i) value += lines[i][0].slice(trimIndent) + '\n';
  for (let i = contentStart; i < chompStart; ++i) {
    let [indent, content] = lines[i];
    offset += indent.length + content.length + 1;
    const crlf = content[content.length - 1] === '\r';
    if (crlf) content = content.slice(0, -1);
    /* istanbul ignore if already caught in lexer */
    if (content && indent.length < trimIndent) {
      const src = header.indent ? 'explicit indentation indicator' : 'first line';
      const message = `Block scalar lines must not be less indented than their ${src}`;
      onError(offset - content.length - (crlf ? 2 : 1), 'BAD_INDENT', message);
      indent = '';
    }
    if (type === Scalar.BLOCK_LITERAL) {
      value += sep + indent.slice(trimIndent) + content;
      sep = '\n';
    } else if (indent.length > trimIndent || content[0] === '\t') {
      // more-indented content within a folded block
      if (sep === ' ') sep = '\n';else if (!prevMoreIndented && sep === '\n') sep = '\n\n';
      value += sep + indent.slice(trimIndent) + content;
      sep = '\n';
      prevMoreIndented = true;
    } else if (content === '') {
      // empty line
      if (sep === '\n') value += '\n';else sep = '\n';
    } else {
      value += sep + content;
      sep = ' ';
      prevMoreIndented = false;
    }
  }
  switch (header.chomp) {
    case '-':
      break;
    case '+':
      for (let i = chompStart; i < lines.length; ++i) value += '\n' + lines[i][0].slice(trimIndent);
      if (value[value.length - 1] !== '\n') value += '\n';
      break;
    default:
      value += '\n';
  }
  const end = start + header.length + scalar.source.length;
  return {
    value,
    type,
    comment: header.comment,
    range: [start, end, end]
  };
}
function parseBlockScalarHeader({
  offset,
  props
}, strict, onError) {
  /* istanbul ignore if should not happen */
  if (props[0].type !== 'block-scalar-header') {
    onError(props[0], 'IMPOSSIBLE', 'Block scalar header not found');
    return null;
  }
  const {
    source
  } = props[0];
  const mode = source[0];
  let indent = 0;
  let chomp = '';
  let error = -1;
  for (let i = 1; i < source.length; ++i) {
    const ch = source[i];
    if (!chomp && (ch === '-' || ch === '+')) chomp = ch;else {
      const n = Number(ch);
      if (!indent && n) indent = n;else if (error === -1) error = offset + i;
    }
  }
  if (error !== -1) onError(error, 'UNEXPECTED_TOKEN', `Block scalar header includes extra characters: ${source}`);
  let hasSpace = false;
  let comment = '';
  let length = source.length;
  for (let i = 1; i < props.length; ++i) {
    const token = props[i];
    switch (token.type) {
      case 'space':
        hasSpace = true;
      // fallthrough
      case 'newline':
        length += token.source.length;
        break;
      case 'comment':
        if (strict && !hasSpace) {
          const message = 'Comments must be separated from other tokens by white space characters';
          onError(token, 'MISSING_CHAR', message);
        }
        length += token.source.length;
        comment = token.source.substring(1);
        break;
      case 'error':
        onError(token, 'UNEXPECTED_TOKEN', token.message);
        length += token.source.length;
        break;
      /* istanbul ignore next should not happen */
      default:
        {
          const message = `Unexpected token in block scalar header: ${token.type}`;
          onError(token, 'UNEXPECTED_TOKEN', message);
          const ts = token.source;
          if (ts && typeof ts === 'string') length += ts.length;
        }
    }
  }
  return {
    mode,
    indent,
    chomp,
    comment,
    length
  };
}
/** @returns Array of lines split up as `[indent, content]` */
function splitLines(source) {
  const split = source.split(/\n( *)/);
  const first = split[0];
  const m = first.match(/^( *)/);
  const line0 = m !== null && m !== void 0 && m[1] ? [m[1], first.slice(m[1].length)] : ['', first];
  const lines = [line0];
  for (let i = 1; i < split.length; i += 2) lines.push([split[i], split[i + 1]]);
  return lines;
}

function resolveFlowScalar(scalar, strict, onError) {
  const {
    offset,
    type,
    source,
    end
  } = scalar;
  let _type;
  let value;
  const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
  switch (type) {
    case 'scalar':
      _type = Scalar.PLAIN;
      value = plainValue(source, _onError);
      break;
    case 'single-quoted-scalar':
      _type = Scalar.QUOTE_SINGLE;
      value = singleQuotedValue(source, _onError);
      break;
    case 'double-quoted-scalar':
      _type = Scalar.QUOTE_DOUBLE;
      value = doubleQuotedValue(source, _onError);
      break;
    /* istanbul ignore next should not happen */
    default:
      onError(scalar, 'UNEXPECTED_TOKEN', `Expected a flow scalar value, but found: ${type}`);
      return {
        value: '',
        type: null,
        comment: '',
        range: [offset, offset + source.length, offset + source.length]
      };
  }
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, strict, onError);
  return {
    value,
    type: _type,
    comment: re.comment,
    range: [offset, valueEnd, re.offset]
  };
}
function plainValue(source, onError) {
  let badChar = '';
  switch (source[0]) {
    /* istanbul ignore next should not happen */
    case '\t':
      badChar = 'a tab character';
      break;
    case ',':
      badChar = 'flow indicator character ,';
      break;
    case '%':
      badChar = 'directive indicator character %';
      break;
    case '|':
    case '>':
      {
        badChar = `block scalar indicator ${source[0]}`;
        break;
      }
    case '@':
    case '`':
      {
        badChar = `reserved character ${source[0]}`;
        break;
      }
  }
  if (badChar) onError(0, 'BAD_SCALAR_START', `Plain value cannot start with ${badChar}`);
  return foldLines(source);
}
function singleQuotedValue(source, onError) {
  if (source[source.length - 1] !== "'" || source.length === 1) onError(source.length, 'MISSING_CHAR', "Missing closing 'quote");
  return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function foldLines(source) {
  var _match;
  /**
   * The negative lookbehind here and in the `re` RegExp is to
   * prevent causing a polynomial search time in certain cases.
   *
   * The try-catch is for Safari, which doesn't support this yet:
   * https://caniuse.com/js-regexp-lookbehind
   */
  let first, line;
  try {
    first = new RegExp('(.*?)(?<![ \t])[ \t]*\r?\n', 'sy');
    line = new RegExp('[ \t]*(.*?)(?:(?<![ \t])[ \t]*)?\r?\n', 'sy');
  } catch {
    first = /(.*?)[ \t]*\r?\n/sy;
    line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let match = first.exec(source);
  if (!match) return source;
  let res = match[1];
  let sep = ' ';
  let pos = first.lastIndex;
  line.lastIndex = pos;
  while (match = line.exec(source)) {
    if (match[1] === '') {
      if (sep === '\n') res += sep;else sep = '\n';
    } else {
      res += sep + match[1];
      sep = ' ';
    }
    pos = line.lastIndex;
  }
  const last = /[ \t]*(.*)/sy;
  last.lastIndex = pos;
  match = last.exec(source);
  return res + sep + (((_match = match) === null || _match === void 0 ? void 0 : _match[1]) ?? '');
}
function doubleQuotedValue(source, onError) {
  let res = '';
  for (let i = 1; i < source.length - 1; ++i) {
    const ch = source[i];
    if (ch === '\r' && source[i + 1] === '\n') continue;
    if (ch === '\n') {
      const {
        fold,
        offset
      } = foldNewline(source, i);
      res += fold;
      i = offset;
    } else if (ch === '\\') {
      let next = source[++i];
      const cc = escapeCodes[next];
      if (cc) res += cc;else if (next === '\n') {
        // skip escaped newlines, but still trim the following line
        next = source[i + 1];
        while (next === ' ' || next === '\t') next = source[++i + 1];
      } else if (next === '\r' && source[i + 1] === '\n') {
        // skip escaped CRLF newlines, but still trim the following line
        next = source[++i + 1];
        while (next === ' ' || next === '\t') next = source[++i + 1];
      } else if (next === 'x' || next === 'u' || next === 'U') {
        const length = {
          x: 2,
          u: 4,
          U: 8
        }[next];
        res += parseCharCode(source, i + 1, length, onError);
        i += length;
      } else {
        const raw = source.substr(i - 1, 2);
        onError(i - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
        res += raw;
      }
    } else if (ch === ' ' || ch === '\t') {
      // trim trailing whitespace
      const wsStart = i;
      let next = source[i + 1];
      while (next === ' ' || next === '\t') next = source[++i + 1];
      if (next !== '\n' && !(next === '\r' && source[i + 2] === '\n')) res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
    } else {
      res += ch;
    }
  }
  if (source[source.length - 1] !== '"' || source.length === 1) onError(source.length, 'MISSING_CHAR', 'Missing closing "quote');
  return res;
}
/**
 * Fold a single newline into a space, multiple newlines to N - 1 newlines.
 * Presumes `source[offset] === '\n'`
 */
function foldNewline(source, offset) {
  let fold = '';
  let ch = source[offset + 1];
  while (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
    if (ch === '\r' && source[offset + 2] !== '\n') break;
    if (ch === '\n') fold += '\n';
    offset += 1;
    ch = source[offset + 1];
  }
  if (!fold) fold = ' ';
  return {
    fold,
    offset
  };
}
const escapeCodes = {
  '0': '\0',
  // null character
  a: '\x07',
  // bell character
  b: '\b',
  // backspace
  e: '\x1b',
  // escape character
  f: '\f',
  // form feed
  n: '\n',
  // line feed
  r: '\r',
  // carriage return
  t: '\t',
  // horizontal tab
  v: '\v',
  // vertical tab
  N: '\u0085',
  // Unicode next line
  _: '\u00a0',
  // Unicode non-breaking space
  L: '\u2028',
  // Unicode line separator
  P: '\u2029',
  // Unicode paragraph separator
  ' ': ' ',
  '"': '"',
  '/': '/',
  '\\': '\\',
  '\t': '\t'
};
function parseCharCode(source, offset, length, onError) {
  const cc = source.substr(offset, length);
  const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
  const code = ok ? parseInt(cc, 16) : NaN;
  if (isNaN(code)) {
    const raw = source.substr(offset - 2, length + 2);
    onError(offset - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
    return raw;
  }
  return String.fromCodePoint(code);
}

function composeScalar(ctx, token, tagToken, onError) {
  const {
    value,
    type,
    comment,
    range
  } = token.type === 'block-scalar' ? resolveBlockScalar(ctx, token, onError) : resolveFlowScalar(token, ctx.options.strict, onError);
  const tagName = tagToken ? ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg)) : null;
  let tag;
  if (ctx.options.stringKeys && ctx.atKey) {
    tag = ctx.schema[SCALAR$1];
  } else if (tagName) tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);else if (token.type === 'scalar') tag = findScalarTagByTest(ctx, value, token, onError);else tag = ctx.schema[SCALAR$1];
  let scalar;
  try {
    const res = tag.resolve(value, msg => onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg), ctx.options);
    scalar = isScalar$1(res) ? res : new Scalar(res);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg);
    scalar = new Scalar(value);
  }
  scalar.range = range;
  scalar.source = value;
  if (type) scalar.type = type;
  if (tagName) scalar.tag = tagName;
  if (tag.format) scalar.format = tag.format;
  if (comment) scalar.comment = comment;
  return scalar;
}
function findScalarTagByName(schema, value, tagName, tagToken, onError) {
  if (tagName === '!') return schema[SCALAR$1]; // non-specific tag
  const matchWithTest = [];
  for (const tag of schema.tags) {
    if (!tag.collection && tag.tag === tagName) {
      if (tag.default && tag.test) matchWithTest.push(tag);else return tag;
    }
  }
  for (const tag of matchWithTest) {
    var _tag$test;
    if ((_tag$test = tag.test) !== null && _tag$test !== void 0 && _tag$test.test(value)) return tag;
  }
  const kt = schema.knownTags[tagName];
  if (kt && !kt.collection) {
    // Ensure that the known tag is available for stringifying,
    // but does not get used by default.
    schema.tags.push(Object.assign({}, kt, {
      default: false,
      test: undefined
    }));
    return kt;
  }
  onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, tagName !== 'tag:yaml.org,2002:str');
  return schema[SCALAR$1];
}
function findScalarTagByTest({
  atKey,
  directives,
  schema
}, value, token, onError) {
  const tag = schema.tags.find(tag => {
    var _tag$test2;
    return (tag.default === true || atKey && tag.default === 'key') && ((_tag$test2 = tag.test) === null || _tag$test2 === void 0 ? void 0 : _tag$test2.test(value));
  }) || schema[SCALAR$1];
  if (schema.compat) {
    const compat = schema.compat.find(tag => {
      var _tag$test3;
      return tag.default && ((_tag$test3 = tag.test) === null || _tag$test3 === void 0 ? void 0 : _tag$test3.test(value));
    }) ?? schema[SCALAR$1];
    if (tag.tag !== compat.tag) {
      const ts = directives.tagString(tag.tag);
      const cs = directives.tagString(compat.tag);
      const msg = `Value may be parsed as either ${ts} or ${cs}`;
      onError(token, 'TAG_RESOLVE_FAILED', msg, true);
    }
  }
  return tag;
}

function emptyScalarPosition(offset, before, pos) {
  if (before) {
    if (pos === null) pos = before.length;
    for (let i = pos - 1; i >= 0; --i) {
      let st = before[i];
      switch (st.type) {
        case 'space':
        case 'comment':
        case 'newline':
          offset -= st.source.length;
          continue;
      }
      // Technically, an empty scalar is immediately after the last non-empty
      // node, but it's more useful to place it after any whitespace.
      st = before[++i];
      while (((_st = st) === null || _st === void 0 ? void 0 : _st.type) === 'space') {
        var _st;
        offset += st.source.length;
        st = before[++i];
      }
      break;
    }
  }
  return offset;
}

const CN = {
  composeNode,
  composeEmptyNode
};
function composeNode(ctx, token, props, onError) {
  const atKey = ctx.atKey;
  const {
    spaceBefore,
    comment,
    anchor,
    tag
  } = props;
  let node;
  let isSrcToken = true;
  switch (token.type) {
    case 'alias':
      node = composeAlias(ctx, token, onError);
      if (anchor || tag) onError(token, 'ALIAS_PROPS', 'An alias node must not specify any properties');
      break;
    case 'scalar':
    case 'single-quoted-scalar':
    case 'double-quoted-scalar':
    case 'block-scalar':
      node = composeScalar(ctx, token, tag, onError);
      if (anchor) node.anchor = anchor.source.substring(1);
      break;
    case 'block-map':
    case 'block-seq':
    case 'flow-collection':
      node = composeCollection(CN, ctx, token, props, onError);
      if (anchor) node.anchor = anchor.source.substring(1);
      break;
    default:
      {
        const message = token.type === 'error' ? token.message : `Unsupported token (type: ${token.type})`;
        onError(token, 'UNEXPECTED_TOKEN', message);
        node = composeEmptyNode(ctx, token.offset, undefined, null, props, onError);
        isSrcToken = false;
      }
  }
  if (anchor && node.anchor === '') onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
  if (atKey && ctx.options.stringKeys && (!isScalar$1(node) || typeof node.value !== 'string' || node.tag && node.tag !== 'tag:yaml.org,2002:str')) {
    const msg = 'With stringKeys, all keys must be strings';
    onError(tag ?? token, 'NON_STRING_KEY', msg);
  }
  if (spaceBefore) node.spaceBefore = true;
  if (comment) {
    if (token.type === 'scalar' && token.source === '') node.comment = comment;else node.commentBefore = comment;
  }
  // @ts-expect-error Type checking misses meaning of isSrcToken
  if (ctx.options.keepSourceTokens && isSrcToken) node.srcToken = token;
  return node;
}
function composeEmptyNode(ctx, offset, before, pos, {
  spaceBefore,
  comment,
  anchor,
  tag,
  end
}, onError) {
  const token = {
    type: 'scalar',
    offset: emptyScalarPosition(offset, before, pos),
    indent: -1,
    source: ''
  };
  const node = composeScalar(ctx, token, tag, onError);
  if (anchor) {
    node.anchor = anchor.source.substring(1);
    if (node.anchor === '') onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
  }
  if (spaceBefore) node.spaceBefore = true;
  if (comment) {
    node.comment = comment;
    node.range[2] = end;
  }
  return node;
}
function composeAlias({
  options
}, {
  offset,
  source,
  end
}, onError) {
  const alias = new Alias(source.substring(1));
  if (alias.source === '') onError(offset, 'BAD_ALIAS', 'Alias cannot be an empty string');
  if (alias.source.endsWith(':')) onError(offset + source.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', true);
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, options.strict, onError);
  alias.range = [offset, valueEnd, re.offset];
  if (re.comment) alias.comment = re.comment;
  return alias;
}

function composeDoc(options, directives, {
  offset,
  start,
  value,
  end
}, onError) {
  const opts = Object.assign({
    _directives: directives
  }, options);
  const doc = new Document(undefined, opts);
  const ctx = {
    atKey: false,
    atRoot: true,
    directives: doc.directives,
    options: doc.options,
    schema: doc.schema
  };
  const props = resolveProps(start, {
    indicator: 'doc-start',
    next: value ?? (end === null || end === void 0 ? void 0 : end[0]),
    offset,
    onError,
    parentIndent: 0,
    startOnNewline: true
  });
  if (props.found) {
    doc.directives.docStart = true;
    if (value && (value.type === 'block-map' || value.type === 'block-seq') && !props.hasNewline) onError(props.end, 'MISSING_CHAR', 'Block collection cannot start on same line with directives-end marker');
  }
  // @ts-expect-error If Contents is set, let's trust the user
  doc.contents = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
  const contentEnd = doc.contents.range[2];
  const re = resolveEnd(end, contentEnd, false, onError);
  if (re.comment) doc.comment = re.comment;
  doc.range = [offset, contentEnd, re.offset];
  return doc;
}

function getErrorPos(src) {
  if (typeof src === 'number') return [src, src + 1];
  if (Array.isArray(src)) return src.length === 2 ? src : [src[0], src[1]];
  const {
    offset,
    source
  } = src;
  return [offset, offset + (typeof source === 'string' ? source.length : 1)];
}
function parsePrelude(prelude) {
  var _prelude;
  let comment = '';
  let atComment = false;
  let afterEmptyLine = false;
  for (let i = 0; i < prelude.length; ++i) {
    const source = prelude[i];
    switch (source[0]) {
      case '#':
        comment += (comment === '' ? '' : afterEmptyLine ? '\n\n' : '\n') + (source.substring(1) || ' ');
        atComment = true;
        afterEmptyLine = false;
        break;
      case '%':
        if (((_prelude = prelude[i + 1]) === null || _prelude === void 0 ? void 0 : _prelude[0]) !== '#') i += 1;
        atComment = false;
        break;
      default:
        // This may be wrong after doc-end, but in that case it doesn't matter
        if (!atComment) afterEmptyLine = true;
        atComment = false;
    }
  }
  return {
    comment,
    afterEmptyLine
  };
}
/**
 * Compose a stream of CST nodes into a stream of YAML Documents.
 *
 * ```ts
 * import { Composer, Parser } from 'yaml'
 *
 * const src: string = ...
 * const tokens = new Parser().parse(src)
 * const docs = new Composer().compose(tokens)
 * ```
 */
class Composer {
  constructor(options = {}) {
    this.doc = null;
    this.atDirectives = false;
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
    this.onError = (source, code, message, warning) => {
      const pos = getErrorPos(source);
      if (warning) this.warnings.push(new YAMLWarning(pos, code, message));else this.errors.push(new YAMLParseError(pos, code, message));
    };
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.directives = new Directives({
      version: options.version || '1.2'
    });
    this.options = options;
  }
  decorate(doc, afterDoc) {
    const {
      comment,
      afterEmptyLine
    } = parsePrelude(this.prelude);
    //console.log({ dc: doc.comment, prelude, comment })
    if (comment) {
      const dc = doc.contents;
      if (afterDoc) {
        doc.comment = doc.comment ? `${doc.comment}\n${comment}` : comment;
      } else if (afterEmptyLine || doc.directives.docStart || !dc) {
        doc.commentBefore = comment;
      } else if (isCollection$1(dc) && !dc.flow && dc.items.length > 0) {
        let it = dc.items[0];
        if (isPair(it)) it = it.key;
        const cb = it.commentBefore;
        it.commentBefore = cb ? `${comment}\n${cb}` : comment;
      } else {
        const cb = dc.commentBefore;
        dc.commentBefore = cb ? `${comment}\n${cb}` : comment;
      }
    }
    if (afterDoc) {
      Array.prototype.push.apply(doc.errors, this.errors);
      Array.prototype.push.apply(doc.warnings, this.warnings);
    } else {
      doc.errors = this.errors;
      doc.warnings = this.warnings;
    }
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: parsePrelude(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(tokens, forceDoc = false, endOffset = -1) {
    for (const token of tokens) yield* this.next(token);
    yield* this.end(forceDoc, endOffset);
  }
  /** Advance the composer by one CST token. */
  *next(token) {
    switch (token.type) {
      case 'directive':
        this.directives.add(token.source, (offset, message, warning) => {
          const pos = getErrorPos(token);
          pos[0] += offset;
          this.onError(pos, 'BAD_DIRECTIVE', message, warning);
        });
        this.prelude.push(token.source);
        this.atDirectives = true;
        break;
      case 'document':
        {
          const doc = composeDoc(this.options, this.directives, token, this.onError);
          if (this.atDirectives && !doc.directives.docStart) this.onError(token, 'MISSING_CHAR', 'Missing directives-end/doc-start indicator line');
          this.decorate(doc, false);
          if (this.doc) yield this.doc;
          this.doc = doc;
          this.atDirectives = false;
          break;
        }
      case 'byte-order-mark':
      case 'space':
        break;
      case 'comment':
      case 'newline':
        this.prelude.push(token.source);
        break;
      case 'error':
        {
          const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
          const error = new YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg);
          if (this.atDirectives || !this.doc) this.errors.push(error);else this.doc.errors.push(error);
          break;
        }
      case 'doc-end':
        {
          if (!this.doc) {
            const msg = 'Unexpected doc-end without preceding document';
            this.errors.push(new YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg));
            break;
          }
          this.doc.directives.docEnd = true;
          const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
          this.decorate(this.doc, true);
          if (end.comment) {
            const dc = this.doc.comment;
            this.doc.comment = dc ? `${dc}\n${end.comment}` : end.comment;
          }
          this.doc.range[2] = end.offset;
          break;
        }
      default:
        this.errors.push(new YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', `Unsupported token ${token.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(forceDoc = false, endOffset = -1) {
    if (this.doc) {
      this.decorate(this.doc, true);
      yield this.doc;
      this.doc = null;
    } else if (forceDoc) {
      const opts = Object.assign({
        _directives: this.directives
      }, this.options);
      const doc = new Document(undefined, opts);
      if (this.atDirectives) this.onError(endOffset, 'MISSING_CHAR', 'Missing directives-end indicator line');
      doc.range = [0, endOffset, endOffset];
      this.decorate(doc, false);
      yield doc;
    }
  }
}

function resolveAsScalar(token, strict = true, onError) {
  if (token) {
    const _onError = (pos, code, message) => {
      const offset = typeof pos === 'number' ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
      if (onError) onError(offset, code, message);else throw new YAMLParseError([offset, offset + 1], code, message);
    };
    switch (token.type) {
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return resolveFlowScalar(token, strict, _onError);
      case 'block-scalar':
        return resolveBlockScalar({
          options: {
            strict
          }
        }, token, _onError);
    }
  }
  return null;
}
/**
 * Create a new scalar token with `value`
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.end Comments and whitespace after the end of the value, or after the block scalar header. If undefined, a newline will be added.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.indent The indent level of the token.
 * @param context.inFlow Is this scalar within a flow collection? This may affect the resolved type of the token's value.
 * @param context.offset The offset position of the token.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function createScalarToken(value, context) {
  const {
    implicitKey = false,
    indent,
    inFlow = false,
    offset = -1,
    type = 'PLAIN'
  } = context;
  const source = stringifyString({
    type,
    value
  }, {
    implicitKey,
    indent: indent > 0 ? ' '.repeat(indent) : '',
    inFlow,
    options: {
      blockQuote: true,
      lineWidth: -1
    }
  });
  const end = context.end ?? [{
    type: 'newline',
    offset: -1,
    indent,
    source: '\n'
  }];
  switch (source[0]) {
    case '|':
    case '>':
      {
        const he = source.indexOf('\n');
        const head = source.substring(0, he);
        const body = source.substring(he + 1) + '\n';
        const props = [{
          type: 'block-scalar-header',
          offset,
          indent,
          source: head
        }];
        if (!addEndtoBlockProps(props, end)) props.push({
          type: 'newline',
          offset: -1,
          indent,
          source: '\n'
        });
        return {
          type: 'block-scalar',
          offset,
          indent,
          props,
          source: body
        };
      }
    case '"':
      return {
        type: 'double-quoted-scalar',
        offset,
        indent,
        source,
        end
      };
    case "'":
      return {
        type: 'single-quoted-scalar',
        offset,
        indent,
        source,
        end
      };
    default:
      return {
        type: 'scalar',
        offset,
        indent,
        source,
        end
      };
  }
}
/**
 * Set the value of `token` to the given string `value`, overwriting any previous contents and type that it may have.
 *
 * Best efforts are made to retain any comments previously associated with the `token`,
 * though all contents within a collection's `items` will be overwritten.
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param token Any token. If it does not include an `indent` value, the value will be stringified as if it were an implicit key.
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.afterKey In most cases, values after a key should have an additional level of indentation.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.inFlow Being within a flow collection may affect the resolved type of the token's value.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function setScalarValue(token, value, context = {}) {
  let {
    afterKey = false,
    implicitKey = false,
    inFlow = false,
    type
  } = context;
  let indent = 'indent' in token ? token.indent : null;
  if (afterKey && typeof indent === 'number') indent += 2;
  if (!type) switch (token.type) {
    case 'single-quoted-scalar':
      type = 'QUOTE_SINGLE';
      break;
    case 'double-quoted-scalar':
      type = 'QUOTE_DOUBLE';
      break;
    case 'block-scalar':
      {
        const header = token.props[0];
        if (header.type !== 'block-scalar-header') throw new Error('Invalid block scalar header');
        type = header.source[0] === '>' ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL';
        break;
      }
    default:
      type = 'PLAIN';
  }
  const source = stringifyString({
    type,
    value
  }, {
    implicitKey: implicitKey || indent === null,
    indent: indent !== null && indent > 0 ? ' '.repeat(indent) : '',
    inFlow,
    options: {
      blockQuote: true,
      lineWidth: -1
    }
  });
  switch (source[0]) {
    case '|':
    case '>':
      setBlockScalarValue(token, source);
      break;
    case '"':
      setFlowScalarValue(token, source, 'double-quoted-scalar');
      break;
    case "'":
      setFlowScalarValue(token, source, 'single-quoted-scalar');
      break;
    default:
      setFlowScalarValue(token, source, 'scalar');
  }
}
function setBlockScalarValue(token, source) {
  const he = source.indexOf('\n');
  const head = source.substring(0, he);
  const body = source.substring(he + 1) + '\n';
  if (token.type === 'block-scalar') {
    const header = token.props[0];
    if (header.type !== 'block-scalar-header') throw new Error('Invalid block scalar header');
    header.source = head;
    token.source = body;
  } else {
    const {
      offset
    } = token;
    const indent = 'indent' in token ? token.indent : -1;
    const props = [{
      type: 'block-scalar-header',
      offset,
      indent,
      source: head
    }];
    if (!addEndtoBlockProps(props, 'end' in token ? token.end : undefined)) props.push({
      type: 'newline',
      offset: -1,
      indent,
      source: '\n'
    });
    for (const key of Object.keys(token)) if (key !== 'type' && key !== 'offset') delete token[key];
    Object.assign(token, {
      type: 'block-scalar',
      indent,
      props,
      source: body
    });
  }
}
/** @returns `true` if last token is a newline */
function addEndtoBlockProps(props, end) {
  if (end) for (const st of end) switch (st.type) {
    case 'space':
    case 'comment':
      props.push(st);
      break;
    case 'newline':
      props.push(st);
      return true;
  }
  return false;
}
function setFlowScalarValue(token, source, type) {
  switch (token.type) {
    case 'scalar':
    case 'double-quoted-scalar':
    case 'single-quoted-scalar':
      token.type = type;
      token.source = source;
      break;
    case 'block-scalar':
      {
        const end = token.props.slice(1);
        let oa = source.length;
        if (token.props[0].type === 'block-scalar-header') oa -= token.props[0].source.length;
        for (const tok of end) tok.offset += oa;
        delete token.props;
        Object.assign(token, {
          type,
          source,
          end
        });
        break;
      }
    case 'block-map':
    case 'block-seq':
      {
        const offset = token.offset + source.length;
        const nl = {
          type: 'newline',
          offset,
          indent: token.indent,
          source: '\n'
        };
        delete token.items;
        Object.assign(token, {
          type,
          source,
          end: [nl]
        });
        break;
      }
    default:
      {
        const indent = 'indent' in token ? token.indent : -1;
        const end = 'end' in token && Array.isArray(token.end) ? token.end.filter(st => st.type === 'space' || st.type === 'comment' || st.type === 'newline') : [];
        for (const key of Object.keys(token)) if (key !== 'type' && key !== 'offset') delete token[key];
        Object.assign(token, {
          type,
          indent,
          source,
          end
        });
      }
  }
}

/**
 * Stringify a CST document, token, or collection item
 *
 * Fair warning: This applies no validation whatsoever, and
 * simply concatenates the sources in their logical order.
 */
const stringify$1 = cst => 'type' in cst ? stringifyToken(cst) : stringifyItem(cst);
function stringifyToken(token) {
  switch (token.type) {
    case 'block-scalar':
      {
        let res = '';
        for (const tok of token.props) res += stringifyToken(tok);
        return res + token.source;
      }
    case 'block-map':
    case 'block-seq':
      {
        let res = '';
        for (const item of token.items) res += stringifyItem(item);
        return res;
      }
    case 'flow-collection':
      {
        let res = token.start.source;
        for (const item of token.items) res += stringifyItem(item);
        for (const st of token.end) res += st.source;
        return res;
      }
    case 'document':
      {
        let res = stringifyItem(token);
        if (token.end) for (const st of token.end) res += st.source;
        return res;
      }
    default:
      {
        let res = token.source;
        if ('end' in token && token.end) for (const st of token.end) res += st.source;
        return res;
      }
  }
}
function stringifyItem({
  start,
  key,
  sep,
  value
}) {
  let res = '';
  for (const st of start) res += st.source;
  if (key) res += stringifyToken(key);
  if (sep) for (const st of sep) res += st.source;
  if (value) res += stringifyToken(value);
  return res;
}

const BREAK = Symbol('break visit');
const SKIP = Symbol('skip children');
const REMOVE = Symbol('remove item');
/**
 * Apply a visitor to a CST document or item.
 *
 * Walks through the tree (depth-first) starting from the root, calling a
 * `visitor` function with two arguments when entering each item:
 *   - `item`: The current item, which included the following members:
 *     - `start: SourceToken[]` – Source tokens before the key or value,
 *       possibly including its anchor or tag.
 *     - `key?: Token | null` – Set for pair values. May then be `null`, if
 *       the key before the `:` separator is empty.
 *     - `sep?: SourceToken[]` – Source tokens between the key and the value,
 *       which should include the `:` map value indicator if `value` is set.
 *     - `value?: Token` – The value of a sequence item, or of a map pair.
 *   - `path`: The steps from the root to the current node, as an array of
 *     `['key' | 'value', number]` tuples.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this token, continue with
 *      next sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current item, then continue with the next one
 *   - `number`: Set the index of the next step. This is useful especially if
 *     the index of the current token has changed.
 *   - `function`: Define the next visitor for this item. After the original
 *     visitor is called on item entry, next visitors are called after handling
 *     a non-empty `key` and when exiting the item.
 */
function visit(cst, visitor) {
  if ('type' in cst && cst.type === 'document') cst = {
    start: cst.start,
    value: cst.value
  };
  _visit(Object.freeze([]), cst, visitor);
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit.BREAK = BREAK;
/** Do not visit the children of the current item */
visit.SKIP = SKIP;
/** Remove the current item */
visit.REMOVE = REMOVE;
/** Find the item at `path` from `cst` as the root */
visit.itemAtPath = (cst, path) => {
  let item = cst;
  for (const [field, index] of path) {
    var _item;
    const tok = (_item = item) === null || _item === void 0 ? void 0 : _item[field];
    if (tok && 'items' in tok) {
      item = tok.items[index];
    } else return undefined;
  }
  return item;
};
/**
 * Get the immediate parent collection of the item at `path` from `cst` as the root.
 *
 * Throws an error if the collection is not found, which should never happen if the item itself exists.
 */
visit.parentCollection = (cst, path) => {
  const parent = visit.itemAtPath(cst, path.slice(0, -1));
  const field = path[path.length - 1][0];
  const coll = parent === null || parent === void 0 ? void 0 : parent[field];
  if (coll && 'items' in coll) return coll;
  throw new Error('Parent collection not found');
};
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path);
  if (typeof ctrl === 'symbol') return ctrl;
  for (const field of ['key', 'value']) {
    const token = item[field];
    if (token && 'items' in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
        if (typeof ci === 'number') i = ci - 1;else if (ci === BREAK) return BREAK;else if (ci === REMOVE) {
          token.items.splice(i, 1);
          i -= 1;
        }
      }
      if (typeof ctrl === 'function' && field === 'key') ctrl = ctrl(item, path);
    }
  }
  return typeof ctrl === 'function' ? ctrl(item, path) : ctrl;
}

/** The byte order mark */
const BOM = '\u{FEFF}';
/** Start of doc-mode */
const DOCUMENT = '\x02'; // C0: Start of Text
/** Unexpected end of flow-mode */
const FLOW_END = '\x18'; // C0: Cancel
/** Next token is a scalar value */
const SCALAR = '\x1f'; // C0: Unit Separator
/** @returns `true` if `token` is a flow or block collection */
const isCollection = token => !!token && 'items' in token;
/** @returns `true` if `token` is a flow or block scalar; not an alias */
const isScalar = token => !!token && (token.type === 'scalar' || token.type === 'single-quoted-scalar' || token.type === 'double-quoted-scalar' || token.type === 'block-scalar');
/* istanbul ignore next */
/** Get a printable representation of a lexer token */
function prettyToken(token) {
  switch (token) {
    case BOM:
      return '<BOM>';
    case DOCUMENT:
      return '<DOC>';
    case FLOW_END:
      return '<FLOW_END>';
    case SCALAR:
      return '<SCALAR>';
    default:
      return JSON.stringify(token);
  }
}
/** Identify the type of a lexer token. May return `null` for unknown tokens. */
function tokenType(source) {
  switch (source) {
    case BOM:
      return 'byte-order-mark';
    case DOCUMENT:
      return 'doc-mode';
    case FLOW_END:
      return 'flow-error-end';
    case SCALAR:
      return 'scalar';
    case '---':
      return 'doc-start';
    case '...':
      return 'doc-end';
    case '':
    case '\n':
    case '\r\n':
      return 'newline';
    case '-':
      return 'seq-item-ind';
    case '?':
      return 'explicit-key-ind';
    case ':':
      return 'map-value-ind';
    case '{':
      return 'flow-map-start';
    case '}':
      return 'flow-map-end';
    case '[':
      return 'flow-seq-start';
    case ']':
      return 'flow-seq-end';
    case ',':
      return 'comma';
  }
  switch (source[0]) {
    case ' ':
    case '\t':
      return 'space';
    case '#':
      return 'comment';
    case '%':
      return 'directive-line';
    case '*':
      return 'alias';
    case '&':
      return 'anchor';
    case '!':
      return 'tag';
    case "'":
      return 'single-quoted-scalar';
    case '"':
      return 'double-quoted-scalar';
    case '|':
    case '>':
      return 'block-scalar-header';
  }
  return null;
}

var cst = /*#__PURE__*/Object.freeze({
	__proto__: null,
	BOM: BOM,
	DOCUMENT: DOCUMENT,
	FLOW_END: FLOW_END,
	SCALAR: SCALAR,
	createScalarToken: createScalarToken,
	isCollection: isCollection,
	isScalar: isScalar,
	prettyToken: prettyToken,
	resolveAsScalar: resolveAsScalar,
	setScalarValue: setScalarValue,
	stringify: stringify$1,
	tokenType: tokenType,
	visit: visit
});

/*
START -> stream

stream
  directive -> line-end -> stream
  indent + line-end -> stream
  [else] -> line-start

line-end
  comment -> line-end
  newline -> .
  input-end -> END

line-start
  doc-start -> doc
  doc-end -> stream
  [else] -> indent -> block-start

block-start
  seq-item-start -> block-start
  explicit-key-start -> block-start
  map-value-start -> block-start
  [else] -> doc

doc
  line-end -> line-start
  spaces -> doc
  anchor -> doc
  tag -> doc
  flow-start -> flow -> doc
  flow-end -> error -> doc
  seq-item-start -> error -> doc
  explicit-key-start -> error -> doc
  map-value-start -> doc
  alias -> doc
  quote-start -> quoted-scalar -> doc
  block-scalar-header -> line-end -> block-scalar(min) -> line-start
  [else] -> plain-scalar(false, min) -> doc

flow
  line-end -> flow
  spaces -> flow
  anchor -> flow
  tag -> flow
  flow-start -> flow -> flow
  flow-end -> .
  seq-item-start -> error -> flow
  explicit-key-start -> flow
  map-value-start -> flow
  alias -> flow
  quote-start -> quoted-scalar -> flow
  comma -> flow
  [else] -> plain-scalar(true, 0) -> flow

quoted-scalar
  quote-end -> .
  [else] -> quoted-scalar

block-scalar(min)
  newline + peek(indent < min) -> .
  [else] -> block-scalar(min)

plain-scalar(is-flow, min)
  scalar-end(is-flow) -> .
  peek(newline + (indent < min)) -> .
  [else] -> plain-scalar(min)
*/
function isEmpty(ch) {
  switch (ch) {
    case undefined:
    case ' ':
    case '\n':
    case '\r':
    case '\t':
      return true;
    default:
      return false;
  }
}
const hexDigits = new Set('0123456789ABCDEFabcdef');
const tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
const flowIndicatorChars = new Set(',[]{}');
const invalidAnchorChars = new Set(' ,[]{}\n\r\t');
const isNotAnchorChar = ch => !ch || invalidAnchorChars.has(ch);
/**
 * Splits an input string into lexical tokens, i.e. smaller strings that are
 * easily identifiable by `tokens.tokenType()`.
 *
 * Lexing starts always in a "stream" context. Incomplete input may be buffered
 * until a complete token can be emitted.
 *
 * In addition to slices of the original input, the following control characters
 * may also be emitted:
 *
 * - `\x02` (Start of Text): A document starts with the next token
 * - `\x18` (Cancel): Unexpected end of flow-mode (indicates an error)
 * - `\x1f` (Unit Separator): Next token is a scalar value
 * - `\u{FEFF}` (Byte order mark): Emitted separately outside documents
 */
class Lexer {
  constructor() {
    /**
     * Flag indicating whether the end of the current buffer marks the end of
     * all input
     */
    this.atEnd = false;
    /**
     * Explicit indent set in block scalar header, as an offset from the current
     * minimum indent, so e.g. set to 1 from a header `|2+`. Set to -1 if not
     * explicitly set.
     */
    this.blockScalarIndent = -1;
    /**
     * Block scalars that include a + (keep) chomping indicator in their header
     * include trailing empty lines, which are otherwise excluded from the
     * scalar's contents.
     */
    this.blockScalarKeep = false;
    /** Current input */
    this.buffer = '';
    /**
     * Flag noting whether the map value indicator : can immediately follow this
     * node within a flow context.
     */
    this.flowKey = false;
    /** Count of surrounding flow collection levels. */
    this.flowLevel = 0;
    /**
     * Minimum level of indentation required for next lines to be parsed as a
     * part of the current scalar value.
     */
    this.indentNext = 0;
    /** Indentation level of the current line. */
    this.indentValue = 0;
    /** Position of the next \n character. */
    this.lineEndPos = null;
    /** Stores the state of the lexer if reaching the end of incpomplete input */
    this.next = null;
    /** A pointer to `buffer`; the current position of the lexer. */
    this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(source, incomplete = false) {
    if (source) {
      if (typeof source !== 'string') throw TypeError('source is not a string');
      this.buffer = this.buffer ? this.buffer + source : source;
      this.lineEndPos = null;
    }
    this.atEnd = !incomplete;
    let next = this.next ?? 'stream';
    while (next && (incomplete || this.hasChars(1))) next = yield* this.parseNext(next);
  }
  atLineEnd() {
    let i = this.pos;
    let ch = this.buffer[i];
    while (ch === ' ' || ch === '\t') ch = this.buffer[++i];
    if (!ch || ch === '#' || ch === '\n') return true;
    if (ch === '\r') return this.buffer[i + 1] === '\n';
    return false;
  }
  charAt(n) {
    return this.buffer[this.pos + n];
  }
  continueScalar(offset) {
    let ch = this.buffer[offset];
    if (this.indentNext > 0) {
      let indent = 0;
      while (ch === ' ') ch = this.buffer[++indent + offset];
      if (ch === '\r') {
        const next = this.buffer[indent + offset + 1];
        if (next === '\n' || !next && !this.atEnd) return offset + indent + 1;
      }
      return ch === '\n' || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
    }
    if (ch === '-' || ch === '.') {
      const dt = this.buffer.substr(offset, 3);
      if ((dt === '---' || dt === '...') && isEmpty(this.buffer[offset + 3])) return -1;
    }
    return offset;
  }
  getLine() {
    let end = this.lineEndPos;
    if (typeof end !== 'number' || end !== -1 && end < this.pos) {
      end = this.buffer.indexOf('\n', this.pos);
      this.lineEndPos = end;
    }
    if (end === -1) return this.atEnd ? this.buffer.substring(this.pos) : null;
    if (this.buffer[end - 1] === '\r') end -= 1;
    return this.buffer.substring(this.pos, end);
  }
  hasChars(n) {
    return this.pos + n <= this.buffer.length;
  }
  setNext(state) {
    this.buffer = this.buffer.substring(this.pos);
    this.pos = 0;
    this.lineEndPos = null;
    this.next = state;
    return null;
  }
  peek(n) {
    return this.buffer.substr(this.pos, n);
  }
  *parseNext(next) {
    switch (next) {
      case 'stream':
        return yield* this.parseStream();
      case 'line-start':
        return yield* this.parseLineStart();
      case 'block-start':
        return yield* this.parseBlockStart();
      case 'doc':
        return yield* this.parseDocument();
      case 'flow':
        return yield* this.parseFlowCollection();
      case 'quoted-scalar':
        return yield* this.parseQuotedScalar();
      case 'block-scalar':
        return yield* this.parseBlockScalar();
      case 'plain-scalar':
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let line = this.getLine();
    if (line === null) return this.setNext('stream');
    if (line[0] === BOM) {
      yield* this.pushCount(1);
      line = line.substring(1);
    }
    if (line[0] === '%') {
      let dirEnd = line.length;
      let cs = line.indexOf('#');
      while (cs !== -1) {
        const ch = line[cs - 1];
        if (ch === ' ' || ch === '\t') {
          dirEnd = cs - 1;
          break;
        } else {
          cs = line.indexOf('#', cs + 1);
        }
      }
      while (true) {
        const ch = line[dirEnd - 1];
        if (ch === ' ' || ch === '\t') dirEnd -= 1;else break;
      }
      const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
      yield* this.pushCount(line.length - n); // possible comment
      this.pushNewline();
      return 'stream';
    }
    if (this.atLineEnd()) {
      const sp = yield* this.pushSpaces(true);
      yield* this.pushCount(line.length - sp);
      yield* this.pushNewline();
      return 'stream';
    }
    yield DOCUMENT;
    return yield* this.parseLineStart();
  }
  *parseLineStart() {
    const ch = this.charAt(0);
    if (!ch && !this.atEnd) return this.setNext('line-start');
    if (ch === '-' || ch === '.') {
      if (!this.atEnd && !this.hasChars(4)) return this.setNext('line-start');
      const s = this.peek(3);
      if ((s === '---' || s === '...') && isEmpty(this.charAt(3))) {
        yield* this.pushCount(3);
        this.indentValue = 0;
        this.indentNext = 0;
        return s === '---' ? 'doc' : 'stream';
      }
    }
    this.indentValue = yield* this.pushSpaces(false);
    if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1))) this.indentNext = this.indentValue;
    return yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [ch0, ch1] = this.peek(2);
    if (!ch1 && !this.atEnd) return this.setNext('block-start');
    if ((ch0 === '-' || ch0 === '?' || ch0 === ':') && isEmpty(ch1)) {
      const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
      this.indentNext = this.indentValue + 1;
      this.indentValue += n;
      return yield* this.parseBlockStart();
    }
    return 'doc';
  }
  *parseDocument() {
    yield* this.pushSpaces(true);
    const line = this.getLine();
    if (line === null) return this.setNext('doc');
    let n = yield* this.pushIndicators();
    switch (line[n]) {
      case '#':
        yield* this.pushCount(line.length - n);
      // fallthrough
      case undefined:
        yield* this.pushNewline();
        return yield* this.parseLineStart();
      case '{':
      case '[':
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel = 1;
        return 'flow';
      case '}':
      case ']':
        // this is an error
        yield* this.pushCount(1);
        return 'doc';
      case '*':
        yield* this.pushUntil(isNotAnchorChar);
        return 'doc';
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case '|':
      case '>':
        n += yield* this.parseBlockScalarHeader();
        n += yield* this.pushSpaces(true);
        yield* this.pushCount(line.length - n);
        yield* this.pushNewline();
        return yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let nl, sp;
    let indent = -1;
    do {
      nl = yield* this.pushNewline();
      if (nl > 0) {
        sp = yield* this.pushSpaces(false);
        this.indentValue = indent = sp;
      } else {
        sp = 0;
      }
      sp += yield* this.pushSpaces(true);
    } while (nl + sp > 0);
    const line = this.getLine();
    if (line === null) return this.setNext('flow');
    if (indent !== -1 && indent < this.indentNext && line[0] !== '#' || indent === 0 && (line.startsWith('---') || line.startsWith('...')) && isEmpty(line[3])) {
      // Allowing for the terminal ] or } at the same (rather than greater)
      // indent level as the initial [ or { is technically invalid, but
      // failing here would be surprising to users.
      const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === ']' || line[0] === '}');
      if (!atFlowEndMarker) {
        // this is an error
        this.flowLevel = 0;
        yield FLOW_END;
        return yield* this.parseLineStart();
      }
    }
    let n = 0;
    while (line[n] === ',') {
      n += yield* this.pushCount(1);
      n += yield* this.pushSpaces(true);
      this.flowKey = false;
    }
    n += yield* this.pushIndicators();
    switch (line[n]) {
      case undefined:
        return 'flow';
      case '#':
        yield* this.pushCount(line.length - n);
        return 'flow';
      case '{':
      case '[':
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel += 1;
        return 'flow';
      case '}':
      case ']':
        yield* this.pushCount(1);
        this.flowKey = true;
        this.flowLevel -= 1;
        return this.flowLevel ? 'flow' : 'doc';
      case '*':
        yield* this.pushUntil(isNotAnchorChar);
        return 'flow';
      case '"':
      case "'":
        this.flowKey = true;
        return yield* this.parseQuotedScalar();
      case ':':
        {
          const next = this.charAt(1);
          if (this.flowKey || isEmpty(next) || next === ',') {
            this.flowKey = false;
            yield* this.pushCount(1);
            yield* this.pushSpaces(true);
            return 'flow';
          }
        }
      // fallthrough
      default:
        this.flowKey = false;
        return yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const quote = this.charAt(0);
    let end = this.buffer.indexOf(quote, this.pos + 1);
    if (quote === "'") {
      while (end !== -1 && this.buffer[end + 1] === "'") end = this.buffer.indexOf("'", end + 2);
    } else {
      // double-quote
      while (end !== -1) {
        let n = 0;
        while (this.buffer[end - 1 - n] === '\\') n += 1;
        if (n % 2 === 0) break;
        end = this.buffer.indexOf('"', end + 1);
      }
    }
    // Only looking for newlines within the quotes
    const qb = this.buffer.substring(0, end);
    let nl = qb.indexOf('\n', this.pos);
    if (nl !== -1) {
      while (nl !== -1) {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1) break;
        nl = qb.indexOf('\n', cs);
      }
      if (nl !== -1) {
        // this is an error caused by an unexpected unindent
        end = nl - (qb[nl - 1] === '\r' ? 2 : 1);
      }
    }
    if (end === -1) {
      if (!this.atEnd) return this.setNext('quoted-scalar');
      end = this.buffer.length;
    }
    yield* this.pushToIndex(end + 1, false);
    return this.flowLevel ? 'flow' : 'doc';
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    let i = this.pos;
    while (true) {
      const ch = this.buffer[++i];
      if (ch === '+') this.blockScalarKeep = true;else if (ch > '0' && ch <= '9') this.blockScalarIndent = Number(ch) - 1;else if (ch !== '-') break;
    }
    return yield* this.pushUntil(ch => isEmpty(ch) || ch === '#');
  }
  *parseBlockScalar() {
    let nl = this.pos - 1; // may be -1 if this.pos === 0
    let indent = 0;
    let ch;
    loop: for (let i = this.pos; ch = this.buffer[i]; ++i) {
      switch (ch) {
        case ' ':
          indent += 1;
          break;
        case '\n':
          nl = i;
          indent = 0;
          break;
        case '\r':
          {
            const next = this.buffer[i + 1];
            if (!next && !this.atEnd) return this.setNext('block-scalar');
            if (next === '\n') break;
          }
        // fallthrough
        default:
          break loop;
      }
    }
    if (!ch && !this.atEnd) return this.setNext('block-scalar');
    if (indent >= this.indentNext) {
      if (this.blockScalarIndent === -1) this.indentNext = indent;else {
        this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      }
      do {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1) break;
        nl = this.buffer.indexOf('\n', cs);
      } while (nl !== -1);
      if (nl === -1) {
        if (!this.atEnd) return this.setNext('block-scalar');
        nl = this.buffer.length;
      }
    }
    // Trailing insufficiently indented tabs are invalid.
    // To catch that during parsing, we include them in the block scalar value.
    let i = nl + 1;
    ch = this.buffer[i];
    while (ch === ' ') ch = this.buffer[++i];
    if (ch === '\t') {
      while (ch === '\t' || ch === ' ' || ch === '\r' || ch === '\n') ch = this.buffer[++i];
      nl = i - 1;
    } else if (!this.blockScalarKeep) {
      do {
        let i = nl - 1;
        let ch = this.buffer[i];
        if (ch === '\r') ch = this.buffer[--i];
        const lastChar = i; // Drop the line if last char not more indented
        while (ch === ' ') ch = this.buffer[--i];
        if (ch === '\n' && i >= this.pos && i + 1 + indent > lastChar) nl = i;else break;
      } while (true);
    }
    yield SCALAR;
    yield* this.pushToIndex(nl + 1, true);
    return yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const inFlow = this.flowLevel > 0;
    let end = this.pos - 1;
    let i = this.pos - 1;
    let ch;
    while (ch = this.buffer[++i]) {
      if (ch === ':') {
        const next = this.buffer[i + 1];
        if (isEmpty(next) || inFlow && flowIndicatorChars.has(next)) break;
        end = i;
      } else if (isEmpty(ch)) {
        let next = this.buffer[i + 1];
        if (ch === '\r') {
          if (next === '\n') {
            i += 1;
            ch = '\n';
            next = this.buffer[i + 1];
          } else end = i;
        }
        if (next === '#' || inFlow && flowIndicatorChars.has(next)) break;
        if (ch === '\n') {
          const cs = this.continueScalar(i + 1);
          if (cs === -1) break;
          i = Math.max(i, cs - 2); // to advance, but still account for ' #'
        }
      } else {
        if (inFlow && flowIndicatorChars.has(ch)) break;
        end = i;
      }
    }
    if (!ch && !this.atEnd) return this.setNext('plain-scalar');
    yield SCALAR;
    yield* this.pushToIndex(end + 1, true);
    return inFlow ? 'flow' : 'doc';
  }
  *pushCount(n) {
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos += n;
      return n;
    }
    return 0;
  }
  *pushToIndex(i, allowEmpty) {
    const s = this.buffer.slice(this.pos, i);
    if (s) {
      yield s;
      this.pos += s.length;
      return s.length;
    } else if (allowEmpty) yield '';
    return 0;
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case '!':
        return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
      case '&':
        return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
      case '-': // this is an error
      case '?': // this is an error outside flow collections
      case ':':
        {
          const inFlow = this.flowLevel > 0;
          const ch1 = this.charAt(1);
          if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
            if (!inFlow) this.indentNext = this.indentValue + 1;else if (this.flowKey) this.flowKey = false;
            return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          }
        }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === '<') {
      let i = this.pos + 2;
      let ch = this.buffer[i];
      while (!isEmpty(ch) && ch !== '>') ch = this.buffer[++i];
      return yield* this.pushToIndex(ch === '>' ? i + 1 : i, false);
    } else {
      let i = this.pos + 1;
      let ch = this.buffer[i];
      while (ch) {
        if (tagChars.has(ch)) ch = this.buffer[++i];else if (ch === '%' && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
          ch = this.buffer[i += 3];
        } else break;
      }
      return yield* this.pushToIndex(i, false);
    }
  }
  *pushNewline() {
    const ch = this.buffer[this.pos];
    if (ch === '\n') return yield* this.pushCount(1);else if (ch === '\r' && this.charAt(1) === '\n') return yield* this.pushCount(2);else return 0;
  }
  *pushSpaces(allowTabs) {
    let i = this.pos - 1;
    let ch;
    do {
      ch = this.buffer[++i];
    } while (ch === ' ' || allowTabs && ch === '\t');
    const n = i - this.pos;
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos = i;
    }
    return n;
  }
  *pushUntil(test) {
    let i = this.pos;
    let ch = this.buffer[i];
    while (!test(ch)) ch = this.buffer[++i];
    return yield* this.pushToIndex(i, false);
  }
}

/**
 * Tracks newlines during parsing in order to provide an efficient API for
 * determining the one-indexed `{ line, col }` position for any offset
 * within the input.
 */
class LineCounter {
  constructor() {
    this.lineStarts = [];
    /**
     * Should be called in ascending order. Otherwise, call
     * `lineCounter.lineStarts.sort()` before calling `linePos()`.
     */
    this.addNewLine = offset => this.lineStarts.push(offset);
    /**
     * Performs a binary search and returns the 1-indexed { line, col }
     * position of `offset`. If `line === 0`, `addNewLine` has never been
     * called or `offset` is before the first known newline.
     */
    this.linePos = offset => {
      let low = 0;
      let high = this.lineStarts.length;
      while (low < high) {
        const mid = low + high >> 1; // Math.floor((low + high) / 2)
        if (this.lineStarts[mid] < offset) low = mid + 1;else high = mid;
      }
      if (this.lineStarts[low] === offset) return {
        line: low + 1,
        col: 1
      };
      if (low === 0) return {
        line: 0,
        col: offset
      };
      const start = this.lineStarts[low - 1];
      return {
        line: low,
        col: offset - start + 1
      };
    };
  }
}

function includesToken(list, type) {
  for (let i = 0; i < list.length; ++i) if (list[i].type === type) return true;
  return false;
}
function findNonEmptyIndex(list) {
  for (let i = 0; i < list.length; ++i) {
    switch (list[i].type) {
      case 'space':
      case 'comment':
      case 'newline':
        break;
      default:
        return i;
    }
  }
  return -1;
}
function isFlowToken(token) {
  switch (token === null || token === void 0 ? void 0 : token.type) {
    case 'alias':
    case 'scalar':
    case 'single-quoted-scalar':
    case 'double-quoted-scalar':
    case 'flow-collection':
      return true;
    default:
      return false;
  }
}
function getPrevProps(parent) {
  switch (parent.type) {
    case 'document':
      return parent.start;
    case 'block-map':
      {
        const it = parent.items[parent.items.length - 1];
        return it.sep ?? it.start;
      }
    case 'block-seq':
      return parent.items[parent.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
/** Note: May modify input array */
function getFirstKeyStartProps(prev) {
  if (prev.length === 0) return [];
  let i = prev.length;
  loop: while (--i >= 0) {
    switch (prev[i].type) {
      case 'doc-start':
      case 'explicit-key-ind':
      case 'map-value-ind':
      case 'seq-item-ind':
      case 'newline':
        break loop;
    }
  }
  while (((_prev$i = prev[++i]) === null || _prev$i === void 0 ? void 0 : _prev$i.type) === 'space') {
    var _prev$i;
  } /* loop */
  return prev.splice(i, prev.length);
}
function fixFlowSeqItems(fc) {
  if (fc.start.type === 'flow-seq-start') {
    for (const it of fc.items) {
      if (it.sep && !it.value && !includesToken(it.start, 'explicit-key-ind') && !includesToken(it.sep, 'map-value-ind')) {
        if (it.key) it.value = it.key;
        delete it.key;
        if (isFlowToken(it.value)) {
          if (it.value.end) Array.prototype.push.apply(it.value.end, it.sep);else it.value.end = it.sep;
        } else Array.prototype.push.apply(it.start, it.sep);
        delete it.sep;
      }
    }
  }
}
/**
 * A YAML concrete syntax tree (CST) parser
 *
 * ```ts
 * const src: string = ...
 * for (const token of new Parser().parse(src)) {
 *   // token: Token
 * }
 * ```
 *
 * To use the parser with a user-provided lexer:
 *
 * ```ts
 * function* parse(source: string, lexer: Lexer) {
 *   const parser = new Parser()
 *   for (const lexeme of lexer.lex(source))
 *     yield* parser.next(lexeme)
 *   yield* parser.end()
 * }
 *
 * const src: string = ...
 * const lexer = new Lexer()
 * for (const token of parse(src, lexer)) {
 *   // token: Token
 * }
 * ```
 */
class Parser {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(onNewLine) {
    /** If true, space and sequence indicators count as indentation */
    this.atNewLine = true;
    /** If true, next token is a scalar value */
    this.atScalar = false;
    /** Current indentation level */
    this.indent = 0;
    /** Current offset since the start of parsing */
    this.offset = 0;
    /** On the same line with a block map key */
    this.onKeyLine = false;
    /** Top indicates the node that's currently being built */
    this.stack = [];
    /** The source of the current token, set in parse() */
    this.source = '';
    /** The type of the current token, set in parse() */
    this.type = '';
    // Must be defined after `next()`
    this.lexer = new Lexer();
    this.onNewLine = onNewLine;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(source, incomplete = false) {
    if (this.onNewLine && this.offset === 0) this.onNewLine(0);
    for (const lexeme of this.lexer.lex(source, incomplete)) yield* this.next(lexeme);
    if (!incomplete) yield* this.end();
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(source) {
    this.source = source;
    if (this.atScalar) {
      this.atScalar = false;
      yield* this.step();
      this.offset += source.length;
      return;
    }
    const type = tokenType(source);
    if (!type) {
      const message = `Not a YAML token: ${source}`;
      yield* this.pop({
        type: 'error',
        offset: this.offset,
        message,
        source
      });
      this.offset += source.length;
    } else if (type === 'scalar') {
      this.atNewLine = false;
      this.atScalar = true;
      this.type = 'scalar';
    } else {
      this.type = type;
      yield* this.step();
      switch (type) {
        case 'newline':
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine) this.onNewLine(this.offset + source.length);
          break;
        case 'space':
          if (this.atNewLine && source[0] === ' ') this.indent += source.length;
          break;
        case 'explicit-key-ind':
        case 'map-value-ind':
        case 'seq-item-ind':
          if (this.atNewLine) this.indent += source.length;
          break;
        case 'doc-mode':
        case 'flow-error-end':
          return;
        default:
          this.atNewLine = false;
      }
      this.offset += source.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    while (this.stack.length > 0) yield* this.pop();
  }
  get sourceToken() {
    const st = {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
    return st;
  }
  *step() {
    const top = this.peek(1);
    if (this.type === 'doc-end' && (!top || top.type !== 'doc-end')) {
      while (this.stack.length > 0) yield* this.pop();
      this.stack.push({
        type: 'doc-end',
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!top) return yield* this.stream();
    switch (top.type) {
      case 'document':
        return yield* this.document(top);
      case 'alias':
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return yield* this.scalar(top);
      case 'block-scalar':
        return yield* this.blockScalar(top);
      case 'block-map':
        return yield* this.blockMap(top);
      case 'block-seq':
        return yield* this.blockSequence(top);
      case 'flow-collection':
        return yield* this.flowCollection(top);
      case 'doc-end':
        return yield* this.documentEnd(top);
    }
    /* istanbul ignore next should not happen */
    yield* this.pop();
  }
  peek(n) {
    return this.stack[this.stack.length - n];
  }
  *pop(error) {
    const token = error ?? this.stack.pop();
    /* istanbul ignore if should not happen */
    if (!token) {
      const message = 'Tried to pop an empty stack';
      yield {
        type: 'error',
        offset: this.offset,
        source: '',
        message
      };
    } else if (this.stack.length === 0) {
      yield token;
    } else {
      const top = this.peek(1);
      if (token.type === 'block-scalar') {
        // Block scalars use their parent rather than header indent
        token.indent = 'indent' in top ? top.indent : 0;
      } else if (token.type === 'flow-collection' && top.type === 'document') {
        // Ignore all indent for top-level flow collections
        token.indent = 0;
      }
      if (token.type === 'flow-collection') fixFlowSeqItems(token);
      switch (top.type) {
        case 'document':
          top.value = token;
          break;
        case 'block-scalar':
          top.props.push(token); // error
          break;
        case 'block-map':
          {
            const it = top.items[top.items.length - 1];
            if (it.value) {
              top.items.push({
                start: [],
                key: token,
                sep: []
              });
              this.onKeyLine = true;
              return;
            } else if (it.sep) {
              it.value = token;
            } else {
              Object.assign(it, {
                key: token,
                sep: []
              });
              this.onKeyLine = !it.explicitKey;
              return;
            }
            break;
          }
        case 'block-seq':
          {
            const it = top.items[top.items.length - 1];
            if (it.value) top.items.push({
              start: [],
              value: token
            });else it.value = token;
            break;
          }
        case 'flow-collection':
          {
            const it = top.items[top.items.length - 1];
            if (!it || it.value) top.items.push({
              start: [],
              key: token,
              sep: []
            });else if (it.sep) it.value = token;else Object.assign(it, {
              key: token,
              sep: []
            });
            return;
          }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop();
          yield* this.pop(token);
      }
      if ((top.type === 'document' || top.type === 'block-map' || top.type === 'block-seq') && (token.type === 'block-map' || token.type === 'block-seq')) {
        const last = token.items[token.items.length - 1];
        if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every(st => st.type !== 'comment' || st.indent < token.indent))) {
          if (top.type === 'document') top.end = last.start;else top.items.push({
            start: last.start
          });
          token.items.splice(-1, 1);
        }
      }
    }
  }
  *stream() {
    switch (this.type) {
      case 'directive-line':
        yield {
          type: 'directive',
          offset: this.offset,
          source: this.source
        };
        return;
      case 'byte-order-mark':
      case 'space':
      case 'comment':
      case 'newline':
        yield this.sourceToken;
        return;
      case 'doc-mode':
      case 'doc-start':
        {
          const doc = {
            type: 'document',
            offset: this.offset,
            start: []
          };
          if (this.type === 'doc-start') doc.start.push(this.sourceToken);
          this.stack.push(doc);
          return;
        }
    }
    yield {
      type: 'error',
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(doc) {
    if (doc.value) return yield* this.lineEnd(doc);
    switch (this.type) {
      case 'doc-start':
        {
          if (findNonEmptyIndex(doc.start) !== -1) {
            yield* this.pop();
            yield* this.step();
          } else doc.start.push(this.sourceToken);
          return;
        }
      case 'anchor':
      case 'tag':
      case 'space':
      case 'comment':
      case 'newline':
        doc.start.push(this.sourceToken);
        return;
    }
    const bv = this.startBlockValue(doc);
    if (bv) this.stack.push(bv);else {
      yield {
        type: 'error',
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML document`,
        source: this.source
      };
    }
  }
  *scalar(scalar) {
    if (this.type === 'map-value-ind') {
      const prev = getPrevProps(this.peek(2));
      const start = getFirstKeyStartProps(prev);
      let sep;
      if (scalar.end) {
        sep = scalar.end;
        sep.push(this.sourceToken);
        delete scalar.end;
      } else sep = [this.sourceToken];
      const map = {
        type: 'block-map',
        offset: scalar.offset,
        indent: scalar.indent,
        items: [{
          start,
          key: scalar,
          sep
        }]
      };
      this.onKeyLine = true;
      this.stack[this.stack.length - 1] = map;
    } else yield* this.lineEnd(scalar);
  }
  *blockScalar(scalar) {
    switch (this.type) {
      case 'space':
      case 'comment':
      case 'newline':
        scalar.props.push(this.sourceToken);
        return;
      case 'scalar':
        scalar.source = this.source;
        // block-scalar source includes trailing newline
        this.atNewLine = true;
        this.indent = 0;
        if (this.onNewLine) {
          let nl = this.source.indexOf('\n') + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf('\n', nl) + 1;
          }
        }
        yield* this.pop();
        break;
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop();
        yield* this.step();
    }
  }
  *blockMap(map) {
    const it = map.items[map.items.length - 1];
    // it.sep is true-ish if pair already has key or : separator
    switch (this.type) {
      case 'newline':
        this.onKeyLine = false;
        if (it.value) {
          const end = 'end' in it.value ? it.value.end : undefined;
          const last = Array.isArray(end) ? end[end.length - 1] : undefined;
          if ((last === null || last === void 0 ? void 0 : last.type) === 'comment') end === null || end === void 0 || end.push(this.sourceToken);else map.items.push({
            start: [this.sourceToken]
          });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          it.start.push(this.sourceToken);
        }
        return;
      case 'space':
      case 'comment':
        if (it.value) {
          map.items.push({
            start: [this.sourceToken]
          });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          if (this.atIndentedComment(it.start, map.indent)) {
            var _prev$value;
            const prev = map.items[map.items.length - 2];
            const end = prev === null || prev === void 0 || (_prev$value = prev.value) === null || _prev$value === void 0 ? void 0 : _prev$value.end;
            if (Array.isArray(end)) {
              Array.prototype.push.apply(end, it.start);
              end.push(this.sourceToken);
              map.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= map.indent) {
      const atMapIndent = !this.onKeyLine && this.indent === map.indent;
      const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== 'seq-item-ind';
      // For empty nodes, assign newline-separated not indented empty tokens to following node
      let start = [];
      if (atNextItem && it.sep && !it.value) {
        const nl = [];
        for (let i = 0; i < it.sep.length; ++i) {
          const st = it.sep[i];
          switch (st.type) {
            case 'newline':
              nl.push(i);
              break;
            case 'space':
              break;
            case 'comment':
              if (st.indent > map.indent) nl.length = 0;
              break;
            default:
              nl.length = 0;
          }
        }
        if (nl.length >= 2) start = it.sep.splice(nl[1]);
      }
      switch (this.type) {
        case 'anchor':
        case 'tag':
          if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map.items.push({
              start
            });
            this.onKeyLine = true;
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            it.start.push(this.sourceToken);
          }
          return;
        case 'explicit-key-ind':
          if (!it.sep && !it.explicitKey) {
            it.start.push(this.sourceToken);
            it.explicitKey = true;
          } else if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map.items.push({
              start,
              explicitKey: true
            });
          } else {
            this.stack.push({
              type: 'block-map',
              offset: this.offset,
              indent: this.indent,
              items: [{
                start: [this.sourceToken],
                explicitKey: true
              }]
            });
          }
          this.onKeyLine = true;
          return;
        case 'map-value-ind':
          if (it.explicitKey) {
            if (!it.sep) {
              if (includesToken(it.start, 'newline')) {
                Object.assign(it, {
                  key: null,
                  sep: [this.sourceToken]
                });
              } else {
                const start = getFirstKeyStartProps(it.start);
                this.stack.push({
                  type: 'block-map',
                  offset: this.offset,
                  indent: this.indent,
                  items: [{
                    start,
                    key: null,
                    sep: [this.sourceToken]
                  }]
                });
              }
            } else if (it.value) {
              map.items.push({
                start: [],
                key: null,
                sep: [this.sourceToken]
              });
            } else if (includesToken(it.sep, 'map-value-ind')) {
              this.stack.push({
                type: 'block-map',
                offset: this.offset,
                indent: this.indent,
                items: [{
                  start,
                  key: null,
                  sep: [this.sourceToken]
                }]
              });
            } else if (isFlowToken(it.key) && !includesToken(it.sep, 'newline')) {
              const start = getFirstKeyStartProps(it.start);
              const key = it.key;
              const sep = it.sep;
              sep.push(this.sourceToken);
              // @ts-expect-error type guard is wrong here
              delete it.key;
              // @ts-expect-error type guard is wrong here
              delete it.sep;
              this.stack.push({
                type: 'block-map',
                offset: this.offset,
                indent: this.indent,
                items: [{
                  start,
                  key,
                  sep
                }]
              });
            } else if (start.length > 0) {
              // Not actually at next item
              it.sep = it.sep.concat(start, this.sourceToken);
            } else {
              it.sep.push(this.sourceToken);
            }
          } else {
            if (!it.sep) {
              Object.assign(it, {
                key: null,
                sep: [this.sourceToken]
              });
            } else if (it.value || atNextItem) {
              map.items.push({
                start,
                key: null,
                sep: [this.sourceToken]
              });
            } else if (includesToken(it.sep, 'map-value-ind')) {
              this.stack.push({
                type: 'block-map',
                offset: this.offset,
                indent: this.indent,
                items: [{
                  start: [],
                  key: null,
                  sep: [this.sourceToken]
                }]
              });
            } else {
              it.sep.push(this.sourceToken);
            }
          }
          this.onKeyLine = true;
          return;
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
          {
            const fs = this.flowScalar(this.type);
            if (atNextItem || it.value) {
              map.items.push({
                start,
                key: fs,
                sep: []
              });
              this.onKeyLine = true;
            } else if (it.sep) {
              this.stack.push(fs);
            } else {
              Object.assign(it, {
                key: fs,
                sep: []
              });
              this.onKeyLine = true;
            }
            return;
          }
        default:
          {
            const bv = this.startBlockValue(map);
            if (bv) {
              if (atMapIndent && bv.type !== 'block-seq') {
                map.items.push({
                  start
                });
              }
              this.stack.push(bv);
              return;
            }
          }
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *blockSequence(seq) {
    const it = seq.items[seq.items.length - 1];
    switch (this.type) {
      case 'newline':
        if (it.value) {
          const end = 'end' in it.value ? it.value.end : undefined;
          const last = Array.isArray(end) ? end[end.length - 1] : undefined;
          if ((last === null || last === void 0 ? void 0 : last.type) === 'comment') end === null || end === void 0 || end.push(this.sourceToken);else seq.items.push({
            start: [this.sourceToken]
          });
        } else it.start.push(this.sourceToken);
        return;
      case 'space':
      case 'comment':
        if (it.value) seq.items.push({
          start: [this.sourceToken]
        });else {
          if (this.atIndentedComment(it.start, seq.indent)) {
            var _prev$value2;
            const prev = seq.items[seq.items.length - 2];
            const end = prev === null || prev === void 0 || (_prev$value2 = prev.value) === null || _prev$value2 === void 0 ? void 0 : _prev$value2.end;
            if (Array.isArray(end)) {
              Array.prototype.push.apply(end, it.start);
              end.push(this.sourceToken);
              seq.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
      case 'anchor':
      case 'tag':
        if (it.value || this.indent <= seq.indent) break;
        it.start.push(this.sourceToken);
        return;
      case 'seq-item-ind':
        if (this.indent !== seq.indent) break;
        if (it.value || includesToken(it.start, 'seq-item-ind')) seq.items.push({
          start: [this.sourceToken]
        });else it.start.push(this.sourceToken);
        return;
    }
    if (this.indent > seq.indent) {
      const bv = this.startBlockValue(seq);
      if (bv) {
        this.stack.push(bv);
        return;
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *flowCollection(fc) {
    const it = fc.items[fc.items.length - 1];
    if (this.type === 'flow-error-end') {
      let top;
      do {
        yield* this.pop();
        top = this.peek(1);
      } while (top && top.type === 'flow-collection');
    } else if (fc.end.length === 0) {
      switch (this.type) {
        case 'comma':
        case 'explicit-key-ind':
          if (!it || it.sep) fc.items.push({
            start: [this.sourceToken]
          });else it.start.push(this.sourceToken);
          return;
        case 'map-value-ind':
          if (!it || it.value) fc.items.push({
            start: [],
            key: null,
            sep: [this.sourceToken]
          });else if (it.sep) it.sep.push(this.sourceToken);else Object.assign(it, {
            key: null,
            sep: [this.sourceToken]
          });
          return;
        case 'space':
        case 'comment':
        case 'newline':
        case 'anchor':
        case 'tag':
          if (!it || it.value) fc.items.push({
            start: [this.sourceToken]
          });else if (it.sep) it.sep.push(this.sourceToken);else it.start.push(this.sourceToken);
          return;
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
          {
            const fs = this.flowScalar(this.type);
            if (!it || it.value) fc.items.push({
              start: [],
              key: fs,
              sep: []
            });else if (it.sep) this.stack.push(fs);else Object.assign(it, {
              key: fs,
              sep: []
            });
            return;
          }
        case 'flow-map-end':
        case 'flow-seq-end':
          fc.end.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(fc);
      /* istanbul ignore else should not happen */
      if (bv) this.stack.push(bv);else {
        yield* this.pop();
        yield* this.step();
      }
    } else {
      const parent = this.peek(2);
      if (parent.type === 'block-map' && (this.type === 'map-value-ind' && parent.indent === fc.indent || this.type === 'newline' && !parent.items[parent.items.length - 1].sep)) {
        yield* this.pop();
        yield* this.step();
      } else if (this.type === 'map-value-ind' && parent.type !== 'flow-collection') {
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        fixFlowSeqItems(fc);
        const sep = fc.end.splice(1, fc.end.length);
        sep.push(this.sourceToken);
        const map = {
          type: 'block-map',
          offset: fc.offset,
          indent: fc.indent,
          items: [{
            start,
            key: fc,
            sep
          }]
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map;
      } else {
        yield* this.lineEnd(fc);
      }
    }
  }
  flowScalar(type) {
    if (this.onNewLine) {
      let nl = this.source.indexOf('\n') + 1;
      while (nl !== 0) {
        this.onNewLine(this.offset + nl);
        nl = this.source.indexOf('\n', nl) + 1;
      }
    }
    return {
      type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(parent) {
    switch (this.type) {
      case 'alias':
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return this.flowScalar(this.type);
      case 'block-scalar-header':
        return {
          type: 'block-scalar',
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ''
        };
      case 'flow-map-start':
      case 'flow-seq-start':
        return {
          type: 'flow-collection',
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case 'seq-item-ind':
        return {
          type: 'block-seq',
          offset: this.offset,
          indent: this.indent,
          items: [{
            start: [this.sourceToken]
          }]
        };
      case 'explicit-key-ind':
        {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          start.push(this.sourceToken);
          return {
            type: 'block-map',
            offset: this.offset,
            indent: this.indent,
            items: [{
              start,
              explicitKey: true
            }]
          };
        }
      case 'map-value-ind':
        {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          return {
            type: 'block-map',
            offset: this.offset,
            indent: this.indent,
            items: [{
              start,
              key: null,
              sep: [this.sourceToken]
            }]
          };
        }
    }
    return null;
  }
  atIndentedComment(start, indent) {
    if (this.type !== 'comment') return false;
    if (this.indent <= indent) return false;
    return start.every(st => st.type === 'newline' || st.type === 'space');
  }
  *documentEnd(docEnd) {
    if (this.type !== 'doc-mode') {
      if (docEnd.end) docEnd.end.push(this.sourceToken);else docEnd.end = [this.sourceToken];
      if (this.type === 'newline') yield* this.pop();
    }
  }
  *lineEnd(token) {
    switch (this.type) {
      case 'comma':
      case 'doc-start':
      case 'doc-end':
      case 'flow-seq-end':
      case 'flow-map-end':
      case 'map-value-ind':
        yield* this.pop();
        yield* this.step();
        break;
      case 'newline':
        this.onKeyLine = false;
      // fallthrough
      case 'space':
      case 'comment':
      default:
        // all other values are errors
        if (token.end) token.end.push(this.sourceToken);else token.end = [this.sourceToken];
        if (this.type === 'newline') yield* this.pop();
    }
  }
}

function parseOptions(options) {
  const prettyErrors = options.prettyErrors !== false;
  const lineCounter = options.lineCounter || prettyErrors && new LineCounter() || null;
  return {
    lineCounter,
    prettyErrors
  };
}
/**
 * Parse the input as a stream of YAML documents.
 *
 * Documents should be separated from each other by `...` or `---` marker lines.
 *
 * @returns If an empty `docs` array is returned, it will be of type
 *   EmptyStream and contain additional stream information. In
 *   TypeScript, you should use `'empty' in docs` as a type guard for it.
 */
function parseAllDocuments(source, options = {}) {
  const {
    lineCounter,
    prettyErrors
  } = parseOptions(options);
  const parser = new Parser(lineCounter === null || lineCounter === void 0 ? void 0 : lineCounter.addNewLine);
  const composer = new Composer(options);
  const docs = Array.from(composer.compose(parser.parse(source)));
  if (prettyErrors && lineCounter) for (const doc of docs) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  if (docs.length > 0) return docs;
  return Object.assign([], {
    empty: true
  }, composer.streamInfo());
}
/** Parse an input string into a single YAML.Document */
function parseDocument(source, options = {}) {
  const {
    lineCounter,
    prettyErrors
  } = parseOptions(options);
  const parser = new Parser(lineCounter === null || lineCounter === void 0 ? void 0 : lineCounter.addNewLine);
  const composer = new Composer(options);
  // `doc` is always set by compose.end(true) at the very latest
  let doc = null;
  for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
    if (!doc) doc = _doc;else if (doc.options.logLevel !== 'silent') {
      doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), 'MULTIPLE_DOCS', 'Source contains multiple documents; please use YAML.parseAllDocuments()'));
      break;
    }
  }
  if (prettyErrors && lineCounter) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  return doc;
}
function parse(src, reviver, options) {
  let _reviver = undefined;
  if (typeof reviver === 'function') {
    _reviver = reviver;
  } else if (options === undefined && reviver && typeof reviver === 'object') {
    options = reviver;
  }
  const doc = parseDocument(src, options);
  if (!doc) return null;
  doc.warnings.forEach(warning => warn(doc.options.logLevel, warning));
  if (doc.errors.length > 0) {
    if (doc.options.logLevel !== 'silent') throw doc.errors[0];else doc.errors = [];
  }
  return doc.toJS(Object.assign({
    reviver: _reviver
  }, options));
}
function stringify(value, replacer, options) {
  let _replacer = null;
  if (typeof replacer === 'function' || Array.isArray(replacer)) {
    _replacer = replacer;
  } else if (options === undefined && replacer) {
    options = replacer;
  }
  if (typeof options === 'string') options = options.length;
  if (typeof options === 'number') {
    const indent = Math.round(options);
    options = indent < 1 ? undefined : indent > 8 ? {
      indent: 8
    } : {
      indent
    };
  }
  if (value === undefined) {
    const {
      keepUndefined
    } = options ?? replacer ?? {};
    if (!keepUndefined) return undefined;
  }
  if (isDocument(value) && !_replacer) return value.toString(options);
  return new Document(value, _replacer, options).toString(options);
}

var YAML = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Alias: Alias,
	CST: cst,
	Composer: Composer,
	Document: Document,
	Lexer: Lexer,
	LineCounter: LineCounter,
	Pair: Pair,
	Parser: Parser,
	Scalar: Scalar,
	Schema: Schema,
	YAMLError: YAMLError,
	YAMLMap: YAMLMap,
	YAMLParseError: YAMLParseError,
	YAMLSeq: YAMLSeq,
	YAMLWarning: YAMLWarning,
	isAlias: isAlias,
	isCollection: isCollection$1,
	isDocument: isDocument,
	isMap: isMap,
	isNode: isNode,
	isPair: isPair,
	isScalar: isScalar$1,
	isSeq: isSeq,
	parse: parse,
	parseAllDocuments: parseAllDocuments,
	parseDocument: parseDocument,
	stringify: stringify,
	visit: visit$1,
	visitAsync: visitAsync
});

var fs$1 = {};

var universalify = {};

var hasRequiredUniversalify;
function requireUniversalify() {
  if (hasRequiredUniversalify) return universalify;
  hasRequiredUniversalify = 1;
  universalify.fromCallback = function (fn) {
    return Object.defineProperty(function (...args) {
      if (typeof args[args.length - 1] === 'function') fn.apply(this, args);else {
        return new Promise((resolve, reject) => {
          args.push((err, res) => err != null ? reject(err) : resolve(res));
          fn.apply(this, args);
        });
      }
    }, 'name', {
      value: fn.name
    });
  };
  universalify.fromPromise = function (fn) {
    return Object.defineProperty(function (...args) {
      const cb = args[args.length - 1];
      if (typeof cb !== 'function') return fn.apply(this, args);else {
        args.pop();
        fn.apply(this, args).then(r => cb(null, r), cb);
      }
    }, 'name', {
      value: fn.name
    });
  };
  return universalify;
}

var polyfills;
var hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var constants = require$$0$2;
  var origCwd = process.cwd;
  var cwd = null;
  var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function () {
    if (!cwd) cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {}

  // This check is needed until node.js 12 is required
  if (typeof process.chdir === 'function') {
    var chdir = process.chdir;
    process.chdir = function (d) {
      cwd = null;
      chdir.call(process, d);
    };
    if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
  }
  polyfills = patch;
  function patch(fs) {
    // (re-)implement some things that are known busted or missing.

    // lchmod, broken prior to 0.6.2
    // back-port the fix here.
    if (constants.hasOwnProperty('O_SYMLINK') && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs);
    }

    // lutimes implementation, or no-op
    if (!fs.lutimes) {
      patchLutimes(fs);
    }

    // https://github.com/isaacs/node-graceful-fs/issues/4
    // Chown should not fail on einval or eperm if non-root.
    // It should not fail on enosys ever, as this just indicates
    // that a fs doesn't support the intended operation.

    fs.chown = chownFix(fs.chown);
    fs.fchown = chownFix(fs.fchown);
    fs.lchown = chownFix(fs.lchown);
    fs.chmod = chmodFix(fs.chmod);
    fs.fchmod = chmodFix(fs.fchmod);
    fs.lchmod = chmodFix(fs.lchmod);
    fs.chownSync = chownFixSync(fs.chownSync);
    fs.fchownSync = chownFixSync(fs.fchownSync);
    fs.lchownSync = chownFixSync(fs.lchownSync);
    fs.chmodSync = chmodFixSync(fs.chmodSync);
    fs.fchmodSync = chmodFixSync(fs.fchmodSync);
    fs.lchmodSync = chmodFixSync(fs.lchmodSync);
    fs.stat = statFix(fs.stat);
    fs.fstat = statFix(fs.fstat);
    fs.lstat = statFix(fs.lstat);
    fs.statSync = statFixSync(fs.statSync);
    fs.fstatSync = statFixSync(fs.fstatSync);
    fs.lstatSync = statFixSync(fs.lstatSync);

    // if lchmod/lchown do not exist, then make them no-ops
    if (fs.chmod && !fs.lchmod) {
      fs.lchmod = function (path, mode, cb) {
        if (cb) process.nextTick(cb);
      };
      fs.lchmodSync = function () {};
    }
    if (fs.chown && !fs.lchown) {
      fs.lchown = function (path, uid, gid, cb) {
        if (cb) process.nextTick(cb);
      };
      fs.lchownSync = function () {};
    }

    // on Windows, A/V software can lock the directory, causing this
    // to fail with an EACCES or EPERM if the directory contains newly
    // created files.  Try again on failure, for up to 60 seconds.

    // Set the timeout this long because some Windows Anti-Virus, such as Parity
    // bit9, may lock files for up to a minute, causing npm package install
    // failures. Also, take care to yield the scheduler. Windows scheduling gives
    // CPU to a busy looping process, which can cause the program causing the lock
    // contention to be starved of CPU by node, so the contention doesn't resolve.
    if (platform === "win32") {
      fs.rename = typeof fs.rename !== 'function' ? fs.rename : function (fs$rename) {
        function rename(from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 60000) {
              setTimeout(function () {
                fs.stat(to, function (stater, st) {
                  if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);else cb(er);
                });
              }, backoff);
              if (backoff < 100) backoff += 10;
              return;
            }
            if (cb) cb(er);
          });
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
        return rename;
      }(fs.rename);
    }

    // if read() returns EAGAIN, then just try it again.
    fs.read = typeof fs.read !== 'function' ? fs.read : function (fs$read) {
      function read(fd, buffer, offset, length, position, callback_) {
        var callback;
        if (callback_ && typeof callback_ === 'function') {
          var eagCounter = 0;
          callback = function (er, _, __) {
            if (er && er.code === 'EAGAIN' && eagCounter < 10) {
              eagCounter++;
              return fs$read.call(fs, fd, buffer, offset, length, position, callback);
            }
            callback_.apply(this, arguments);
          };
        }
        return fs$read.call(fs, fd, buffer, offset, length, position, callback);
      }

      // This ensures `util.promisify` works as it does for native `fs.read`.
      if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
      return read;
    }(fs.read);
    fs.readSync = typeof fs.readSync !== 'function' ? fs.readSync : function (fs$readSync) {
      return function (fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position);
          } catch (er) {
            if (er.code === 'EAGAIN' && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs.readSync);
    function patchLchmod(fs) {
      fs.lchmod = function (path, mode, callback) {
        fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function (err, fd) {
          if (err) {
            if (callback) callback(err);
            return;
          }
          // prefer to return the chmod error, if one occurs,
          // but still try to close, and report closing errors if they occur.
          fs.fchmod(fd, mode, function (err) {
            fs.close(fd, function (err2) {
              if (callback) callback(err || err2);
            });
          });
        });
      };
      fs.lchmodSync = function (path, mode) {
        var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);

        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        var threw = true;
        var ret;
        try {
          ret = fs.fchmodSync(fd, mode);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd);
            } catch (er) {}
          } else {
            fs.closeSync(fd);
          }
        }
        return ret;
      };
    }
    function patchLutimes(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
        fs.lutimes = function (path, at, mt, cb) {
          fs.open(path, constants.O_SYMLINK, function (er, fd) {
            if (er) {
              if (cb) cb(er);
              return;
            }
            fs.futimes(fd, at, mt, function (er) {
              fs.close(fd, function (er2) {
                if (cb) cb(er || er2);
              });
            });
          });
        };
        fs.lutimesSync = function (path, at, mt) {
          var fd = fs.openSync(path, constants.O_SYMLINK);
          var ret;
          var threw = true;
          try {
            ret = fs.futimesSync(fd, at, mt);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs.closeSync(fd);
              } catch (er) {}
            } else {
              fs.closeSync(fd);
            }
          }
          return ret;
        };
      } else if (fs.futimes) {
        fs.lutimes = function (_a, _b, _c, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lutimesSync = function () {};
      }
    }
    function chmodFix(orig) {
      if (!orig) return orig;
      return function (target, mode, cb) {
        return orig.call(fs, target, mode, function (er) {
          if (chownErOk(er)) er = null;
          if (cb) cb.apply(this, arguments);
        });
      };
    }
    function chmodFixSync(orig) {
      if (!orig) return orig;
      return function (target, mode) {
        try {
          return orig.call(fs, target, mode);
        } catch (er) {
          if (!chownErOk(er)) throw er;
        }
      };
    }
    function chownFix(orig) {
      if (!orig) return orig;
      return function (target, uid, gid, cb) {
        return orig.call(fs, target, uid, gid, function (er) {
          if (chownErOk(er)) er = null;
          if (cb) cb.apply(this, arguments);
        });
      };
    }
    function chownFixSync(orig) {
      if (!orig) return orig;
      return function (target, uid, gid) {
        try {
          return orig.call(fs, target, uid, gid);
        } catch (er) {
          if (!chownErOk(er)) throw er;
        }
      };
    }
    function statFix(orig) {
      if (!orig) return orig;
      // Older versions of Node erroneously returned signed integers for
      // uid + gid.
      return function (target, options, cb) {
        if (typeof options === 'function') {
          cb = options;
          options = null;
        }
        function callback(er, stats) {
          if (stats) {
            if (stats.uid < 0) stats.uid += 0x100000000;
            if (stats.gid < 0) stats.gid += 0x100000000;
          }
          if (cb) cb.apply(this, arguments);
        }
        return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
      };
    }
    function statFixSync(orig) {
      if (!orig) return orig;
      // Older versions of Node erroneously returned signed integers for
      // uid + gid.
      return function (target, options) {
        var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000;
          if (stats.gid < 0) stats.gid += 0x100000000;
        }
        return stats;
      };
    }

    // ENOSYS means that the fs doesn't support the op. Just ignore
    // that, because it doesn't matter.
    //
    // if there's no getuid, or if getuid() is something other
    // than 0, and the error is EINVAL or EPERM, then just ignore
    // it.
    //
    // This specific case is a silent failure in cp, install, tar,
    // and most other unix tools that manage permissions.
    //
    // When running as root, or if other types of errors are
    // encountered, then it's strict.
    function chownErOk(er) {
      if (!er) return true;
      if (er.code === "ENOSYS") return true;
      var nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM") return true;
      }
      return false;
    }
  }
  return polyfills;
}

var legacyStreams;
var hasRequiredLegacyStreams;
function requireLegacyStreams() {
  if (hasRequiredLegacyStreams) return legacyStreams;
  hasRequiredLegacyStreams = 1;
  var Stream = require$$0$3.Stream;
  legacyStreams = legacy;
  function legacy(fs) {
    return {
      ReadStream: ReadStream,
      WriteStream: WriteStream
    };
    function ReadStream(path, options) {
      if (!(this instanceof ReadStream)) return new ReadStream(path, options);
      Stream.call(this);
      var self = this;
      this.path = path;
      this.fd = null;
      this.readable = true;
      this.paused = false;
      this.flags = 'r';
      this.mode = 438; /*=0666*/
      this.bufferSize = 64 * 1024;
      options = options || {};

      // Mixin options into this
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.encoding) this.setEncoding(this.encoding);
      if (this.start !== undefined) {
        if ('number' !== typeof this.start) {
          throw TypeError('start must be a Number');
        }
        if (this.end === undefined) {
          this.end = Infinity;
        } else if ('number' !== typeof this.end) {
          throw TypeError('end must be a Number');
        }
        if (this.start > this.end) {
          throw new Error('start must be <= end');
        }
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function () {
          self._read();
        });
        return;
      }
      fs.open(this.path, this.flags, this.mode, function (err, fd) {
        if (err) {
          self.emit('error', err);
          self.readable = false;
          return;
        }
        self.fd = fd;
        self.emit('open', fd);
        self._read();
      });
    }
    function WriteStream(path, options) {
      if (!(this instanceof WriteStream)) return new WriteStream(path, options);
      Stream.call(this);
      this.path = path;
      this.fd = null;
      this.writable = true;
      this.flags = 'w';
      this.encoding = 'binary';
      this.mode = 438; /*=0666*/
      this.bytesWritten = 0;
      options = options || {};

      // Mixin options into this
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.start !== undefined) {
        if ('number' !== typeof this.start) {
          throw TypeError('start must be a Number');
        }
        if (this.start < 0) {
          throw new Error('start must be >= zero');
        }
        this.pos = this.start;
      }
      this.busy = false;
      this._queue = [];
      if (this.fd === null) {
        this._open = fs.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
        this.flush();
      }
    }
  }
  return legacyStreams;
}

var clone_1;
var hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone_1;
  hasRequiredClone = 1;
  clone_1 = clone;
  var getPrototypeOf = Object.getPrototypeOf || function (obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Object) var copy = {
      __proto__: getPrototypeOf(obj)
    };else var copy = Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function (key) {
      Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy;
  }
  return clone_1;
}

var gracefulFs;
var hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var fs = fs$2;
  var polyfills = requirePolyfills();
  var legacy = requireLegacyStreams();
  var clone = requireClone();
  var util = require$$4;

  /* istanbul ignore next - node 0.x polyfill */
  var gracefulQueue;
  var previousSymbol;

  /* istanbul ignore else - node 0.x polyfill */
  if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
    gracefulQueue = Symbol.for('graceful-fs.queue');
    // This is used in testing by future versions
    previousSymbol = Symbol.for('graceful-fs.previous');
  } else {
    gracefulQueue = '___graceful-fs.queue';
    previousSymbol = '___graceful-fs.previous';
  }
  function noop() {}
  function publishQueue(context, queue) {
    Object.defineProperty(context, gracefulQueue, {
      get: function () {
        return queue;
      }
    });
  }
  var debug = noop;
  if (util.debuglog) debug = util.debuglog('gfs4');else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) debug = function () {
    var m = util.format.apply(util, arguments);
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
    console.error(m);
  };

  // Once time initialization
  if (!fs[gracefulQueue]) {
    // This queue can be shared by multiple loaded instances
    var queue = commonjsGlobal[gracefulQueue] || [];
    publishQueue(fs, queue);

    // Patch fs.close/closeSync to shared queue version, because we need
    // to retry() whenever a close happens *anywhere* in the program.
    // This is essential when multiple graceful-fs instances are
    // in play at the same time.
    fs.close = function (fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs, fd, function (err) {
          // This function uses the graceful-fs shared queue
          if (!err) {
            resetQueue();
          }
          if (typeof cb === 'function') cb.apply(this, arguments);
        });
      }
      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs.close);
    fs.closeSync = function (fs$closeSync) {
      function closeSync(fd) {
        // This function uses the graceful-fs shared queue
        fs$closeSync.apply(fs, arguments);
        resetQueue();
      }
      Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync;
    }(fs.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
      process.on('exit', function () {
        debug(fs[gracefulQueue]);
        require$$5.equal(fs[gracefulQueue].length, 0);
      });
    }
  }
  if (!commonjsGlobal[gracefulQueue]) {
    publishQueue(commonjsGlobal, fs[gracefulQueue]);
  }
  gracefulFs = patch(clone(fs));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    gracefulFs = patch(fs);
    fs.__patched = true;
  }
  function patch(fs) {
    // Everything that references the open() function needs to be in here
    polyfills(fs);
    fs.gracefulify = patch;
    fs.createReadStream = createReadStream;
    fs.createWriteStream = createWriteStream;
    var fs$readFile = fs.readFile;
    fs.readFile = readFile;
    function readFile(path, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$readFile(path, options, cb);
      function go$readFile(path, options, cb, startTime) {
        return fs$readFile(path, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }
    var fs$writeFile = fs.writeFile;
    fs.writeFile = writeFile;
    function writeFile(path, data, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$writeFile(path, data, options, cb);
      function go$writeFile(path, data, options, cb, startTime) {
        return fs$writeFile(path, data, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }
    var fs$appendFile = fs.appendFile;
    if (fs$appendFile) fs.appendFile = appendFile;
    function appendFile(path, data, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$appendFile(path, data, options, cb);
      function go$appendFile(path, data, options, cb, startTime) {
        return fs$appendFile(path, data, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }
    var fs$copyFile = fs.copyFile;
    if (fs$copyFile) fs.copyFile = copyFile;
    function copyFile(src, dest, flags, cb) {
      if (typeof flags === 'function') {
        cb = flags;
        flags = 0;
      }
      return go$copyFile(src, dest, flags, cb);
      function go$copyFile(src, dest, flags, cb, startTime) {
        return fs$copyFile(src, dest, flags, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }
    var fs$readdir = fs.readdir;
    fs.readdir = readdir;
    var noReaddirOptionVersions = /^v[0-5]\./;
    function readdir(path, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path, options, cb, startTime) {
        return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
      } : function go$readdir(path, options, cb, startTime) {
        return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
      };
      return go$readdir(path, options, cb);
      function fs$readdirCallback(path, options, cb, startTime) {
        return function (err, files) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readdir, [path, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (files && files.sort) files.sort();
            if (typeof cb === 'function') cb.call(this, err, files);
          }
        };
      }
    }
    if (process.version.substr(0, 4) === 'v0.8') {
      var legStreams = legacy(fs);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs.ReadStream;
    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs.WriteStream;
    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs, 'ReadStream', {
      get: function () {
        return ReadStream;
      },
      set: function (val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs, 'WriteStream', {
      get: function () {
        return WriteStream;
      },
      set: function (val) {
        WriteStream = val;
      },
      enumerable: true,
      configurable: true
    });

    // legacy names
    var FileReadStream = ReadStream;
    Object.defineProperty(fs, 'FileReadStream', {
      get: function () {
        return FileReadStream;
      },
      set: function (val) {
        FileReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs, 'FileWriteStream', {
      get: function () {
        return FileWriteStream;
      },
      set: function (val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    function ReadStream(path, options) {
      if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function (err, fd) {
        if (err) {
          if (that.autoClose) that.destroy();
          that.emit('error', err);
        } else {
          that.fd = fd;
          that.emit('open', fd);
          that.read();
        }
      });
    }
    function WriteStream(path, options) {
      if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }
    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function (err, fd) {
        if (err) {
          that.destroy();
          that.emit('error', err);
        } else {
          that.fd = fd;
          that.emit('open', fd);
        }
      });
    }
    function createReadStream(path, options) {
      return new fs.ReadStream(path, options);
    }
    function createWriteStream(path, options) {
      return new fs.WriteStream(path, options);
    }
    var fs$open = fs.open;
    fs.open = open;
    function open(path, flags, mode, cb) {
      if (typeof mode === 'function') cb = mode, mode = null;
      return go$open(path, flags, mode, cb);
      function go$open(path, flags, mode, cb, startTime) {
        return fs$open(path, flags, mode, function (err, fd) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }
    return fs;
  }
  function enqueue(elem) {
    debug('ENQUEUE', elem[0].name, elem[1]);
    fs[gracefulQueue].push(elem);
    retry();
  }

  // keep track of the timeout between retry() calls
  var retryTimer;

  // reset the startTime and lastTime to now
  // this resets the start of the 60 second overall timeout as well as the
  // delay between attempts so that we'll retry these jobs sooner
  function resetQueue() {
    var now = Date.now();
    for (var i = 0; i < fs[gracefulQueue].length; ++i) {
      // entries that are only a length of 2 are from an older version, don't
      // bother modifying those since they'll be retried anyway.
      if (fs[gracefulQueue][i].length > 2) {
        fs[gracefulQueue][i][3] = now; // startTime
        fs[gracefulQueue][i][4] = now; // lastTime
      }
    }
    // call retry to make sure we're actively processing the queue
    retry();
  }
  function retry() {
    // clear the timer and remove it to help prevent unintended concurrency
    clearTimeout(retryTimer);
    retryTimer = undefined;
    if (fs[gracefulQueue].length === 0) return;
    var elem = fs[gracefulQueue].shift();
    var fn = elem[0];
    var args = elem[1];
    // these items may be unset if they were added by an older graceful-fs
    var err = elem[2];
    var startTime = elem[3];
    var lastTime = elem[4];

    // if we don't have a startTime we have no way of knowing if we've waited
    // long enough, so go ahead and retry this item now
    if (startTime === undefined) {
      debug('RETRY', fn.name, args);
      fn.apply(null, args);
    } else if (Date.now() - startTime >= 60000) {
      // it's been more than 60 seconds total, bail now
      debug('TIMEOUT', fn.name, args);
      var cb = args.pop();
      if (typeof cb === 'function') cb.call(null, err);
    } else {
      // the amount of time between the last attempt and right now
      var sinceAttempt = Date.now() - lastTime;
      // the amount of time between when we first tried, and when we last tried
      // rounded up to at least 1
      var sinceStart = Math.max(lastTime - startTime, 1);
      // backoff. wait longer than the total time we've been retrying, but only
      // up to a maximum of 100ms
      var desiredDelay = Math.min(sinceStart * 1.2, 100);
      // it's been long enough since the last retry, do it again
      if (sinceAttempt >= desiredDelay) {
        debug('RETRY', fn.name, args);
        fn.apply(null, args.concat([startTime]));
      } else {
        // if we can't do this job yet, push it to the end of the queue
        // and let the next iteration check again
        fs[gracefulQueue].push(elem);
      }
    }

    // schedule our next run if one isn't already scheduled
    if (retryTimer === undefined) {
      retryTimer = setTimeout(retry, 0);
    }
  }
  return gracefulFs;
}

var hasRequiredFs;
function requireFs() {
  if (hasRequiredFs) return fs$1;
  hasRequiredFs = 1;
  (function (exports) {

    // This is adapted from https://github.com/normalize/mz
    // Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
    const u = requireUniversalify().fromCallback;
    const fs = requireGracefulFs();
    const api = ['access', 'appendFile', 'chmod', 'chown', 'close', 'copyFile', 'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod', 'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'opendir', 'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rm', 'rmdir', 'stat', 'symlink', 'truncate', 'unlink', 'utimes', 'writeFile'].filter(key => {
      // Some commands are not available on some systems. Ex:
      // fs.cp was added in Node.js v16.7.0
      // fs.lchown is not available on at least some Linux
      return typeof fs[key] === 'function';
    });

    // Export cloned fs:
    Object.assign(exports, fs);

    // Universalify async methods:
    api.forEach(method => {
      exports[method] = u(fs[method]);
    });

    // We differ from mz/fs in that we still ship the old, broken, fs.exists()
    // since we are a drop-in replacement for the native module
    exports.exists = function (filename, callback) {
      if (typeof callback === 'function') {
        return fs.exists(filename, callback);
      }
      return new Promise(resolve => {
        return fs.exists(filename, resolve);
      });
    };

    // fs.read(), fs.write(), fs.readv(), & fs.writev() need special treatment due to multiple callback args

    exports.read = function (fd, buffer, offset, length, position, callback) {
      if (typeof callback === 'function') {
        return fs.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
          if (err) return reject(err);
          resolve({
            bytesRead,
            buffer
          });
        });
      });
    };

    // Function signature can be
    // fs.write(fd, buffer[, offset[, length[, position]]], callback)
    // OR
    // fs.write(fd, string[, position[, encoding]], callback)
    // We need to handle both cases, so we use ...args
    exports.write = function (fd, buffer, ...args) {
      if (typeof args[args.length - 1] === 'function') {
        return fs.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
          if (err) return reject(err);
          resolve({
            bytesWritten,
            buffer
          });
        });
      });
    };

    // Function signature is
    // s.readv(fd, buffers[, position], callback)
    // We need to handle the optional arg, so we use ...args
    exports.readv = function (fd, buffers, ...args) {
      if (typeof args[args.length - 1] === 'function') {
        return fs.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs.readv(fd, buffers, ...args, (err, bytesRead, buffers) => {
          if (err) return reject(err);
          resolve({
            bytesRead,
            buffers
          });
        });
      });
    };

    // Function signature is
    // s.writev(fd, buffers[, position], callback)
    // We need to handle the optional arg, so we use ...args
    exports.writev = function (fd, buffers, ...args) {
      if (typeof args[args.length - 1] === 'function') {
        return fs.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
          if (err) return reject(err);
          resolve({
            bytesWritten,
            buffers
          });
        });
      });
    };

    // fs.realpath.native sometimes not available if fs is monkey-patched
    if (typeof fs.realpath.native === 'function') {
      exports.realpath.native = u(fs.realpath.native);
    } else {
      process.emitWarning('fs.realpath.native is not a function. Is fs being monkey-patched?', 'Warning', 'fs-extra-WARN0003');
    }
  })(fs$1);
  return fs$1;
}

var makeDir = {};

var utils$1 = {};

var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  const path$1 = path;

  // https://github.com/nodejs/node/issues/8987
  // https://github.com/libuv/libuv/pull/1088
  utils$1.checkPath = function checkPath(pth) {
    if (process.platform === 'win32') {
      const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$1.parse(pth).root, ''));
      if (pathHasInvalidWinCharacters) {
        const error = new Error(`Path contains invalid characters: ${pth}`);
        error.code = 'EINVAL';
        throw error;
      }
    }
  };
  return utils$1;
}

var hasRequiredMakeDir;
function requireMakeDir() {
  if (hasRequiredMakeDir) return makeDir;
  hasRequiredMakeDir = 1;
  const fs = /*@__PURE__*/requireFs();
  const {
    checkPath
  } = /*@__PURE__*/requireUtils$1();
  const getMode = options => {
    const defaults = {
      mode: 0o777
    };
    if (typeof options === 'number') return options;
    return {
      ...defaults,
      ...options
    }.mode;
  };
  makeDir.makeDir = async (dir, options) => {
    checkPath(dir);
    return fs.mkdir(dir, {
      mode: getMode(options),
      recursive: true
    });
  };
  makeDir.makeDirSync = (dir, options) => {
    checkPath(dir);
    return fs.mkdirSync(dir, {
      mode: getMode(options),
      recursive: true
    });
  };
  return makeDir;
}

var mkdirs;
var hasRequiredMkdirs;
function requireMkdirs() {
  if (hasRequiredMkdirs) return mkdirs;
  hasRequiredMkdirs = 1;
  const u = requireUniversalify().fromPromise;
  const {
    makeDir: _makeDir,
    makeDirSync
  } = /*@__PURE__*/requireMakeDir();
  const makeDir = u(_makeDir);
  mkdirs = {
    mkdirs: makeDir,
    mkdirsSync: makeDirSync,
    // alias
    mkdirp: makeDir,
    mkdirpSync: makeDirSync,
    ensureDir: makeDir,
    ensureDirSync: makeDirSync
  };
  return mkdirs;
}

var pathExists_1;
var hasRequiredPathExists;
function requirePathExists() {
  if (hasRequiredPathExists) return pathExists_1;
  hasRequiredPathExists = 1;
  const u = requireUniversalify().fromPromise;
  const fs = /*@__PURE__*/requireFs();
  function pathExists(path) {
    return fs.access(path).then(() => true).catch(() => false);
  }
  pathExists_1 = {
    pathExists: u(pathExists),
    pathExistsSync: fs.existsSync
  };
  return pathExists_1;
}

var utimes;
var hasRequiredUtimes;
function requireUtimes() {
  if (hasRequiredUtimes) return utimes;
  hasRequiredUtimes = 1;
  const fs = /*@__PURE__*/requireFs();
  const u = requireUniversalify().fromPromise;
  async function utimesMillis(path, atime, mtime) {
    // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
    const fd = await fs.open(path, 'r+');
    let closeErr = null;
    try {
      await fs.futimes(fd, atime, mtime);
    } finally {
      try {
        await fs.close(fd);
      } catch (e) {
        closeErr = e;
      }
    }
    if (closeErr) {
      throw closeErr;
    }
  }
  function utimesMillisSync(path, atime, mtime) {
    const fd = fs.openSync(path, 'r+');
    fs.futimesSync(fd, atime, mtime);
    return fs.closeSync(fd);
  }
  utimes = {
    utimesMillis: u(utimesMillis),
    utimesMillisSync
  };
  return utimes;
}

var stat;
var hasRequiredStat;
function requireStat() {
  if (hasRequiredStat) return stat;
  hasRequiredStat = 1;
  const fs = /*@__PURE__*/requireFs();
  const path$1 = path;
  const u = requireUniversalify().fromPromise;
  function getStats(src, dest, opts) {
    const statFunc = opts.dereference ? file => fs.stat(file, {
      bigint: true
    }) : file => fs.lstat(file, {
      bigint: true
    });
    return Promise.all([statFunc(src), statFunc(dest).catch(err => {
      if (err.code === 'ENOENT') return null;
      throw err;
    })]).then(([srcStat, destStat]) => ({
      srcStat,
      destStat
    }));
  }
  function getStatsSync(src, dest, opts) {
    let destStat;
    const statFunc = opts.dereference ? file => fs.statSync(file, {
      bigint: true
    }) : file => fs.lstatSync(file, {
      bigint: true
    });
    const srcStat = statFunc(src);
    try {
      destStat = statFunc(dest);
    } catch (err) {
      if (err.code === 'ENOENT') return {
        srcStat,
        destStat: null
      };
      throw err;
    }
    return {
      srcStat,
      destStat
    };
  }
  async function checkPaths(src, dest, funcName, opts) {
    const {
      srcStat,
      destStat
    } = await getStats(src, dest, opts);
    if (destStat) {
      if (areIdentical(srcStat, destStat)) {
        const srcBaseName = path$1.basename(src);
        const destBaseName = path$1.basename(dest);
        if (funcName === 'move' && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return {
            srcStat,
            destStat,
            isChangingCase: true
          };
        }
        throw new Error('Source and destination must not be the same.');
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
      }
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return {
      srcStat,
      destStat
    };
  }
  function checkPathsSync(src, dest, funcName, opts) {
    const {
      srcStat,
      destStat
    } = getStatsSync(src, dest, opts);
    if (destStat) {
      if (areIdentical(srcStat, destStat)) {
        const srcBaseName = path$1.basename(src);
        const destBaseName = path$1.basename(dest);
        if (funcName === 'move' && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return {
            srcStat,
            destStat,
            isChangingCase: true
          };
        }
        throw new Error('Source and destination must not be the same.');
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
      }
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return {
      srcStat,
      destStat
    };
  }

  // recursively check if dest parent is a subdirectory of src.
  // It works for all file types including symlinks since it
  // checks the src and dest inodes. It starts from the deepest
  // parent and stops once it reaches the src parent or the root path.
  async function checkParentPaths(src, srcStat, dest, funcName) {
    const srcParent = path$1.resolve(path$1.dirname(src));
    const destParent = path$1.resolve(path$1.dirname(dest));
    if (destParent === srcParent || destParent === path$1.parse(destParent).root) return;
    let destStat;
    try {
      destStat = await fs.stat(destParent, {
        bigint: true
      });
    } catch (err) {
      if (err.code === 'ENOENT') return;
      throw err;
    }
    if (areIdentical(srcStat, destStat)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return checkParentPaths(src, srcStat, destParent, funcName);
  }
  function checkParentPathsSync(src, srcStat, dest, funcName) {
    const srcParent = path$1.resolve(path$1.dirname(src));
    const destParent = path$1.resolve(path$1.dirname(dest));
    if (destParent === srcParent || destParent === path$1.parse(destParent).root) return;
    let destStat;
    try {
      destStat = fs.statSync(destParent, {
        bigint: true
      });
    } catch (err) {
      if (err.code === 'ENOENT') return;
      throw err;
    }
    if (areIdentical(srcStat, destStat)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return checkParentPathsSync(src, srcStat, destParent, funcName);
  }
  function areIdentical(srcStat, destStat) {
    return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
  }

  // return true if dest is a subdir of src, otherwise false.
  // It only checks the path strings.
  function isSrcSubdir(src, dest) {
    const srcArr = path$1.resolve(src).split(path$1.sep).filter(i => i);
    const destArr = path$1.resolve(dest).split(path$1.sep).filter(i => i);
    return srcArr.every((cur, i) => destArr[i] === cur);
  }
  function errMsg(src, dest, funcName) {
    return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
  }
  stat = {
    // checkPaths
    checkPaths: u(checkPaths),
    checkPathsSync,
    // checkParent
    checkParentPaths: u(checkParentPaths),
    checkParentPathsSync,
    // Misc
    isSrcSubdir,
    areIdentical
  };
  return stat;
}

var copy_1;
var hasRequiredCopy$1;
function requireCopy$1() {
  if (hasRequiredCopy$1) return copy_1;
  hasRequiredCopy$1 = 1;
  const fs = /*@__PURE__*/requireFs();
  const path$1 = path;
  const {
    mkdirs
  } = /*@__PURE__*/requireMkdirs();
  const {
    pathExists
  } = /*@__PURE__*/requirePathExists();
  const {
    utimesMillis
  } = /*@__PURE__*/requireUtimes();
  const stat = /*@__PURE__*/requireStat();
  async function copy(src, dest, opts = {}) {
    if (typeof opts === 'function') {
      opts = {
        filter: opts
      };
    }
    opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
    opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

    // Warn about using preserveTimestamps on 32-bit node
    if (opts.preserveTimestamps && process.arch === 'ia32') {
      process.emitWarning('Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' + '\tsee https://github.com/jprichardson/node-fs-extra/issues/269', 'Warning', 'fs-extra-WARN0001');
    }
    const {
      srcStat,
      destStat
    } = await stat.checkPaths(src, dest, 'copy', opts);
    await stat.checkParentPaths(src, srcStat, dest, 'copy');
    const include = await runFilter(src, dest, opts);
    if (!include) return;

    // check if the parent of dest exists, and create it if it doesn't exist
    const destParent = path$1.dirname(dest);
    const dirExists = await pathExists(destParent);
    if (!dirExists) {
      await mkdirs(destParent);
    }
    await getStatsAndPerformCopy(destStat, src, dest, opts);
  }
  async function runFilter(src, dest, opts) {
    if (!opts.filter) return true;
    return opts.filter(src, dest);
  }
  async function getStatsAndPerformCopy(destStat, src, dest, opts) {
    const statFn = opts.dereference ? fs.stat : fs.lstat;
    const srcStat = await statFn(src);
    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
    if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
    if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
    if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
    if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    throw new Error(`Unknown file: ${src}`);
  }
  async function onFile(srcStat, destStat, src, dest, opts) {
    if (!destStat) return copyFile(srcStat, src, dest, opts);
    if (opts.overwrite) {
      await fs.unlink(dest);
      return copyFile(srcStat, src, dest, opts);
    }
    if (opts.errorOnExist) {
      throw new Error(`'${dest}' already exists`);
    }
  }
  async function copyFile(srcStat, src, dest, opts) {
    await fs.copyFile(src, dest);
    if (opts.preserveTimestamps) {
      // Make sure the file is writable before setting the timestamp
      // otherwise open fails with EPERM when invoked with 'r+'
      // (through utimes call)
      if (fileIsNotWritable(srcStat.mode)) {
        await makeFileWritable(dest, srcStat.mode);
      }

      // Set timestamps and mode correspondingly

      // Note that The initial srcStat.atime cannot be trusted
      // because it is modified by the read(2) system call
      // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
      const updatedSrcStat = await fs.stat(src);
      await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    return fs.chmod(dest, srcStat.mode);
  }
  function fileIsNotWritable(srcMode) {
    return (srcMode & 0o200) === 0;
  }
  function makeFileWritable(dest, srcMode) {
    return fs.chmod(dest, srcMode | 0o200);
  }
  async function onDir(srcStat, destStat, src, dest, opts) {
    // the dest directory might not exist, create it
    if (!destStat) {
      await fs.mkdir(dest);
    }
    const items = await fs.readdir(src);

    // loop through the files in the current directory to copy everything
    await Promise.all(items.map(async item => {
      const srcItem = path$1.join(src, item);
      const destItem = path$1.join(dest, item);

      // skip the item if it is matches by the filter function
      const include = await runFilter(srcItem, destItem, opts);
      if (!include) return;
      const {
        destStat
      } = await stat.checkPaths(srcItem, destItem, 'copy', opts);

      // If the item is a copyable file, `getStatsAndPerformCopy` will copy it
      // If the item is a directory, `getStatsAndPerformCopy` will call `onDir` recursively
      return getStatsAndPerformCopy(destStat, srcItem, destItem, opts);
    }));
    if (!destStat) {
      await fs.chmod(dest, srcStat.mode);
    }
  }
  async function onLink(destStat, src, dest, opts) {
    let resolvedSrc = await fs.readlink(src);
    if (opts.dereference) {
      resolvedSrc = path$1.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs.symlink(resolvedSrc, dest);
    }
    let resolvedDest = null;
    try {
      resolvedDest = await fs.readlink(dest);
    } catch (e) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (e.code === 'EINVAL' || e.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest);
      throw e;
    }
    if (opts.dereference) {
      resolvedDest = path$1.resolve(process.cwd(), resolvedDest);
    }
    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
    }

    // do not copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
    }

    // copy the link
    await fs.unlink(dest);
    return fs.symlink(resolvedSrc, dest);
  }
  copy_1 = copy;
  return copy_1;
}

var copySync_1;
var hasRequiredCopySync;
function requireCopySync() {
  if (hasRequiredCopySync) return copySync_1;
  hasRequiredCopySync = 1;
  const fs = requireGracefulFs();
  const path$1 = path;
  const mkdirsSync = requireMkdirs().mkdirsSync;
  const utimesMillisSync = requireUtimes().utimesMillisSync;
  const stat = /*@__PURE__*/requireStat();
  function copySync(src, dest, opts) {
    if (typeof opts === 'function') {
      opts = {
        filter: opts
      };
    }
    opts = opts || {};
    opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
    opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

    // Warn about using preserveTimestamps on 32-bit node
    if (opts.preserveTimestamps && process.arch === 'ia32') {
      process.emitWarning('Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' + '\tsee https://github.com/jprichardson/node-fs-extra/issues/269', 'Warning', 'fs-extra-WARN0002');
    }
    const {
      srcStat,
      destStat
    } = stat.checkPathsSync(src, dest, 'copy', opts);
    stat.checkParentPathsSync(src, srcStat, dest, 'copy');
    if (opts.filter && !opts.filter(src, dest)) return;
    const destParent = path$1.dirname(dest);
    if (!fs.existsSync(destParent)) mkdirsSync(destParent);
    return getStats(destStat, src, dest, opts);
  }
  function getStats(destStat, src, dest, opts) {
    const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
    const srcStat = statSync(src);
    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    throw new Error(`Unknown file: ${src}`);
  }
  function onFile(srcStat, destStat, src, dest, opts) {
    if (!destStat) return copyFile(srcStat, src, dest, opts);
    return mayCopyFile(srcStat, src, dest, opts);
  }
  function mayCopyFile(srcStat, src, dest, opts) {
    if (opts.overwrite) {
      fs.unlinkSync(dest);
      return copyFile(srcStat, src, dest, opts);
    } else if (opts.errorOnExist) {
      throw new Error(`'${dest}' already exists`);
    }
  }
  function copyFile(srcStat, src, dest, opts) {
    fs.copyFileSync(src, dest);
    if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
    return setDestMode(dest, srcStat.mode);
  }
  function handleTimestamps(srcMode, src, dest) {
    // Make sure the file is writable before setting the timestamp
    // otherwise open fails with EPERM when invoked with 'r+'
    // (through utimes call)
    if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
    return setDestTimestamps(src, dest);
  }
  function fileIsNotWritable(srcMode) {
    return (srcMode & 0o200) === 0;
  }
  function makeFileWritable(dest, srcMode) {
    return setDestMode(dest, srcMode | 0o200);
  }
  function setDestMode(dest, srcMode) {
    return fs.chmodSync(dest, srcMode);
  }
  function setDestTimestamps(src, dest) {
    // The initial srcStat.atime cannot be trusted
    // because it is modified by the read(2) system call
    // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
    const updatedSrcStat = fs.statSync(src);
    return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
  }
  function onDir(srcStat, destStat, src, dest, opts) {
    if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
    return copyDir(src, dest, opts);
  }
  function mkDirAndCopy(srcMode, src, dest, opts) {
    fs.mkdirSync(dest);
    copyDir(src, dest, opts);
    return setDestMode(dest, srcMode);
  }
  function copyDir(src, dest, opts) {
    fs.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts));
  }
  function copyDirItem(item, src, dest, opts) {
    const srcItem = path$1.join(src, item);
    const destItem = path$1.join(dest, item);
    if (opts.filter && !opts.filter(srcItem, destItem)) return;
    const {
      destStat
    } = stat.checkPathsSync(srcItem, destItem, 'copy', opts);
    return getStats(destStat, srcItem, destItem, opts);
  }
  function onLink(destStat, src, dest, opts) {
    let resolvedSrc = fs.readlinkSync(src);
    if (opts.dereference) {
      resolvedSrc = path$1.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs.symlinkSync(resolvedSrc, dest);
    } else {
      let resolvedDest;
      try {
        resolvedDest = fs.readlinkSync(dest);
      } catch (err) {
        // dest exists and is a regular file or directory,
        // Windows may throw UNKNOWN error. If dest already exists,
        // fs throws error anyway, so no need to guard against it here.
        if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest);
        throw err;
      }
      if (opts.dereference) {
        resolvedDest = path$1.resolve(process.cwd(), resolvedDest);
      }
      if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
        throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
      }

      // prevent copy if src is a subdir of dest since unlinking
      // dest in this case would result in removing src contents
      // and therefore a broken symlink would be created.
      if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
        throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
      }
      return copyLink(resolvedSrc, dest);
    }
  }
  function copyLink(resolvedSrc, dest) {
    fs.unlinkSync(dest);
    return fs.symlinkSync(resolvedSrc, dest);
  }
  copySync_1 = copySync;
  return copySync_1;
}

var copy;
var hasRequiredCopy;
function requireCopy() {
  if (hasRequiredCopy) return copy;
  hasRequiredCopy = 1;
  const u = requireUniversalify().fromPromise;
  copy = {
    copy: u(/*@__PURE__*/requireCopy$1()),
    copySync: /*@__PURE__*/requireCopySync()
  };
  return copy;
}

var remove_1;
var hasRequiredRemove;
function requireRemove() {
  if (hasRequiredRemove) return remove_1;
  hasRequiredRemove = 1;
  const fs = requireGracefulFs();
  const u = requireUniversalify().fromCallback;
  function remove(path, callback) {
    fs.rm(path, {
      recursive: true,
      force: true
    }, callback);
  }
  function removeSync(path) {
    fs.rmSync(path, {
      recursive: true,
      force: true
    });
  }
  remove_1 = {
    remove: u(remove),
    removeSync
  };
  return remove_1;
}

var empty;
var hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  const u = requireUniversalify().fromPromise;
  const fs = /*@__PURE__*/requireFs();
  const path$1 = path;
  const mkdir = /*@__PURE__*/requireMkdirs();
  const remove = /*@__PURE__*/requireRemove();
  const emptyDir = u(async function emptyDir(dir) {
    let items;
    try {
      items = await fs.readdir(dir);
    } catch {
      return mkdir.mkdirs(dir);
    }
    return Promise.all(items.map(item => remove.remove(path$1.join(dir, item))));
  });
  function emptyDirSync(dir) {
    let items;
    try {
      items = fs.readdirSync(dir);
    } catch {
      return mkdir.mkdirsSync(dir);
    }
    items.forEach(item => {
      item = path$1.join(dir, item);
      remove.removeSync(item);
    });
  }
  empty = {
    emptyDirSync,
    emptydirSync: emptyDirSync,
    emptyDir,
    emptydir: emptyDir
  };
  return empty;
}

var file;
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  const u = requireUniversalify().fromPromise;
  const path$1 = path;
  const fs = /*@__PURE__*/requireFs();
  const mkdir = /*@__PURE__*/requireMkdirs();
  async function createFile(file) {
    let stats;
    try {
      stats = await fs.stat(file);
    } catch {}
    if (stats && stats.isFile()) return;
    const dir = path$1.dirname(file);
    let dirStats = null;
    try {
      dirStats = await fs.stat(dir);
    } catch (err) {
      // if the directory doesn't exist, make it
      if (err.code === 'ENOENT') {
        await mkdir.mkdirs(dir);
        await fs.writeFile(file, '');
        return;
      } else {
        throw err;
      }
    }
    if (dirStats.isDirectory()) {
      await fs.writeFile(file, '');
    } else {
      // parent is not a directory
      // This is just to cause an internal ENOTDIR error to be thrown
      await fs.readdir(dir);
    }
  }
  function createFileSync(file) {
    let stats;
    try {
      stats = fs.statSync(file);
    } catch {}
    if (stats && stats.isFile()) return;
    const dir = path$1.dirname(file);
    try {
      if (!fs.statSync(dir).isDirectory()) {
        // parent is not a directory
        // This is just to cause an internal ENOTDIR error to be thrown
        fs.readdirSync(dir);
      }
    } catch (err) {
      // If the stat call above failed because the directory doesn't exist, create it
      if (err && err.code === 'ENOENT') mkdir.mkdirsSync(dir);else throw err;
    }
    fs.writeFileSync(file, '');
  }
  file = {
    createFile: u(createFile),
    createFileSync
  };
  return file;
}

var link;
var hasRequiredLink;
function requireLink() {
  if (hasRequiredLink) return link;
  hasRequiredLink = 1;
  const u = requireUniversalify().fromPromise;
  const path$1 = path;
  const fs = /*@__PURE__*/requireFs();
  const mkdir = /*@__PURE__*/requireMkdirs();
  const {
    pathExists
  } = /*@__PURE__*/requirePathExists();
  const {
    areIdentical
  } = /*@__PURE__*/requireStat();
  async function createLink(srcpath, dstpath) {
    let dstStat;
    try {
      dstStat = await fs.lstat(dstpath);
    } catch {
      // ignore error
    }
    let srcStat;
    try {
      srcStat = await fs.lstat(srcpath);
    } catch (err) {
      err.message = err.message.replace('lstat', 'ensureLink');
      throw err;
    }
    if (dstStat && areIdentical(srcStat, dstStat)) return;
    const dir = path$1.dirname(dstpath);
    const dirExists = await pathExists(dir);
    if (!dirExists) {
      await mkdir.mkdirs(dir);
    }
    await fs.link(srcpath, dstpath);
  }
  function createLinkSync(srcpath, dstpath) {
    let dstStat;
    try {
      dstStat = fs.lstatSync(dstpath);
    } catch {}
    try {
      const srcStat = fs.lstatSync(srcpath);
      if (dstStat && areIdentical(srcStat, dstStat)) return;
    } catch (err) {
      err.message = err.message.replace('lstat', 'ensureLink');
      throw err;
    }
    const dir = path$1.dirname(dstpath);
    const dirExists = fs.existsSync(dir);
    if (dirExists) return fs.linkSync(srcpath, dstpath);
    mkdir.mkdirsSync(dir);
    return fs.linkSync(srcpath, dstpath);
  }
  link = {
    createLink: u(createLink),
    createLinkSync
  };
  return link;
}

var symlinkPaths_1;
var hasRequiredSymlinkPaths;
function requireSymlinkPaths() {
  if (hasRequiredSymlinkPaths) return symlinkPaths_1;
  hasRequiredSymlinkPaths = 1;
  const path$1 = path;
  const fs = /*@__PURE__*/requireFs();
  const {
    pathExists
  } = /*@__PURE__*/requirePathExists();
  const u = requireUniversalify().fromPromise;

  /**
   * Function that returns two types of paths, one relative to symlink, and one
   * relative to the current working directory. Checks if path is absolute or
   * relative. If the path is relative, this function checks if the path is
   * relative to symlink or relative to current working directory. This is an
   * initiative to find a smarter `srcpath` to supply when building symlinks.
   * This allows you to determine which path to use out of one of three possible
   * types of source paths. The first is an absolute path. This is detected by
   * `path.isAbsolute()`. When an absolute path is provided, it is checked to
   * see if it exists. If it does it's used, if not an error is returned
   * (callback)/ thrown (sync). The other two options for `srcpath` are a
   * relative url. By default Node's `fs.symlink` works by creating a symlink
   * using `dstpath` and expects the `srcpath` to be relative to the newly
   * created symlink. If you provide a `srcpath` that does not exist on the file
   * system it results in a broken symlink. To minimize this, the function
   * checks to see if the 'relative to symlink' source file exists, and if it
   * does it will use it. If it does not, it checks if there's a file that
   * exists that is relative to the current working directory, if does its used.
   * This preserves the expectations of the original fs.symlink spec and adds
   * the ability to pass in `relative to current working direcotry` paths.
   */

  async function symlinkPaths(srcpath, dstpath) {
    if (path$1.isAbsolute(srcpath)) {
      try {
        await fs.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink');
        throw err;
      }
      return {
        toCwd: srcpath,
        toDst: srcpath
      };
    }
    const dstdir = path$1.dirname(dstpath);
    const relativeToDst = path$1.join(dstdir, srcpath);
    const exists = await pathExists(relativeToDst);
    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      };
    }
    try {
      await fs.lstat(srcpath);
    } catch (err) {
      err.message = err.message.replace('lstat', 'ensureSymlink');
      throw err;
    }
    return {
      toCwd: srcpath,
      toDst: path$1.relative(dstdir, srcpath)
    };
  }
  function symlinkPathsSync(srcpath, dstpath) {
    if (path$1.isAbsolute(srcpath)) {
      const exists = fs.existsSync(srcpath);
      if (!exists) throw new Error('absolute srcpath does not exist');
      return {
        toCwd: srcpath,
        toDst: srcpath
      };
    }
    const dstdir = path$1.dirname(dstpath);
    const relativeToDst = path$1.join(dstdir, srcpath);
    const exists = fs.existsSync(relativeToDst);
    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      };
    }
    const srcExists = fs.existsSync(srcpath);
    if (!srcExists) throw new Error('relative srcpath does not exist');
    return {
      toCwd: srcpath,
      toDst: path$1.relative(dstdir, srcpath)
    };
  }
  symlinkPaths_1 = {
    symlinkPaths: u(symlinkPaths),
    symlinkPathsSync
  };
  return symlinkPaths_1;
}

var symlinkType_1;
var hasRequiredSymlinkType;
function requireSymlinkType() {
  if (hasRequiredSymlinkType) return symlinkType_1;
  hasRequiredSymlinkType = 1;
  const fs = /*@__PURE__*/requireFs();
  const u = requireUniversalify().fromPromise;
  async function symlinkType(srcpath, type) {
    if (type) return type;
    let stats;
    try {
      stats = await fs.lstat(srcpath);
    } catch {
      return 'file';
    }
    return stats && stats.isDirectory() ? 'dir' : 'file';
  }
  function symlinkTypeSync(srcpath, type) {
    if (type) return type;
    let stats;
    try {
      stats = fs.lstatSync(srcpath);
    } catch {
      return 'file';
    }
    return stats && stats.isDirectory() ? 'dir' : 'file';
  }
  symlinkType_1 = {
    symlinkType: u(symlinkType),
    symlinkTypeSync
  };
  return symlinkType_1;
}

var symlink;
var hasRequiredSymlink;
function requireSymlink() {
  if (hasRequiredSymlink) return symlink;
  hasRequiredSymlink = 1;
  const u = requireUniversalify().fromPromise;
  const path$1 = path;
  const fs = /*@__PURE__*/requireFs();
  const {
    mkdirs,
    mkdirsSync
  } = /*@__PURE__*/requireMkdirs();
  const {
    symlinkPaths,
    symlinkPathsSync
  } = /*@__PURE__*/requireSymlinkPaths();
  const {
    symlinkType,
    symlinkTypeSync
  } = /*@__PURE__*/requireSymlinkType();
  const {
    pathExists
  } = /*@__PURE__*/requirePathExists();
  const {
    areIdentical
  } = /*@__PURE__*/requireStat();
  async function createSymlink(srcpath, dstpath, type) {
    let stats;
    try {
      stats = await fs.lstat(dstpath);
    } catch {}
    if (stats && stats.isSymbolicLink()) {
      const [srcStat, dstStat] = await Promise.all([fs.stat(srcpath), fs.stat(dstpath)]);
      if (areIdentical(srcStat, dstStat)) return;
    }
    const relative = await symlinkPaths(srcpath, dstpath);
    srcpath = relative.toDst;
    const toType = await symlinkType(relative.toCwd, type);
    const dir = path$1.dirname(dstpath);
    if (!(await pathExists(dir))) {
      await mkdirs(dir);
    }
    return fs.symlink(srcpath, dstpath, toType);
  }
  function createSymlinkSync(srcpath, dstpath, type) {
    let stats;
    try {
      stats = fs.lstatSync(dstpath);
    } catch {}
    if (stats && stats.isSymbolicLink()) {
      const srcStat = fs.statSync(srcpath);
      const dstStat = fs.statSync(dstpath);
      if (areIdentical(srcStat, dstStat)) return;
    }
    const relative = symlinkPathsSync(srcpath, dstpath);
    srcpath = relative.toDst;
    type = symlinkTypeSync(relative.toCwd, type);
    const dir = path$1.dirname(dstpath);
    const exists = fs.existsSync(dir);
    if (exists) return fs.symlinkSync(srcpath, dstpath, type);
    mkdirsSync(dir);
    return fs.symlinkSync(srcpath, dstpath, type);
  }
  symlink = {
    createSymlink: u(createSymlink),
    createSymlinkSync
  };
  return symlink;
}

var ensure;
var hasRequiredEnsure;
function requireEnsure() {
  if (hasRequiredEnsure) return ensure;
  hasRequiredEnsure = 1;
  const {
    createFile,
    createFileSync
  } = /*@__PURE__*/requireFile();
  const {
    createLink,
    createLinkSync
  } = /*@__PURE__*/requireLink();
  const {
    createSymlink,
    createSymlinkSync
  } = /*@__PURE__*/requireSymlink();
  ensure = {
    // file
    createFile,
    createFileSync,
    ensureFile: createFile,
    ensureFileSync: createFileSync,
    // link
    createLink,
    createLinkSync,
    ensureLink: createLink,
    ensureLinkSync: createLinkSync,
    // symlink
    createSymlink,
    createSymlinkSync,
    ensureSymlink: createSymlink,
    ensureSymlinkSync: createSymlinkSync
  };
  return ensure;
}

var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  function stringify(obj, {
    EOL = '\n',
    finalEOL = true,
    replacer = null,
    spaces
  } = {}) {
    const EOF = finalEOL ? EOL : '';
    const str = JSON.stringify(obj, replacer, spaces);
    return str.replace(/\n/g, EOL) + EOF;
  }
  function stripBom(content) {
    // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
    if (Buffer.isBuffer(content)) content = content.toString('utf8');
    return content.replace(/^\uFEFF/, '');
  }
  utils = {
    stringify,
    stripBom
  };
  return utils;
}

var jsonfile_1;
var hasRequiredJsonfile$1;
function requireJsonfile$1() {
  if (hasRequiredJsonfile$1) return jsonfile_1;
  hasRequiredJsonfile$1 = 1;
  let _fs;
  try {
    _fs = requireGracefulFs();
  } catch (_) {
    _fs = fs$2;
  }
  const universalify = requireUniversalify();
  const {
    stringify,
    stripBom
  } = requireUtils();
  async function _readFile(file, options = {}) {
    if (typeof options === 'string') {
      options = {
        encoding: options
      };
    }
    const fs = options.fs || _fs;
    const shouldThrow = 'throws' in options ? options.throws : true;
    let data = await universalify.fromCallback(fs.readFile)(file, options);
    data = stripBom(data);
    let obj;
    try {
      obj = JSON.parse(data, options ? options.reviver : null);
    } catch (err) {
      if (shouldThrow) {
        err.message = `${file}: ${err.message}`;
        throw err;
      } else {
        return null;
      }
    }
    return obj;
  }
  const readFile = universalify.fromPromise(_readFile);
  function readFileSync(file, options = {}) {
    if (typeof options === 'string') {
      options = {
        encoding: options
      };
    }
    const fs = options.fs || _fs;
    const shouldThrow = 'throws' in options ? options.throws : true;
    try {
      let content = fs.readFileSync(file, options);
      content = stripBom(content);
      return JSON.parse(content, options.reviver);
    } catch (err) {
      if (shouldThrow) {
        err.message = `${file}: ${err.message}`;
        throw err;
      } else {
        return null;
      }
    }
  }
  async function _writeFile(file, obj, options = {}) {
    const fs = options.fs || _fs;
    const str = stringify(obj, options);
    await universalify.fromCallback(fs.writeFile)(file, str, options);
  }
  const writeFile = universalify.fromPromise(_writeFile);
  function writeFileSync(file, obj, options = {}) {
    const fs = options.fs || _fs;
    const str = stringify(obj, options);
    // not sure if fs.writeFileSync returns anything, but just in case
    return fs.writeFileSync(file, str, options);
  }
  const jsonfile = {
    readFile,
    readFileSync,
    writeFile,
    writeFileSync
  };
  jsonfile_1 = jsonfile;
  return jsonfile_1;
}

var jsonfile;
var hasRequiredJsonfile;
function requireJsonfile() {
  if (hasRequiredJsonfile) return jsonfile;
  hasRequiredJsonfile = 1;
  const jsonFile = requireJsonfile$1();
  jsonfile = {
    // jsonfile exports
    readJson: jsonFile.readFile,
    readJsonSync: jsonFile.readFileSync,
    writeJson: jsonFile.writeFile,
    writeJsonSync: jsonFile.writeFileSync
  };
  return jsonfile;
}

var outputFile_1;
var hasRequiredOutputFile;
function requireOutputFile() {
  if (hasRequiredOutputFile) return outputFile_1;
  hasRequiredOutputFile = 1;
  const u = requireUniversalify().fromPromise;
  const fs = /*@__PURE__*/requireFs();
  const path$1 = path;
  const mkdir = /*@__PURE__*/requireMkdirs();
  const pathExists = requirePathExists().pathExists;
  async function outputFile(file, data, encoding = 'utf-8') {
    const dir = path$1.dirname(file);
    if (!(await pathExists(dir))) {
      await mkdir.mkdirs(dir);
    }
    return fs.writeFile(file, data, encoding);
  }
  function outputFileSync(file, ...args) {
    const dir = path$1.dirname(file);
    if (!fs.existsSync(dir)) {
      mkdir.mkdirsSync(dir);
    }
    fs.writeFileSync(file, ...args);
  }
  outputFile_1 = {
    outputFile: u(outputFile),
    outputFileSync
  };
  return outputFile_1;
}

var outputJson_1;
var hasRequiredOutputJson;
function requireOutputJson() {
  if (hasRequiredOutputJson) return outputJson_1;
  hasRequiredOutputJson = 1;
  const {
    stringify
  } = requireUtils();
  const {
    outputFile
  } = /*@__PURE__*/requireOutputFile();
  async function outputJson(file, data, options = {}) {
    const str = stringify(data, options);
    await outputFile(file, str, options);
  }
  outputJson_1 = outputJson;
  return outputJson_1;
}

var outputJsonSync_1;
var hasRequiredOutputJsonSync;
function requireOutputJsonSync() {
  if (hasRequiredOutputJsonSync) return outputJsonSync_1;
  hasRequiredOutputJsonSync = 1;
  const {
    stringify
  } = requireUtils();
  const {
    outputFileSync
  } = /*@__PURE__*/requireOutputFile();
  function outputJsonSync(file, data, options) {
    const str = stringify(data, options);
    outputFileSync(file, str, options);
  }
  outputJsonSync_1 = outputJsonSync;
  return outputJsonSync_1;
}

var json;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json;
  hasRequiredJson = 1;
  const u = requireUniversalify().fromPromise;
  const jsonFile = /*@__PURE__*/requireJsonfile();
  jsonFile.outputJson = u(/*@__PURE__*/requireOutputJson());
  jsonFile.outputJsonSync = /*@__PURE__*/requireOutputJsonSync();
  // aliases
  jsonFile.outputJSON = jsonFile.outputJson;
  jsonFile.outputJSONSync = jsonFile.outputJsonSync;
  jsonFile.writeJSON = jsonFile.writeJson;
  jsonFile.writeJSONSync = jsonFile.writeJsonSync;
  jsonFile.readJSON = jsonFile.readJson;
  jsonFile.readJSONSync = jsonFile.readJsonSync;
  json = jsonFile;
  return json;
}

var move_1;
var hasRequiredMove$1;
function requireMove$1() {
  if (hasRequiredMove$1) return move_1;
  hasRequiredMove$1 = 1;
  const fs = /*@__PURE__*/requireFs();
  const path$1 = path;
  const {
    copy
  } = /*@__PURE__*/requireCopy();
  const {
    remove
  } = /*@__PURE__*/requireRemove();
  const {
    mkdirp
  } = /*@__PURE__*/requireMkdirs();
  const {
    pathExists
  } = /*@__PURE__*/requirePathExists();
  const stat = /*@__PURE__*/requireStat();
  async function move(src, dest, opts = {}) {
    const overwrite = opts.overwrite || opts.clobber || false;
    const {
      srcStat,
      isChangingCase = false
    } = await stat.checkPaths(src, dest, 'move', opts);
    await stat.checkParentPaths(src, srcStat, dest, 'move');

    // If the parent of dest is not root, make sure it exists before proceeding
    const destParent = path$1.dirname(dest);
    const parsedParentPath = path$1.parse(destParent);
    if (parsedParentPath.root !== destParent) {
      await mkdirp(destParent);
    }
    return doRename(src, dest, overwrite, isChangingCase);
  }
  async function doRename(src, dest, overwrite, isChangingCase) {
    if (!isChangingCase) {
      if (overwrite) {
        await remove(dest);
      } else if (await pathExists(dest)) {
        throw new Error('dest already exists.');
      }
    }
    try {
      // Try w/ rename first, and try copy + remove if EXDEV
      await fs.rename(src, dest);
    } catch (err) {
      if (err.code !== 'EXDEV') {
        throw err;
      }
      await moveAcrossDevice(src, dest, overwrite);
    }
  }
  async function moveAcrossDevice(src, dest, overwrite) {
    const opts = {
      overwrite,
      errorOnExist: true,
      preserveTimestamps: true
    };
    await copy(src, dest, opts);
    return remove(src);
  }
  move_1 = move;
  return move_1;
}

var moveSync_1;
var hasRequiredMoveSync;
function requireMoveSync() {
  if (hasRequiredMoveSync) return moveSync_1;
  hasRequiredMoveSync = 1;
  const fs = requireGracefulFs();
  const path$1 = path;
  const copySync = requireCopy().copySync;
  const removeSync = requireRemove().removeSync;
  const mkdirpSync = requireMkdirs().mkdirpSync;
  const stat = /*@__PURE__*/requireStat();
  function moveSync(src, dest, opts) {
    opts = opts || {};
    const overwrite = opts.overwrite || opts.clobber || false;
    const {
      srcStat,
      isChangingCase = false
    } = stat.checkPathsSync(src, dest, 'move', opts);
    stat.checkParentPathsSync(src, srcStat, dest, 'move');
    if (!isParentRoot(dest)) mkdirpSync(path$1.dirname(dest));
    return doRename(src, dest, overwrite, isChangingCase);
  }
  function isParentRoot(dest) {
    const parent = path$1.dirname(dest);
    const parsedPath = path$1.parse(parent);
    return parsedPath.root === parent;
  }
  function doRename(src, dest, overwrite, isChangingCase) {
    if (isChangingCase) return rename(src, dest, overwrite);
    if (overwrite) {
      removeSync(dest);
      return rename(src, dest, overwrite);
    }
    if (fs.existsSync(dest)) throw new Error('dest already exists.');
    return rename(src, dest, overwrite);
  }
  function rename(src, dest, overwrite) {
    try {
      fs.renameSync(src, dest);
    } catch (err) {
      if (err.code !== 'EXDEV') throw err;
      return moveAcrossDevice(src, dest, overwrite);
    }
  }
  function moveAcrossDevice(src, dest, overwrite) {
    const opts = {
      overwrite,
      errorOnExist: true,
      preserveTimestamps: true
    };
    copySync(src, dest, opts);
    return removeSync(src);
  }
  moveSync_1 = moveSync;
  return moveSync_1;
}

var move;
var hasRequiredMove;
function requireMove() {
  if (hasRequiredMove) return move;
  hasRequiredMove = 1;
  const u = requireUniversalify().fromPromise;
  move = {
    move: u(/*@__PURE__*/requireMove$1()),
    moveSync: /*@__PURE__*/requireMoveSync()
  };
  return move;
}

var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  lib = {
    // Export promiseified graceful-fs:
    ... /*@__PURE__*/requireFs(),
    // Export extra methods:
    ... /*@__PURE__*/requireCopy(),
    ... /*@__PURE__*/requireEmpty(),
    ... /*@__PURE__*/requireEnsure(),
    ... /*@__PURE__*/requireJson(),
    ... /*@__PURE__*/requireMkdirs(),
    ... /*@__PURE__*/requireMove(),
    ... /*@__PURE__*/requireOutputFile(),
    ... /*@__PURE__*/requirePathExists(),
    ... /*@__PURE__*/requireRemove()
  };
  return lib;
}

var libExports = /*@__PURE__*/ requireLib();
var fs = /*@__PURE__*/getDefaultExportFromCjs(libExports);

var GlobalFS$1 = EditorFramework.FileUtils.GlobalFS;

/**
 * Remove redundant envmap texture files from package.
 * @alpha
 */
class RedundantEnvMapOpt extends EffectExportStrategy {
  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */
  allPngFiles = [];
  /** @internal */
  removeEnvMap = false;
  /** @internal */
  specularEnvmaps = new Set();
  tmpFiles = [];

  /** @internal */
  settings = {
    removeEnvMapFromSceneEditor: false
  };
  /** @internal */
  removedComps = new Map();

  /** @alpha */
  constructor(parameters, pkgInfos, zipObj) {
    super(parameters, pkgInfos, zipObj);
    this.parseConfig();
  }
  /** @alpha */
  parseConfig() {
    if (this.strategyConfig.apply) {
      for (const item of this.strategyConfig.config) {
        for (const key of Object.keys(item)) {
          if (key === 'removeEnvMapFromSceneEditor') {
            this.settings.removeEnvMapFromSceneEditor = item.removeEnvMapFromSceneEditor;
          }
        }
      }
    }
  }
  getEnvmapTextureFromMainSceneFileString(sceneFileStr) {
    const specularEnvmaps = new Set();
    try {
      console.debug('parse main.scene start');
      if (sceneFileStr === null || sceneFileStr === undefined || sceneFileStr === '') {
        console.error('sceneFileStr is null or undefined or empty');
        return specularEnvmaps;
      }
      const docs = YAML.parseAllDocuments(sceneFileStr);
      for (const doc of docs) {
        const obj = doc.toJSON();
        if (obj.entities === undefined) {
          continue;
        }
        for (const entity of obj.entities) {
          if (entity.components === undefined) {
            continue;
          }
          for (const comp of entity.components) {
            if (comp.__class === 'Envmap') {
              const specularEnvmap = comp.specularEnvmap.path;
              if (specularEnvmap !== undefined) {
                specularEnvmaps.add(specularEnvmap);
              }
            }
          }
        }
      }
      console.debug('parse main.scene end');
    } catch (err) {
      console.error('Error reading file:', err);
    }
    return specularEnvmaps;
  }
  getEnvmapTexture() {
    const sceneEntry = this.pkgInfos.zip.getEntry('AmazingFeature_opt_tmp/' + 'main.scene');
    if (sceneEntry !== null) {
      return this.getEnvmapTextureFromMainSceneZipEntry(sceneEntry);
    }
    const mainScenePath = path.join(this.pkgInfos.srcPath, 'main.scene');
    if (fs.existsSync(mainScenePath)) {
      return this.getEnvmapTextureFromMainSceneFile(mainScenePath);
    }
    if (this.pkgInfos.effectPkgBuffer !== undefined && this.pkgInfos.inMemory) {
      const path = 'AmazingFeature_opt_tmp/main.scene';
      const buffer = this.pkgInfos.effectPkgBuffer.readFileBuffer(path, false);
      if (buffer !== undefined) {
        const decoder = new require$$4.TextDecoder('utf-8');
        const bufferStr = decoder.decode(buffer);
        return this.getEnvmapTextureFromMainSceneFileString(bufferStr);
      } else {
        console.error('Error reading file:', path);
      }
    }
    return new Set();
  }

  /** @alpha */
  getEnvmapTextureFromMainSceneFile(mainScenePath) {
    const sceneEntryStr = fs.readFileSync(mainScenePath, 'utf-8');
    return this.getEnvmapTextureFromMainSceneFileString(sceneEntryStr);
  }

  /** @alpha */
  getEnvmapTextureFromMainSceneZipEntry(sceneEntry) {
    const specularEnvmaps = new Set();
    if (sceneEntry !== null) {
      let sceneEntryStr;
      try {
        var _this$pkgInfos$zip$re;
        sceneEntryStr = (_this$pkgInfos$zip$re = this.pkgInfos.zip.readFile(sceneEntry)) === null || _this$pkgInfos$zip$re === void 0 ? void 0 : _this$pkgInfos$zip$re.toString('utf-8');
      } catch (e) {
        console.log(e);
      }
      if (sceneEntryStr !== undefined) {
        return this.getEnvmapTextureFromMainSceneFileString(sceneEntryStr);
      }
    }
    return specularEnvmaps;
  }
  isReferencedEnvmapTexturebyFile(filename, content) {
    if (content === null || content === '') {
      return false;
    }
    let regexStr = '';
    if (filename.endsWith('.material') || filename.endsWith('.frag') || filename.endsWith('.vert')) {
      // The env light is used in the material.
      regexStr = '_EnvironmentIntensity|_EnvironmentRotation';

      // The picture resource used by env light is used in other non-env light forms, such as skyboxes.
      for (const envmapTexture of this.specularEnvmaps) {
        regexStr = regexStr + '|' + envmapTexture;
      }
    }

    // The graph references the env light component. Check file: AmazingFeature/Liquid/Graph/GraphMetaData.json.
    if (filename.endsWith('GraphMetaData.json')) {
      regexStr = '"Envmap"';
    }

    // js files references the env light component.
    if (filename.endsWith('.js')) {
      regexStr = 'Envmap';
    }

    // some js script always contains 'Envmap' text, skip it.
    if (regexStr === '' || filename.endsWith('Scene.js') || filename.endsWith('Physics3D.js') || filename.endsWith('Envmap.js') || filename.endsWith('amazingpro.js') || filename.endsWith('ieLib.js')) {
      return false;
    }
    const regex = new RegExp(regexStr);
    const useEnvMap = content.match(regex) !== null;
    if (useEnvMap) {
      console.log(filename + ' refers to Envmap!');
      return true;
    }
    return false;
  }
  isReferencedEnvmapbyVisualScript() {
    const GraphMetaDataFilePath = path.join(this.pkgInfos.ctx.exportPath, 'AmazingFeature/Liquid/Graph/GraphMetaData.json');
    if (fs.existsSync(GraphMetaDataFilePath)) {
      const bufferStr = fs.readFileSync(GraphMetaDataFilePath, 'utf-8');
      return this.isReferencedEnvmapTexturebyFile(GraphMetaDataFilePath, bufferStr);
    }
    return false;
  }

  /** @alpha */
  analyze() {
    console.log('start RedundantEnvMapOpt analyze');
    const objs = this.pkgInfos.ctx.sceneEditor.target.getAllSceneObjects();
    let hasEnvMap = false;
    for (const obj of objs) {
      const comps = obj.getComponents('Envmap');
      if (comps.length > 0) {
        hasEnvMap = true;
        break;
      }
    }
    if (!hasEnvMap) {
      return;
    }
    this.specularEnvmaps = this.getEnvmapTexture();
    let useEnvMap = true;
    if (this.pkgInfos.inMemory && this.pkgInfos.effectPkgBuffer !== undefined) {
      for (const [file, contents] of this.pkgInfos.effectPkgBuffer.fileContents) {
        const zipFileName = file.replace(/\\/g, '/');
        if (file.includes('AmazingFeature_opt_tmp')) {
          this.tmpFiles.push(zipFileName);
        }
        if (zipFileName.endsWith('.png')) {
          continue;
        }
        const decoder = new require$$4.TextDecoder('utf-8');
        const bufferStr = decoder.decode(contents);
        useEnvMap = this.isReferencedEnvmapTexturebyFile(zipFileName, bufferStr);
        if (useEnvMap) {
          break;
        }
      }
      useEnvMap = useEnvMap || this.isReferencedEnvmapbyVisualScript();
    } else {
      for (const entry of this.pkgInfos.zip.getEntries()) {
        const buffer = this.pkgInfos.zip.readFile(entry);
        if (buffer === null) {
          continue;
        }
        useEnvMap = this.isReferencedEnvmapTexturebyFile(entry.entryName, buffer.toString('utf-8'));
        if (useEnvMap) {
          break;
        }
      }
    }
    this.removeEnvMap = !useEnvMap;
    console.log('end RedundantEnvMapOpt analyze');
  }
  /** @alpha */
  async apply() {
    console.log('apply RedundantEnvMapOpt is ' + this.removeEnvMap);
    if (!this.removeEnvMap) {
      return;
    }
    this.applied = true;
    if (this.settings.removeEnvMapFromSceneEditor) {
      this.removedComps = this.removeCompsFromSceneEditor(this.pkgInfos.ctx.sceneEditor, ['Envmap']);
    } else {
      this.removeEnvMapfromScene();
    }
    if (this.pkgInfos.inMemory && this.pkgInfos.effectPkgBuffer !== undefined) {
      this.removeEnvMapTextureFilesFromEffectPkgBuffer();
      this.pkgInfos.effectPkgBufferTmpFiles = this.tmpFiles;
    } else {
      this.removeEnvMapTextureFiles();
      this.removeEnvMapTextureFilesFromPath(this.pkgInfos.ctx.exportPath);
      this.removeEnvMapFromSceneJsonFile();
    }
  }
  afterApplied() {
    console.log('afterApplied RedundantEnvMapOpt');
    if (this.pkgInfos.inMemory && this.pkgInfos.effectPkgBuffer !== undefined) {
      // remove .texture files of envmap
      for (const specularEnvmap of this.specularEnvmaps) {
        const path = 'AmazingFeature/' + specularEnvmap;
        this.pkgInfos.effectPkgBuffer.removeFileBuffer(path, false);
      }
    }
    this.restorCompsToSceneEditor(this.removedComps);
  }
  removeCompsFromSceneEditor(sceneEditor, compNames) {
    console.log('start removeEnvMapFromSceneEditor');
    const objs = sceneEditor.target.getAllSceneObjects();
    const removedCompsMap = new Map();
    for (const obj of objs) {
      const removedComps = this.removeCompsFromObj(obj, compNames);
      if (removedComps.size > 0) {
        removedCompsMap.set(obj, removedComps);
      }
    }
    console.log('end removeEnvMapfromScene');
    return removedCompsMap;
  }
  removeCompsFromObj(obj, compNames) {
    const removedComps = new Map();
    const comps = obj.getComponents();
    for (const compName of compNames) {
      for (let i = 0; i < comps.length; i++) {
        const comp = comps[i];
        if (comp.constructor.name === compName) {
          removedComps.set(i, comp);
          obj.removeComponent(comp);
        }
      }
    }
    return removedComps;
  }
  restorCompsToSceneEditor(removedCompsMap) {
    console.log('start restorEnvMapToSceneEditor');
    for (const [obj, comps] of removedCompsMap) {
      for (const comp of comps) {
        obj.addComponentAt(comp[1], comp[0]);
      }
    }
    console.log('end restorEnvMapToSceneEditor');
  }
  removeEnvMapfromScene() {
    var _this$pkgInfos$zip$re2;
    console.log('start removeEnvMapfromScene');

    // node that EntryName always use '/' in mac and win platform
    const sceneEntryName = 'AmazingFeature/' + 'main.scene';
    const sceneEntry = this.pkgInfos.zip.getEntry(sceneEntryName);
    if (sceneEntry === null) {
      console.error('cannot find ' + sceneEntryName);
      return;
    }
    const sceneBuffer = (_this$pkgInfos$zip$re2 = this.pkgInfos.zip.readFile(sceneEntry)) === null || _this$pkgInfos$zip$re2 === void 0 ? void 0 : _this$pkgInfos$zip$re2.toString('utf-8');
    if (sceneBuffer === undefined) {
      console.error('failed to read ' + sceneEntryName);
      return;
    }

    // When using the 'yamljs' library, it is found that all !<str> are parsed as
    // null. To be on the safe side, when modifying.scene, define the parsing
    // processing logic line by line on your own.
    const lines = sceneBuffer.split('\n');

    // Search for the envmap component
    let modifiedScene = '';
    let envMapRange = false;
    for (const line of lines) {
      if (line.includes('      - __class: Envmap')) {
        envMapRange = true;
      } else if (line.includes('    layer: 0') || line.includes('      - __class:')) {
        envMapRange = false;
      }
      if (!envMapRange) {
        modifiedScene += line + '\n';
      }
    }
    this.pkgInfos.zip.addFile(sceneEntry.entryName, Buffer.from(modifiedScene, 'utf-8'));
    console.log('end removeEnvMapfromScene');
  }
  removeEnvMapTextureFilesFromPath(stickerPath) {
    console.log('start removeEnvMapTextureFilesFromPath');
    const envmapTextureFiles = this.getPngPathsFromEnvmapTextureFiles();
    console.log('find envmapTextures num is ' + envmapTextureFiles.size);
    for (const file of envmapTextureFiles) {
      const envTexturePath = path.join(stickerPath, 'AmazingFeature', file);
      GlobalFS$1.removeSync(path.dirname(envTexturePath));
    }
  }
  removeEnvMapTextureFilesFromEffectPkgBuffer() {
    console.log('start removeEnvMapTextureFilesFromEffectPkgBuffer');
    if (this.pkgInfos.effectPkgBuffer === undefined) {
      return;
    }
    const envmapTextureFiles = this.getPngPathsFromEnvmapTextureFiles();
    console.log('find envmapTextures num is ' + envmapTextureFiles.size);
    for (const file of envmapTextureFiles) {
      const envTexturePath = path.join('AmazingFeature', file);
      this.pkgInfos.effectPkgBuffer.removeFileBuffer(envTexturePath, false);
    }
  }
  getPngPathsFromEnvmapTextureFiles() {
    const envmapTextureFiles = new Set();
    for (const envmap of this.specularEnvmaps) {
      const entryStr = this.getSpecularEnvmapFileString(envmap);
      if (entryStr === '') {
        continue;
      }
      try {
        const obj = YAML.parse(entryStr);
        for (const imageUri of obj.imageProvider.imagesUri) {
          envmapTextureFiles.add(imageUri);
        }
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }
    return envmapTextureFiles;
  }
  getSpecularEnvmapFileString(dotTextureFilePath) {
    if (this.pkgInfos.inMemory && this.pkgInfos.effectPkgBuffer !== undefined) {
      const path = 'AmazingFeature_opt_tmp/' + dotTextureFilePath;
      const buffer = this.pkgInfos.effectPkgBuffer.readFileBuffer(path, false);
      if (buffer !== undefined) {
        const decoder = new require$$4.TextDecoder('utf-8');
        const bufferStr = decoder.decode(buffer);
        return bufferStr;
      } else {
        console.error('Error reading file:', path);
      }
    }
    const envmapEntry = this.pkgInfos.zip.getEntry('AmazingFeature/' + dotTextureFilePath);
    if (envmapEntry !== null) {
      let entryStr;
      try {
        var _this$pkgInfos$zip$re3;
        entryStr = (_this$pkgInfos$zip$re3 = this.pkgInfos.zip.readFile(envmapEntry)) === null || _this$pkgInfos$zip$re3 === void 0 ? void 0 : _this$pkgInfos$zip$re3.toString('utf-8');
      } catch (e) {
        console.error(e);
      }
      return entryStr !== undefined ? entryStr : '';
    }
    const filePath = path.join(this.pkgInfos.srcPath, dotTextureFilePath);
    if (fs.existsSync(filePath)) {
      let fileStr;
      try {
        fileStr = fs.readFileSync(filePath, 'utf-8');
      } catch (err) {
        console.error('Error reading file:', err);
      }
      return fileStr !== undefined ? fileStr : '';
    }
    return '';
  }

  /** @alpha */
  removeEnvMapTextureFiles() {
    console.log('start removeEnvMapTextureFiles');
    const envmapTextureFiles = this.getPngPathsFromEnvmapTextureFiles();
    console.log('find envmapTextures num is ' + envmapTextureFiles.size);
    for (const file of envmapTextureFiles) {
      const entry = this.pkgInfos.zip.getEntry('AmazingFeature/' + file);
      if (entry !== null) {
        this.pkgInfos.zip.deleteFile('AmazingFeature/' + file);
      }
    }
  }

  /** @alpha */
  getChildrenComponent(entities) {
    for (const entity of entities) {
      if (Object.prototype.hasOwnProperty.call(entity, 'children')) {
        if (entity.children.length > 0) {
          this.getChildrenComponent(entity.children);
        }
      }
      for (let idx = entity.components.length - 1; idx >= 0; idx--) {
        if (entity.components[idx].businessTag && entity.components[idx].businessTag.includes('EnvironmentLighting')) {
          entity.components.splice(idx, 1);
          break;
        }
      }
    }
  }

  /** @alpha */
  removeEnvMapFromSceneJsonFile() {
    var _this$pkgInfos$zip$re4;
    const sceneEntry = this.pkgInfos.zip.getEntry('scene.json');
    if (sceneEntry === null) {
      return;
    }
    const sceneBuffer = (_this$pkgInfos$zip$re4 = this.pkgInfos.zip.readFile(sceneEntry)) === null || _this$pkgInfos$zip$re4 === void 0 ? void 0 : _this$pkgInfos$zip$re4.toString('utf-8');
    if (sceneBuffer === undefined) {
      return;
    }
    const sceneJson = JSON.parse(sceneBuffer);
    for (const entity of sceneJson.entities) {
      for (let i = 0; i < entity.components.length; i++) {
        const comp = entity.components[i];
        if (comp.businessTag === 'EnvironmentLighting') {
          entity.components.splice(i, 1);
          break;
        }
      }
      this.getChildrenComponent(entity.children);
    }
    this.pkgInfos.zip.addFile(sceneEntry.entryName, Buffer.from(JSON.stringify(sceneJson, null, 2), 'utf-8'));
    console.log('removeEnvMapFromSceneJsonFile');
  }
}

var GlobalFS = EditorFramework.FileUtils.GlobalFS;
/**
 * @alpha
 */
class OptimizerExportHandler {
  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */
  originPkgFiles = new Set();
  /** @internal */

  /** @internal */

  /** @internal */
  allPngFiles = [];
  /** @internal */
  allTextFiles = [];
  /** @internal */
  configs = [];
  /** @internal */

  /** @internal */
  inMemory = false;
  /** @internal */
  inputPkgIsText = false;
  configedStrategies = [];

  /**
   * post package optimization has two alternative insert point:
   *
   * BEFORE_EXPORT_OPTIMIZER - mainly precess opt step in onBeforeSaveAssets/onAfterSaveAssets
   * END_EXPORT_OPTIMIZER - mainly precess opt step in onExportingEnd callback
   *
   * The currently effective insertion point is BEFORE_EXPORT_OPTIMIZER.
   * END_EXPORT_OPTIMIZER is an earlier version of the insertion point and has
   * not been deleted for the time being for future use.
   * */
  insertPointType = 'BEFORE_EXPORT_OPTIMIZER';

  /** @internal */
  optStickerType = new Map([['submit', {
    path: path.join(EditorFramework.Application.getInstancePath(), 'Submit', 'package'),
    active: true
  }], ['mobile_preview', {
    path: path.join(EditorFramework.Application.getInstancePath(), 'Preview', 'mobile_preview'),
    active: true
  }], ['previewSticker', {
    path: path.join(EditorFramework.Application.getInstancePath(), 'Preview', 'previewSticker'),
    active: false
  }], ['costume', {
    path: '',
    active: false
  }]]);

  /** @alpha */
  strategiesRegistry = {
    RedundantEnvMapOpt
  };

  /** @alpha */
  constructor() {
    this.pakageInfos = new PackageInfos();
    this.zip = new admZip();
  }
  /** @alpha */
  onExportingStart(_ctx, _payload) {
    return;
  }
  /** @alpha */
  handleAmgObjectsBeforeExport(_ctx, _payload) {
    return;
  }
  /** @alpha */
  afterExportingAmazingScene(_ctx, _payload) {
    return;
  }
  /** @alpha */
  exportSceneConfigurationSettings(_ctx, _payload) {
    return;
  }
  /** @alpha */
  handleEffectConfig(_ctx, _payload) {
    return;
  }
  /** @alpha */
  handleExtraJson(_ctx, _payload) {
    return;
  }
  /** @alpha */
  beforeExportingAmazingScene(_ctx, _payload) {
    return;
  }
  /** @alpha */
  handleSettingsOnExport(_ctx, _payload) {
    return;
  }
  /** @alpha */
  exportSubgraphJson(_ctx, _payload) {
    return;
  }
  /** @alpha */
  writeAdditionalFiles(_ctx, _payload) {
    return;
  }
  /** @alpha */
  onExportingEnd(ctx, payload) {
    if (this.insertPointType === 'BEFORE_EXPORT_OPTIMIZER') {
      this.onPostProcessAssets(ctx);
      return;
    }
    if (this.insertPointType !== 'END_EXPORT_OPTIMIZER') {
      return;
    }
    let active = false;
    this.optStickerType.forEach((value, _key) => {
      if (value.active && ctx.exportPath.includes(value.path)) {
        active = true;
      }
    });
    if (!active) {
      return;
    }
    if (payload.inMemory && payload.effectPkgBuffer === undefined) {
      console.error('export mode is inMemory, but effectPkgBuffer is undefined!');
      return;
    }
    this.inputPkgIsText = payload.bText ?? false;
    this.inMemory = payload.inMemory === undefined ? false : payload.inMemory;
    this.reset();
    this.ctx = ctx;
    this.srcPath = ctx.exportPath;
    this.effectPkgBuffer = payload.effectPkgBuffer;
    const configRedundantEnvMapOpt = {
      name: 'RedundantEnvMapOpt',
      apply: true,
      config: []
    };
    this.addStrategy(configRedundantEnvMapOpt);
    this.configedStrategies = this.applyOptimize();
    this.zipPackage();
  }

  /** @internal */
  onBeforeSaveAssets(ctx, payload) {
    console.info('beforeSaveAssets start');
    let active = false;
    this.optStickerType.forEach((value, _key) => {
      if (value.active && ctx.exportPath.includes(value.path)) {
        active = true;
      }
    });
    if (!active) {
      return;
    }
    this.inMemory = ctx.options.inMemory;
    const originRootDir = ctx.assetMgr.rootDir;
    const amazingFeaturePath = path.basename(originRootDir);
    const tmpRootDir = path.join(path.dirname(originRootDir), amazingFeaturePath + '_opt_tmp');
    ctx.assetMgr.rootDir = tmpRootDir;
    const bText = true;
    EditorFramework.Resource.OrionEditorAssetDataBaseAPJSWrapper.saveAssets(ctx.assetMgr, bText, true, false);
    ctx.assetMgr.rootDir = originRootDir;
    this.inputPkgIsText = bText;
    this.reset();
    this.ctx = ctx;
    this.srcPath = tmpRootDir;
    this.effectPkgBuffer = payload.effectPkgBuffer;
    const configRedundantEnvMapOpt = {
      name: 'RedundantEnvMapOpt',
      apply: true,
      config: [{
        removeEnvMapFromSceneEditor: true
      }]
    };
    this.addStrategy(configRedundantEnvMapOpt);
    this.configedStrategies = this.applyOptimize();

    // remove tmp folder
    if (this.inMemory && this.pakageInfos.effectPkgBuffer) {
      if (this.pakageInfos.effectPkgBufferTmpFiles.length === 0) {
        for (const [file] of this.pakageInfos.effectPkgBuffer.fileContents) {
          const zipFileName = file.replace(/\\/g, '/');
          if (file.includes('AmazingFeature_opt_tmp')) {
            this.pakageInfos.effectPkgBufferTmpFiles.push(zipFileName);
          }
        }
      }
      for (const tmpFile of this.pakageInfos.effectPkgBufferTmpFiles) {
        this.pakageInfos.effectPkgBuffer.removeFileBuffer(tmpFile, false);
      }
    } else {
      if (fs$2.existsSync(tmpRootDir)) {
        GlobalFS.removeSync(tmpRootDir);
      }
    }
    console.info('beforeSaveAssets end');
    return;
  }
  onPostProcessAssets(ctx) {
    console.info('onPostProcessAssets start');
    let active = false;
    this.optStickerType.forEach((value, _key) => {
      if (value.active && ctx.exportPath.includes(value.path)) {
        active = true;
      }
    });
    if (!active) {
      return;
    }
    let existOpt = false;
    for (const strategy of this.configedStrategies) {
      if (strategy.applied) {
        strategy.afterApplied();
        existOpt = true;
        console.info('applied ' + strategy.getStrategyConfig().name);
      }
    }
    if (!existOpt) {
      console.info('no optimize applied!');
    }
    if (!this.inMemory && fs$2.existsSync(this.srcPath)) {
      GlobalFS.removeSync(path.dirname(this.srcPath));
    }
    console.info('onPostProcessAssets end');
    return;
  }

  /** @internal */
  reset() {
    this.pakageInfos = new PackageInfos();
    this.configs = [];
    this.zip = new admZip();
    this.allPngFiles = [];
    this.allTextFiles = [];
    this.originPkgFiles.clear();
  }

  /** @alpha */
  addStrategy(config) {
    this.configs.push(config);
    return;
  }

  /** @internal */
  isTextFile(filePath) {
    return new Promise((resolve, reject) => {
      fs$2.open(filePath, 'r', (err, fd) => {
        if (err) {
          reject(err);
          return;
        }
        const buffer = Buffer.alloc(4); // Read the first four bytes.
        fs$2.read(fd, buffer, 0, 4, 0, err => {
          if (err) {
            reject(err);
            return;
          }

          // Judge whether it is a text file according to the magic number in the file header.
          const fileSignature = buffer.toString();
          // eslint-disable-next-line no-control-regex
          const isText = /^\s*(?:\uFEFF)?[\x09\x0A\x0D\x20-\x7E]+$/.test(fileSignature);
          fs$2.close(fd, err => {
            if (err) {
              reject(err);
              return;
            }
            resolve(isText);
          });
        });
      });
    });
  }

  /** @internal */
  async isRegularFile(path, callback) {
    try {
      const stats = await fs$2.promises.stat(path);
      callback(null, stats.isFile());
    } catch (e) {
      callback(e);
    }
  }

  /** @internal */
  loadSrcPackageIntoAdmZipObj() {
    if (fs$2.existsSync(this.srcPath)) {
      this.zip.addLocalFolder(this.srcPath);
    } else {
      console.warn(`Path ${this.srcPath} does not exist.`);
    }
    if (this.effectPkgBuffer) {
      for (const [file, contents] of this.effectPkgBuffer.fileContents) {
        const zipFileName = file.replace(/\\/g, '/');
        const buf = Buffer.from(contents);
        this.zip.addFile(zipFileName, buf);
      }
    }
    console.log('end loadSrcPackageIntoAdmZipObj');
  }

  /** @internal */
  getAllFilePaths(directoryPath) {
    const files = fs$2.readdirSync(directoryPath, {
      withFileTypes: true
    });
    let allFilePaths = [];
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      if (file.isDirectory()) {
        allFilePaths = allFilePaths.concat(this.getAllFilePaths(filePath));
      } else {
        allFilePaths.push(filePath);
      }
    }
    return allFilePaths;
  }

  /** @internal */
  convterToZip(outputPath) {
    // todo: convter2bin
    const zip = new admZip();
    if (fs$2.existsSync(this.srcPath)) {
      zip.addLocalFolder(outputPath);
    } else {
      console.warn(`Path ${this.srcPath} does not exist.`);
    }
    try {
      zip.writeZip(outputPath + '.zip');
      console.log('zip files to ' + outputPath + '.zip');
    } catch (e) {
      console.error('writeZip ' + outputPath + ' Error occurred:', e);
    }
  }

  /** @internal */
  async getAllFilesType() {
    const entries = this.zip.getEntries();
    const fileChecks = entries.map(entry => {
      const filePath = path.join(this.exportOptPath, entry.entryName);
      if (entry.entryName.endsWith('.png')) {
        this.allPngFiles.push(filePath);
      }
      return new Promise((resolve, _reject) => {
        this.isRegularFile(filePath, (err, isFile) => {
          if (err) {
            console.error('Error occurred:', err);
            resolve();
          } else if (isFile) {
            this.isTextFile(filePath).then(isText => {
              if (isText) {
                this.allTextFiles.push(filePath);
              }
              resolve();
            }).catch(error => {
              console.error('Error checking file:', error);
              resolve();
            });
          } else {
            console.log('The path is not a regular file.');
            resolve();
          }
        });
      });
    });
    return Promise.all(fileChecks);
  }

  /** @alpha */
  async parsePackageInfo() {
    if (!this.inMemory) {
      this.exportOptPath = path.join(path.dirname(this.ctx.exportPath), path.basename(this.ctx.exportPath, path.extname(this.ctx.exportPath))) + 'Opt';
      this.loadSrcPackageIntoAdmZipObj();
      for (const entry of this.zip.getEntries()) {
        this.originPkgFiles.add(entry.entryName);
      }
    }
    this.pakageInfos.inMemory = this.inMemory;
    this.pakageInfos.effectPkgBuffer = this.effectPkgBuffer;
    this.pakageInfos.zip = this.zip;
    this.pakageInfos.ctx = this.ctx;
    this.pakageInfos.zip = this.zip;
    this.pakageInfos.exportOptPath = this.exportOptPath;
    this.pakageInfos.srcPath = this.srcPath;
    console.log('end parsePackageInfo');
  }

  /** @alpha */
  applyOptimize() {
    if (this.configs.length === 0) {
      return [];
    }
    console.log('start applyOptimize');
    this.parsePackageInfo();
    const strategies = [];
    // processed on admZip
    for (const config of this.configs) {
      if (config.apply) {
        const strategy = new this.strategiesRegistry[config.name](config, this.pakageInfos);
        strategy.analyze();
        strategy.apply();
        strategies.push(strategy);
      }
    }
    return strategies;
  }
  zipPackage() {
    let existOpt = false;
    for (const strategy of this.configedStrategies) {
      if (strategy.applied) {
        existOpt = true;
        console.info('applied ' + strategy.getStrategyConfig().name);
      }
    }
    if (existOpt) {
      this.convterToZip(this.exportOptPath);
    } else {
      GlobalFS.removeSync(this.exportOptPath + '.zip');
      console.info('no optimize applied!');
    }
    GlobalFS.removeSync(this.exportOptPath);
  }
}

class PluginInstance {
  initPlugin(settings) {
    EditorFramework.EffectExport.registerExportHandler(OptimizerExportHandler);
  }
  deinitPlugin() {
    EditorFramework.EffectExport.deregisterExportHandler(OptimizerExportHandler);
  }
}

module.exports = PluginInstance;
//# sourceMappingURL=index.js.map
