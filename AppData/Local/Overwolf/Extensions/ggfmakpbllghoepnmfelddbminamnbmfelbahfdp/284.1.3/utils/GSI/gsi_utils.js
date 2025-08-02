const MAX_FILE_WRITE_RETRIES = 3;

define({
  configuration: {
    max_port_retries: 10,
    max_file_write_retries: 3
  },
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  getGamePorts: function() {
    try {
      let gsiString = localStorage.getItem("gsi_ports");
      if (gsiString) {
        return JSON.parse(gsiString);
      }
    } catch {}
    return {};
  },
  setGamePort: function(gameId, port) {
    try {
      let gsiPorts = this.getGamePorts();
      gsiPorts[gameId] = port;
      localStorage.setItem("gsi_ports", JSON.stringify(gsiPorts));
    } catch {}
  },
  comparers: {
    greater: function(a, b) {
      if (a != null && b != null){
        return a > b;
      }
      else {
        return false;
      }
    },
    less: function(a, b) {
      if (a != null && b != null && !_.isUndefined(a) && !_.isUndefined(b)) {
        return a < b;
      }
    },
    lessOrRemoved: function(a, b) {
      if (a == null && b != null && !_.isUndefined(b)) {
        return true;
      }

        if (a != null && b != null && !_.isUndefined(a) && !_.isUndefined(b)) {
        return a < b;
      }
    },
    equals: function(a, b) {
      return a === b;
    },
    notEquals: function(a, b) {
      return a !== b;
    },
    fromTo: function(a, b, to, from) {
      if (from == null) {
        from = b;
      }
      if (to == null) {
        to = a;
      }

      return (a != b && a == to && b == from);
    },
    any: function(a, b) {
      if (a != null && b != null && !_.isUndefined(a) && !_.isUndefined(b)) {
        return a != b;
      }

        return false;
    }
  },

  fileExists : async function (filePath) {
    await new Promise(resolve => {
      overwolf.io.fileExists(filePath, async function (fileInfo) {
        resolve(fileInfo.found);
      })
    });
  },
  writeFileIfNeeded: async function (filePath, fileContents, port) {
    overwolf.io.fileExists(filePath, async function (fileInfo) {
      if (!fileInfo.found) {
        console.log(`couldn't find GSI config file at ${filePath}, writing it for next session`);
      } else { 
        let isSamePort = await new Promise(resolve => {
          overwolf.io.readFileContents(filePath, overwolf.io.enums.eEncoding.UTF8, read => {
            if (!read.success) {
              resolve(false);
              return;
            }

            resolve(read.content.includes(`:${port}"`));
          });
        });

        if (isSamePort) {
          console.log('file exists with currently used port, not writing');
          return;
        }

        console.log(`using new port ${port}, writing new GSI config file`);
      }

      _writeFile(filePath, fileContents, 0);
    });
  }
});

function _writeFile(path, content, retries, callback) {
  if (retries > MAX_FILE_WRITE_RETRIES) {
    return;
  }

  try {
    overwolf.io.writeFileContents(path, content, overwolf.io.enums.eEncoding.UTF8, true, function (writeFileInfo) {
      if (writeFileInfo.success) {
        console.log(`File successfully written to ${path}`);
      } else {
        console.log(`Failed to write file to ${path} | reason: ${writeFileInfo.reason}`);
      }
    });
  } catch (e) {
    console.log(`Got exception while trying to write file to ${path} | ${e.message}`);
    setTimeout(function() {
      retries++;
      _writeFile(path, content, retries, callback);
    }, 1000);
  }
}