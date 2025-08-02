"use strict";

define(["/utils/io_plugin.js"], function (IOPlugin) {
  return class RegistryUtils {

    static async getLocalMachineKey(keyPath, KeyName) {
      return RegistryUtils.getRegistryKey("LocalMachine" ,keyPath, KeyName);
    }

    static async getCurrentUserKey(keyPath, KeyName) {
      return RegistryUtils.getRegistryKey("CurrentUser" ,keyPath, KeyName);
    }

    static async getClassesRootKey(keyPath, KeyName) {
      return RegistryUtils.getRegistryKey("ClassesRoot" ,keyPath, KeyName);
    }

    static async getUsersKey(keyPath, KeyName) {
      return RegistryUtils.getRegistryKey("users" ,keyPath, KeyName);
    }

    static async getRegistryKey(namespace ,keyPath, KeyName) {
      return new Promise((resolve, reject) => {
        IOPlugin.get().RegistryGetKeyValue(namespace,
                                           keyPath,
                                           KeyName,
                                           (status, data) => {

          if (!status) {
            return reject(data);
          }

          return resolve(data);
        });
      });
    }
  };
});