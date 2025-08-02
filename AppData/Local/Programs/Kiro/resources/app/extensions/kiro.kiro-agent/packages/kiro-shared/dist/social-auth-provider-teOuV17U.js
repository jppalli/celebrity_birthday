var L = Object.defineProperty;
var b = (s) => {
  throw TypeError(s);
};
var N = (s, e, t) => e in s ? L(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => N(s, typeof e != "symbol" ? e + "" : e, t), E = (s, e, t) => e.has(s) || b("Cannot " + t);
var y = (s, e, t) => (E(s, e, "read from private field"), t ? t.call(s) : e.get(s)), U = (s, e, t) => e.has(s) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), _ = (s, e, t, r) => (E(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
import * as P from "vscode";
import * as $ from "os";
import * as f from "fs";
import * as D from "path";
import g from "crypto";
import { U as w, a as z, b as H, M as O, c as j, d as q, e as B, f as J, I as V, C as W, g as G, S as C, h as K, F as I, A as Y } from "./sso-oidc-client-DhEmVcnM.js";
import { l as u, T as Q } from "./errors-ExctlPQy.js";
import "node-machine-id";
import { f as l } from "./initialize-C-lPoOET.js";
import { w as d } from "./span-B4KfrtSO.js";
import "@opentelemetry/api";
import X from "http";
var S;
const v = class v {
  constructor(e) {
    c(this, "baseUrl", "http://127.0.0.1");
    c(this, "oauthCallback", "/oauth/callback");
    c(this, "authenticationFlowTimeoutInMs", 6e5);
    c(this, "authenticationWarningTimeoutInMs", 6e4);
    c(this, "listenTimeoutMs", 1e4);
    c(this, "authenticationPromise");
    c(this, "deferred");
    c(this, "server");
    c(this, "connections");
    c(this, "_closed", !1);
    this.state = e, this.authenticationPromise = new Promise((t, r) => {
      this.deferred = { resolve: t, reject: r };
    }), this.connections = [], this.server = X.createServer((t, r) => {
      if (r.setHeader("Access-Control-Allow-Methods", "GET"), !t.url)
        return;
      const i = new URL(t.url, this.baseUrl);
      switch (i.pathname) {
        case this.oauthCallback: {
          this.handleAuthentication(i.searchParams, r);
          break;
        }
        default:
          u.error("Failed to close already existing auth server in AuthSSOServer.init(): %s");
      }
    }), this.server.on("connection", (t) => {
      this.connections.push(t);
    });
  }
  /** Gets the last initialized instance */
  static get lastInstance() {
    return y(v, S);
  }
  /**
   * Initializes a new AuthSSOServer
   * @param state - The state parameter for validation
   */
  static init(e = "") {
    return d(l.Auth, "auth-server.init", async () => {
      const t = y(v, S);
      if (t !== void 0 && !t.closed)
        try {
          await t.close();
        } catch (i) {
          u.error("Failed to close already existing auth server in AuthSSOServer.init(): %s", i);
        }
      u.debug("AuthSSOServer: Initialized new auth server.");
      const r = new v(e);
      return _(v, S, r), r;
    });
  }
  /** Starts the server */
  start(e) {
    return d(l.Auth, "auth-server.start", async (t) => {
      let r = 0;
      if (this.server.listening)
        throw new w("AuthSSOServer: Server already started");
      return new Promise((i, a) => {
        this.server.on("close", () => {
          a(new w("AuthSSOServer: Server has closed"));
        }), this.server.on("error", (o) => {
          e && e.length > r + 1 ? this.listen(e[++r]) : a(new z(o.message, e));
        });
        const n = setTimeout(() => {
          this.server.listening || (this.close(), a(new H()));
        }, this.listenTimeoutMs);
        this.server.on("listening", () => {
          clearTimeout(n), this.server.address() || a(new O()), t.setAttribute("redirectUri", this.redirectUri), i();
        }), this.listen((e == null ? void 0 : e[0]) || 0);
      });
    });
  }
  listen(e) {
    this.server.listen(e, "127.0.0.1");
  }
  /** Closes the server */
  close() {
    return d(l.Auth, "auth-server.close", async (e) => {
      try {
        e.setAttribute("redirectUri", this.redirectUri);
      } catch {
        e.setAttribute("redirectUri", "");
      }
      return new Promise((t, r) => {
        if (this._closed) {
          t();
          return;
        }
        this.server.listening || r(new w("AuthSSOServer: Server not started")), u.debug("AuthSSOServer: Attempting to close server.");
        for (const i of this.connections)
          i.destroy();
        this.server.close((i) => {
          i && r(i), this._closed = !0, u.debug("AuthSSOServer: Server closed successfully."), t();
        });
      });
    });
  }
  /** Gets the redirect URI */
  get redirectUri() {
    return `${this.baseLocation}${this.oauthCallback}`;
  }
  get baseLocation() {
    return `${this.baseUrl}:${this.getPort()}`;
  }
  /** Gets whether the server is closed */
  get closed() {
    return this._closed;
  }
  /** Gets the server address */
  getAddress() {
    return this.server.address();
  }
  getPort() {
    const e = this.getAddress();
    if (e instanceof Object)
      return e.port;
    if (typeof e == "string")
      return Number.parseInt(e);
    throw new O();
  }
  // TODO: Redirect to a nicer page later with proper UI feedback
  redirect(e, t) {
    e.writeHead(200, { "Content-Type": "text/html" });
    let r = "You can close this window";
    t && (r += `<br>Error: ${t}`), e.write(r), e.end();
  }
  handleAuthentication(e, t) {
    var n;
    const r = e.get("error"), i = e.get("error_description");
    if (r && i) {
      r === "access_denied" ? this.handleRequestRejection(t, new j()) : this.handleRequestRejection(t, new q(`${r}: ${i}`));
      return;
    }
    const a = e.get("code");
    if (!a) {
      this.handleRequestRejection(t, new B());
      return;
    }
    if (this.state) {
      const o = e.get("state");
      if (!o) {
        this.handleRequestRejection(t, new J());
        return;
      }
      if (o !== this.state) {
        this.handleRequestRejection(t, new V());
        return;
      }
    }
    (n = this.deferred) == null || n.resolve(a), this.redirect(t);
  }
  handleRequestRejection(e, t) {
    var r;
    this.redirect(e, t.message), (r = this.deferred) == null || r.reject(t);
  }
  /** Cancels the current authentication flow */
  cancelCurrentFlow() {
    var e;
    u.debug("AuthSSOServer: Canceling current login flow"), (e = this.deferred) == null || e.reject(new W("user cancellation"));
  }
  /** Waits for authorization to complete */
  async waitForAuthorization() {
    const e = setTimeout(() => {
      u.warn("AuthSSOServer: Authentication is taking a long time");
    }, this.authenticationWarningTimeoutInMs), t = await Promise.race([
      this.authenticationPromise,
      new Promise((r, i) => {
        setTimeout(() => {
          i(new G());
        }, this.authenticationFlowTimeoutInMs);
      })
    ]);
    return clearTimeout(e), t;
  }
};
S = new WeakMap(), // Last initialized instance of the Auth Server
U(v, S);
let m = v;
const Z = 15 * 60, ee = "https://view.awsapps.com/start", te = "https://amzn.awsapps.com/start";
class re {
  constructor() {
    c(this, "cacheDirectory", D.join($.homedir(), ".aws", "sso", "cache"));
  }
  getClientRegistrationPath(e) {
    return D.join(this.cacheDirectory, `${e}.json`);
  }
  ensureCacheDirectory() {
    try {
      f.existsSync(this.cacheDirectory) || f.mkdirSync(this.cacheDirectory, { recursive: !0 });
    } catch {
      throw new I(this.cacheDirectory);
    }
  }
  /**
   * Writes client registration to cache
   */
  writeClientRegistration(e, t) {
    this.ensureCacheDirectory();
    const r = this.getClientRegistrationPath(e);
    try {
      f.writeFileSync(r, JSON.stringify(t, void 0, 2));
    } catch {
      throw new I(r);
    }
  }
  /**
   * Reads the currently cached client registration
   */
  readClientRegistration(e) {
    const t = this.getClientRegistrationPath(e);
    if (f.existsSync(t))
      try {
        const r = f.readFileSync(t, "utf8");
        try {
          return JSON.parse(r);
        } catch {
          return;
        }
      } catch {
        throw new I(t);
      }
  }
}
class ve {
  constructor() {
    c(this, "storage");
    c(this, "scopes", [
      "codewhisperer:completions",
      "codewhisperer:analysis",
      "codewhisperer:conversations",
      "codewhisperer:transformations",
      "codewhisperer:taskassist"
    ]);
    c(this, "authServer");
    this.storage = new re();
  }
  getClientIdHash(e) {
    return g.createHash("sha1").update(JSON.stringify({ startUrl: e })).digest("hex");
  }
  tokenResponseToToken(e, t, r, i) {
    const a = /* @__PURE__ */ new Date(), n = new Date(a.getTime() + Number(e.expiresIn) * 1e3);
    return {
      accessToken: e.accessToken,
      refreshToken: e.refreshToken,
      expiresAt: n.toISOString(),
      clientIdHash: t,
      authMethod: "IdC",
      provider: r,
      region: i
    };
  }
  isClientRegistrationExpired(e) {
    if (!e.expiresAt)
      return !0;
    const t = new Date(e.expiresAt), r = /* @__PURE__ */ new Date();
    return t.valueOf() < r.valueOf() + Z * 1e3;
  }
  async registerClient(e, t, r = !1) {
    return d(l.Auth, "idc-provider.register", async () => {
      const i = this.getClientIdHash(e), a = this.storage.readClientRegistration(i), n = new C(t);
      if (a && !this.isClientRegistrationExpired(a))
        return a;
      const o = await n.registerClient(
        {
          clientName: "Kiro IDE",
          clientType: "public",
          scopes: this.scopes,
          grantTypes: ["authorization_code", "refresh_token"],
          redirectUris: ["http://127.0.0.1/oauth/callback"],
          issuerUrl: e
        },
        r
      ), h = {
        clientId: o.clientId,
        clientSecret: o.clientSecret,
        expiresAt: new Date(o.clientSecretExpiresAt * 1e3).toISOString()
      };
      return this.storage.writeClientRegistration(i, h), h;
    });
  }
  getStartUrl(e) {
    return e.provider === "Enterprise" ? e.startUrl : e.provider === "BuilderId" ? ee : te;
  }
  /**
   * Authenticates via IDC method using browser-based OAuth flow using start url
   * @returns Promise that resolves to the token data when authentication is complete
   */
  async authenticate(e) {
    return d(l.Auth, "idc-provider.authenticate", async (t) => {
      if (t.setAttribute("authProvider", e.provider), e.authMethod !== "IdC")
        throw new w("IdC auth: invalid auth method");
      const r = this.getStartUrl(e), i = e.region || "us-east-1", a = new C(i), n = await this.registerClient(r, i, e.provider === "Enterprise"), o = g.randomUUID();
      this.authServer = await m.init(o);
      try {
        await this.authServer.start();
      } catch (T) {
        const R = new Q(
          `Failed to start authentication server. This is likely due to network or firewall restrictions preventing the local server from starting. ${T instanceof Error ? T.message : String(T)}`
        );
        throw u.error("AuthServer start failed:", R), R;
      }
      const h = g.randomBytes(32).toString("base64url"), A = g.createHash("sha256").update(h).digest().toString("base64url"), p = this.authServer.redirectUri, x = new URLSearchParams({
        response_type: "code",
        client_id: n.clientId,
        redirect_uri: p,
        scopes: this.scopes.join(","),
        state: o,
        code_challenge: A,
        code_challenge_method: "S256"
      }), F = `https://oidc.${i}.amazonaws.com/authorize?${x.toString()}`;
      await P.env.openExternal(P.Uri.parse(F));
      let k;
      try {
        k = await this.authServer.waitForAuthorization();
      } finally {
        this.authServer = void 0;
      }
      const M = await a.createToken({
        clientId: n.clientId,
        clientSecret: n.clientSecret,
        grantType: "authorization_code",
        redirectUri: p,
        code: k,
        codeVerifier: h
      });
      return this.tokenResponseToToken(M, this.getClientIdHash(r), e.provider, i);
    });
  }
  /**
   * Cancels a currently ongoing sign-in flow
   */
  cancelAuth() {
    this.authServer && this.authServer.cancelCurrentFlow();
  }
  /**
   * Refreshes token granted through IDC auth
   * @returns Promise that resolves to the refreshed token data
   */
  async refreshToken(e) {
    return d(l.Auth, "idc-provider.refreshToken", async (t) => {
      if (t.setAttribute("authProvider", e.provider), e.authMethod !== "IdC")
        throw new w("IdC auth: invalid auth method");
      const { refreshToken: r, clientIdHash: i, provider: a, region: n } = e;
      try {
        const o = this.storage.readClientRegistration(i), h = n || "us-east-1", A = new C(h);
        if (!o || this.isClientRegistrationExpired(o))
          throw new K("IdC auth: No valid client registration found");
        const p = await A.createToken({
          clientId: o.clientId,
          clientSecret: o.clientSecret,
          refreshToken: r,
          grantType: "refresh_token"
        });
        return this.tokenResponseToToken(p, i, a, h);
      } catch (o) {
        throw u.error("Error refreshing token:", o), o;
      }
    });
  }
  /**
   * Logs the user out of a session generated through IDC auth
   * @returns Promise that resolves when logout was complete
   */
  logout(e) {
    return Promise.resolve();
  }
  /**
   * Deletes the user account for IDC auth provider.
   * @param _token - The token cache data (unused for IDC)
   * @throws {Error} Always throws as account deletion is not supported for enterprise auth
   */
  deleteAccount(e) {
    throw new Error("Account deletion not supported for enterprise auth");
  }
}
const ie = [49153, 50153, 51153, 52153, 53153, 4649, 6588, 9091, 8008, 3128];
class ge {
  constructor() {
    c(this, "authServiceClient");
    c(this, "authServer");
    this.authServiceClient = new Y();
  }
  tokenResponseToToken(e, t) {
    const r = /* @__PURE__ */ new Date(), i = new Date(r.getTime() + Number(e.expiresIn) * 1e3);
    return {
      accessToken: e.accessToken,
      refreshToken: e.refreshToken,
      profileArn: e.profileArn,
      expiresAt: i.toISOString(),
      authMethod: "social",
      provider: t
    };
  }
  /**
   * Authenticates via social auth.
   * @returns Promise that resolves to the token data when authentication is complete
   */
  async authenticate(e) {
    return d(l.Auth, "social-provider.authenticate", async (t) => {
      if (t.setAttribute("authProvider", e.provider), e.authMethod !== "social")
        throw new w("Social auth: invalid auth method");
      const r = g.randomUUID();
      this.authServer = await m.init(r), await this.authServer.start(ie);
      const i = g.randomBytes(32).toString("base64url"), a = g.createHash("sha256").update(i).digest().toString("base64url"), n = this.authServer.redirectUri.replace("127.0.0.1", "localhost");
      await this.authServiceClient.login({ provider: e.provider, redirectUri: n, codeChallenge: a, state: r });
      let o;
      try {
        o = await this.authServer.waitForAuthorization();
      } finally {
        this.authServer = void 0;
      }
      const h = await this.authServiceClient.createToken({ code: o, codeVerifier: i, redirectUri: n });
      return this.tokenResponseToToken(h, e.provider);
    });
  }
  /**
   * Cancels a currently ongoing sign-in flow
   */
  cancelAuth() {
    this.authServer && this.authServer.cancelCurrentFlow();
  }
  /**
   * Refreshes token granted through social auth
   * @returns Promise that resolves to the refreshed token data
   */
  async refreshToken(e) {
    return d(l.Auth, "social-provider.refreshToken", async (t) => {
      if (t.setAttribute("authProvider", e.provider), e.authMethod !== "social")
        throw new w("Social auth: invalid auth method");
      const { refreshToken: r, profileArn: i, provider: a } = e;
      try {
        const n = await this.authServiceClient.refreshToken({ refreshToken: r });
        return n.profileArn = i, this.tokenResponseToToken(n, a);
      } catch (n) {
        throw u.error("Error refreshing token:", n), n;
      }
    });
  }
  /**
   * Logs the user out of a session generated through social auth
   * @returns Promise that resolves when logout was complete
   */
  async logout(e) {
    return d(l.Auth, "social-provider.logout", async (t) => {
      if (t.setAttribute("authProvider", e.provider), !!e.refreshToken)
        return this.authServiceClient.logout({ refreshToken: e.refreshToken });
    });
  }
  /**
   * Deletes the user account using the social auth provider.
   * @param token - The token cache data containing access token
   */
  async deleteAccount(e) {
    return d(l.Auth, "social-provider.deleteAccount", async (t) => (t.setAttribute("authProvider", e.provider), this.authServiceClient.deleteAccount(e.accessToken)));
  }
}
export {
  re as C,
  ve as I,
  ge as S
};
