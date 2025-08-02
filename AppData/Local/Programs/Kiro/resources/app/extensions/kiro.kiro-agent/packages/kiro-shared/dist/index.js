var F = Object.defineProperty;
var b = (s, e, r) => e in s ? F(s, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[e] = r;
var o = (s, e, r) => b(s, typeof e != "symbol" ? e + "" : e, r);
import { F as k, i as E, j as m, k as S, l as v, m as D, C as M, g as L, n as _, o as x, p as N, h as O, N as U, U as W, q as R, r as H } from "./sso-oidc-client-DhEmVcnM.js";
import { s as Te, c as Ie, d as Ee, v as Ae, u as Se, I as ye, e as Ce, M as Pe, f as De, t as Me, a as Le, b as _e } from "./sso-oidc-client-DhEmVcnM.js";
import * as i from "vscode";
import { l as h } from "./errors-ExctlPQy.js";
import { T as Fe, i as be, a as xe, m as Ne } from "./errors-ExctlPQy.js";
import * as y from "path";
import * as J from "os";
import * as c from "fs";
import "node-machine-id";
import { S as K, I as q } from "./social-auth-provider-teOuV17U.js";
import { j as B, f, r as d, a as G } from "./initialize-C-lPoOET.js";
import { A as Ue, c as We, C as He, F as Je, J as Ke, M as qe, h as Be, g as Ge, T as $e, b as je, d as ze, e as Ve, i as Ye } from "./initialize-C-lPoOET.js";
import { w as T } from "./span-B4KfrtSO.js";
import { s as Qe } from "./span-B4KfrtSO.js";
import "@opentelemetry/api";
import { exec as $ } from "child_process";
import { promisify as j } from "util";
import { c as er, a as rr, b as tr, M as sr, d as or, e as ir, f as nr, l as ar } from "./config-wUWJCJ1D.js";
import { J as cr, M as dr, c as ur, a as gr, g as lr } from "./journey-tracker-DpeeI8gI.js";
import { b as wr, g as pr, a as kr } from "./paths-CA0scYz8.js";
import { b as vr, a as Tr, g as Ir, u as Er } from "./machine-id-CWj3Yrwr.js";
const z = "kiro-auth-token.json";
class V {
  constructor() {
    o(this, "tokenCache");
    o(this, "cacheDirectory", y.join(J.homedir(), ".aws", "sso", "cache"));
    o(this, "_onDidChange", new i.EventEmitter());
    o(this, "watchListener");
    this.watchListener = () => {
      this.clearCache(), this._onDidChange.fire();
    }, c.watchFile(this.getAuthTokenPath(), this.watchListener);
  }
  /**
   * Cleans up internal state
   */
  dispose() {
    c.unwatchFile(this.getAuthTokenPath(), this.watchListener);
  }
  /**
   * Event that triggers where there is a change in login status
   */
  get onDidChange() {
    return this._onDidChange.event;
  }
  readTokenFromLocalCache() {
    return this.tokenCache;
  }
  getAuthTokenPath() {
    return y.join(this.cacheDirectory, z);
  }
  ensureCacheDirectory() {
    try {
      c.existsSync(this.cacheDirectory) || c.mkdirSync(this.cacheDirectory, { recursive: !0 });
    } catch {
      throw new k(this.cacheDirectory);
    }
  }
  writeTokenToLocalCache(e) {
    this.tokenCache = e;
  }
  writeTokenToDisk(e) {
    this.ensureCacheDirectory();
    const r = this.getAuthTokenPath();
    try {
      c.writeFileSync(r, JSON.stringify(e, void 0, 2));
    } catch {
      throw new k(r);
    }
  }
  clearCache() {
    this.tokenCache = void 0;
  }
  readTokenFromDisk() {
    const e = this.getAuthTokenPath();
    if (c.existsSync(e))
      try {
        const r = c.readFileSync(e, "utf8");
        try {
          return JSON.parse(r);
        } catch (t) {
          h.error("Error trying to parse the token file.", t);
          return;
        }
      } catch {
        throw new k(e);
      }
  }
  /**
   * Retrieves the currently cached auth token
   */
  readToken() {
    const e = this.readTokenFromLocalCache();
    if (e)
      return e;
    const r = this.readTokenFromDisk();
    if (r)
      return this.writeTokenToLocalCache(r), r;
  }
  /**
   * Writes an auth token to cache
   */
  writeToken(e) {
    this.writeTokenToDisk(e), this.clearCache(), this._onDidChange.fire();
  }
  /**
   * Deletes cached auth token
   */
  clearToken() {
    this.clearCache(), c.unlinkSync(this.getAuthTokenPath()), this._onDidChange.fire();
  }
}
const C = 3 * 60, Y = 10 * 60, X = 60, g = new B(f.Auth, "auth-provider"), Q = (s) => s instanceof D ? {
  blocked: 1
} : s instanceof M ? {
  abort: 1
} : s instanceof L ? {
  abandon: 1
} : s instanceof _ ? {
  badInput: 1
} : s instanceof H ? {
  environmentIssue: 1
} : E(s) ? {
  unauthorized: 1
} : {
  failure: 1
};
function I(s) {
  return s instanceof R ? s : new W("Auth provider: unexpected issue");
}
function Z(s) {
  return s.toString() || "unknown";
}
function l(s, e) {
  return {
    traceName: `${Z(e)}.${s}`,
    errorMapper: Q,
    metricAliases: [s]
  };
}
class ee {
  constructor() {
    o(this, "storage");
    o(this, "signInDeferred");
    o(this, "signInPromise");
    o(this, "providers");
    o(this, "authErrorMessagePromises", {
      AccessDenied: null,
      NetworkIssue: null,
      Unknown: null
    });
    o(this, "refreshSettled", Promise.resolve());
    o(this, "refreshLoopTimeout");
    o(this, "_onDidChangeLoginStatus", new i.EventEmitter());
    o(this, "_onDidPerformUserInitiatedLogout", new i.EventEmitter());
    o(this, "disposables", []);
    this.storage = new V(), this.providers = {
      IdC: new q(),
      social: new K()
    }, i.window.state.focused && this.startRefreshLoop(), this.disposables.push(
      this.storage,
      {
        dispose: () => {
          this.stopRefreshLoop();
        }
      },
      this.storage.onDidChange(() => {
        this.handleTokenChanges();
      }),
      i.window.onDidChangeWindowState((e) => {
        e.focused ? this.startRefreshLoop() : this.stopRefreshLoop();
      })
    );
  }
  /**
   * Event that triggers where there is a change in login status
   */
  get onDidChangeLoginStatus() {
    return this._onDidChangeLoginStatus.event;
  }
  /**
   * Event that triggers when user initiates a logout
   * We treat this separately from other changes to the login status because a user initiated logout
   * will result in the sign-in page to be rendered again.
   */
  get onDidPerformUserInitiatedLogout() {
    return this._onDidPerformUserInitiatedLogout.event;
  }
  /**
   * Cleans up internal state
   */
  dispose() {
    this.disposables.forEach((e) => {
      e.dispose();
    });
  }
  stopRefreshLoop() {
    this.refreshLoopTimeout && clearInterval(this.refreshLoopTimeout);
  }
  startRefreshLoop() {
    this.stopRefreshLoop(), this.refreshSettled = this.attemptRefreshIfCloseToExpiry(), this.refreshLoopTimeout = setInterval(() => {
      this.refreshSettled = this.attemptRefreshIfCloseToExpiry();
    }, X * 1e3);
  }
  /**
   * Handles changes of the token inside the storage
   * This ensures that changes made to the file system reflect correctly on the UI
   * More importantly, it ensures that an action performed in one IDE window reflect
   * correctly in all other open IDE windows.
   */
  handleTokenChanges() {
    if (this.isLoggedIn()) {
      const e = this.storage.readToken();
      this.signInDeferred && this.signInDeferred.resolve(e), this._onDidChangeLoginStatus.fire({
        isSignedIn: !0,
        token: e
      });
    } else
      this._onDidChangeLoginStatus.fire({
        isSignedIn: !1,
        token: void 0
      });
  }
  async attemptRefreshIfCloseToExpiry() {
    try {
      const e = this.storage.readToken();
      if (!e || !e.expiresAt || !e.accessToken)
        return;
      this.isAuthTokenExpiredWithinSeconds(e, Y) && await T(f.Auth, "auth-provider.scheduled-refresh", () => this.refreshToken());
    } catch (e) {
      const r = this.storage.readToken();
      E(e) && r && this.isAuthTokenExpiredWithinSeconds(r, C) && this.logoutAndForget();
    }
  }
  isAuthTokenExpiredWithinSeconds(e, r) {
    if (!e.expiresAt || !e.accessToken)
      return !0;
    const t = new Date(e.expiresAt), n = /* @__PURE__ */ new Date();
    return t.valueOf() < n.valueOf() + r * 1e3;
  }
  isAuthTokenExpired(e) {
    return this.isAuthTokenExpiredWithinSeconds(e, C);
  }
  /**
   * Returns the current auth token if authenticated
   * @returns Promise that resolves to the token (string)
   */
  async getToken() {
    return (await this.getTokenData()).accessToken;
  }
  /**
   * Returns the current auth token if authenticated
   * @returns The token read from cache / disk
   */
  readToken() {
    return this.storage.readToken();
  }
  /**
   * Returns the current profileArn if authenticated
   * @returns Promise that resolves to the profileArn (string)
   */
  async getProfileArn() {
    const e = await this.getTokenData();
    return "profileArn" in e ? e.profileArn : void 0;
  }
  /**
   * Returns the current auth token by trying various methods to read or re-generate it
   * (including attempting to refresh the token if expired)
   * @returns Promise that resolves to the token (LocalTokenCacheData)
   */
  async getTokenData({ attemptRefresh: e } = { attemptRefresh: !0 }) {
    await this.refreshSettled;
    try {
      const r = this.storage.readToken();
      if (!r)
        throw new m("No valid token found");
      if (!this.isAuthTokenExpired(r))
        return r;
      if (r.refreshToken && e)
        return await T(f.Auth, "auth-provider.getTokenData", async () => (await this.refreshToken(), await this.getTokenData({ attemptRefresh: !1 })));
      throw new S("No valid token found");
    } catch (r) {
      throw E(r) && this.logoutAndForget(), h.error("Failed to retrieve auth token:", r), I(r);
    }
  }
  /**
   * Whether the user is currently considered to be logged in
   */
  isLoggedIn() {
    const e = this.storage.readToken();
    return !!(e != null && e.refreshToken);
  }
  /**
   * Logs the user out of the session
   * @returns Promise that resolves when logout is complete
   */
  async logout() {
    if (!this.isLoggedIn())
      return;
    const e = this.storage.readToken();
    if (e)
      return g.withTrace(l("logout", e.provider), async (r) => {
        r.setAttribute("authProvider", e.provider);
        const t = this.providers[e.authMethod];
        this.storage.clearToken();
        try {
          await t.logout(e);
        } catch (n) {
          throw h.error("Failed to logout:", n), I(n);
        }
      });
  }
  async logoutAndForget() {
    try {
      await this.logout();
    } catch {
    }
  }
  /**
   * Deletes the user account
   * @returns Promise that resolves when account deletion is complete
   */
  async deleteAccount() {
    if (!this.isLoggedIn())
      throw new v("Not logged in");
    const e = this.storage.readToken();
    if (!e)
      throw new m("No token available");
    return g.withTrace(l("deleteAccount", e.provider), async (r) => {
      r.setAttribute("authProvider", e.provider);
      const t = this.providers[e.authMethod];
      try {
        await t.deleteAccount(e), this.storage.clearToken(), this._onDidPerformUserInitiatedLogout.fire();
      } catch (n) {
        throw h.error("Failed to delete account:", n), I(n);
      }
    });
  }
  /**
   * Attempts to refresh the auth token
   * @returns Promise that resolves when token refresh is complete
   */
  async refreshToken() {
    const e = this.storage.readToken();
    if (!(e != null && e.refreshToken))
      throw new v("No valid refresh token found");
    return g.withTrace(l("refreshToken", e.provider), async (r) => {
      var t;
      r.setAttribute("authProvider", e.provider);
      try {
        const p = await this.providers[e.authMethod].refreshToken(e);
        ((t = this.storage.readToken()) == null ? void 0 : t.refreshToken) === e.refreshToken && this.storage.writeToken(p);
      } catch (n) {
        throw h.error("Failed to refresh token:", n), n;
      }
    });
  }
  async openInternalLink(e) {
    const r = await i.env.asExternalUri(
      i.Uri.parse(`${i.env.uriScheme}://kiro.kiroAgent${e}`)
    );
    await i.env.openExternal(r);
  }
  /**
   * Authenticates the user with any of the available login options: social (Google, Github),
   * builderId, enterprise or internal login
   */
  async authenticateWithOptions(e) {
    return d("started-login"), g.withTrace(l("authenticate", e.provider), async (r) => {
      r.setAttribute("authProvider", e.provider), this.isLoggedIn() && await this.logout();
      try {
        const n = await this.providers[e.authMethod].authenticate(e);
        this.storage.writeToken(n), await this.openInternalLink("/did-authenticate"), d("finished-login"), G(e);
      } catch (t) {
        throw t instanceof D ? h.info("Sign-in temporarily not allowed") : t instanceof M ? (h.info("Authentication canceled"), d("canceled-login")) : t instanceof L ? (h.info("Authentication timed out"), d("abandoned-login")) : t instanceof _ ? (h.error("Authentication failed due to bad user input:", t), d("bad-user-input")) : (h.error("Authentication failed:", t), d("failed-login"), i.window.showErrorMessage("Failed to authenticate with Kiro.")), await this.logout(), t;
      }
    });
  }
  /**
   * Cancels any current ongoing sign-in flow
   */
  cancelSignIn() {
    this.providers.IdC.cancelAuth(), this.providers.social.cancelAuth();
  }
  /**
   * Consumers of the auth provider should call this method when a token issued through this provider
   * was rejected by the invoked service.
   */
  async handleAuthError(e) {
    return e instanceof x || e instanceof m || e instanceof S || e instanceof v || e instanceof N || e instanceof O ? this.showInvalidSessionErrorMessage() : e instanceof U ? this.showNetworkIssueErrorMessage() : this.showUnknownIssueErrorMessage();
  }
  async showInvalidSessionErrorMessage() {
    return T(f.Auth, "auth-provider.manual-error-resolve", async () => {
      if (this.authErrorMessagePromises.AccessDenied)
        return this.authErrorMessagePromises.AccessDenied;
      const e = i.window.showErrorMessage(
        "Could not complete the request because your session is invalid or expired.",
        "Refresh session",
        "Login"
      );
      this.authErrorMessagePromises.AccessDenied = e;
      let r = await e;
      if (r === "Refresh session")
        try {
          await this.refreshToken(), i.window.showInformationMessage("Your session was successfully refreshed.");
        } catch {
          this.logoutAndForget(), r = await i.window.showErrorMessage("We are unable to refresh your session.", "Login");
        }
      r === "Login" && (await this.logout(), this._onDidPerformUserInitiatedLogout.fire()), this.authErrorMessagePromises.AccessDenied = null;
    });
  }
  async showNetworkIssueErrorMessage() {
    if (this.authErrorMessagePromises.NetworkIssue)
      return this.authErrorMessagePromises.NetworkIssue;
    const e = i.window.showErrorMessage(
      "Could not communicate with the service. Please check your network connection.",
      "Dismiss"
    );
    this.authErrorMessagePromises.NetworkIssue = e, await e, this.authErrorMessagePromises.NetworkIssue = null;
  }
  async showUnknownIssueErrorMessage() {
    if (this.authErrorMessagePromises.Unknown)
      return this.authErrorMessagePromises.Unknown;
    const e = i.window.showErrorMessage("An unexpected issue occurred.", "Dismiss");
    this.authErrorMessagePromises.Unknown = e, await e, this.authErrorMessagePromises.Unknown = null;
  }
  /**
   * Returns a promise that resolves once the user is logged in
   */
  async waitForSignIn() {
    return this.isLoggedIn() ? this.storage.readToken() : (this.signInPromise || (this.signInPromise = new Promise((e) => {
      this.signInDeferred = { resolve: e };
    }).then((e) => (this.signInPromise = void 0, this.signInDeferred = void 0, e))), this.signInPromise);
  }
}
const re = j($), te = "mwinit", se = process.platform == "win32" ? "where.exe" : "which";
async function oe() {
  try {
    return await re(`${se} ${te}`), !0;
  } catch {
    return !1;
  }
}
const a = new ee(), w = "kiro", P = "There was an error signing you in. Please try again.", ie = {
  BuilderId: "BuilderId",
  Enterprise: "AWS IAM Identity Center",
  Internal: "Amazon internal (Midway)",
  Github: "GitHub",
  Google: "Google"
};
class u {
  constructor(e) {
    o(this, "account");
    o(this, "id", w);
    o(this, "scopes", []);
    o(this, "accessToken", "");
    this.account = { id: w, label: e ? ie[e] : "" };
  }
}
class A {
  constructor(e) {
    o(this, "disposables", []);
    o(this, "_onDidChangeSessions", new i.EventEmitter());
    this.controller = e, this.disposables.push(
      a.onDidChangeLoginStatus(({ token: r, isSignedIn: t }) => {
        t ? this._onDidChangeSessions.fire({
          removed: [],
          added: [new u(r.provider)],
          changed: []
        }) : this._onDidChangeSessions.fire({
          removed: [new u()],
          added: [],
          changed: []
        });
      }),
      a.onDidPerformUserInitiatedLogout(() => {
        this.controller.showSignInPage();
      })
    );
  }
  get onDidChangeSessions() {
    return this._onDidChangeSessions.event;
  }
  dispose() {
    this.disposables.forEach((e) => {
      e.dispose();
    });
  }
  async getSessions(e, r) {
    if (a.isLoggedIn()) {
      const t = a.readToken();
      return Promise.resolve([new u(t.provider)]);
    }
    return Promise.resolve([]);
  }
  async createSession(e, r) {
    if (a.isLoggedIn()) {
      const n = a.readToken();
      return new u(n.provider);
    }
    this.controller.showSignInPage();
    const t = await a.waitForSignIn();
    return new u(t.provider);
  }
  async removeSession(e) {
    a.isLoggedIn() && (await a.logout(), this.controller.showSignInPage());
  }
}
o(A, "name", "Kiro");
class ne {
  constructor() {
    o(this, "_onDidReceiveSignInRequest", new i.EventEmitter());
  }
  get onDidReceiveSignInRequest() {
    return this._onDidReceiveSignInRequest.event;
  }
  showSignInPage() {
    this._onDidReceiveSignInRequest.fire();
  }
  async signIn(e) {
    try {
      return await a.authenticateWithOptions(e);
    } catch (r) {
      throw r instanceof R ? r.toUserFacingError(P) : new Error(P);
    }
  }
  cancelSignIn() {
    a.cancelSignIn();
  }
}
async function ke(s) {
  const e = new ne(), r = new A(e), t = i.authentication.registerAuthenticationProvider(
    w,
    A.name,
    r
  ), n = await oe(), p = i.authentication.registerSignInController(w, e, {
    isInternalUser: n
  });
  s.subscriptions.push(r, t, p, a);
}
export {
  Ue as APPLICATION_NAME,
  We as APPLICATION_VERSION,
  L as AbandonedError,
  x as AccessDeniedError,
  R as AuthError,
  Te as AuthErrorType,
  ee as AuthProvider,
  Ie as AuthProviderDeniedAccess,
  Ee as AuthProviderFailure,
  M as CanceledError,
  He as ContextPropagation,
  Ae as FailedToConnectError,
  Je as Feature,
  k as FileSystemAccessError,
  v as InvalidAuthError,
  O as InvalidIdCAuthError,
  N as InvalidSSOAuthError,
  Se as InvalidStartUrlError,
  ye as InvalidStateError,
  _ as InvalidUserInputError,
  Ke as JourneyId,
  cr as JourneyTracker,
  er as MCPConnection,
  rr as MCPJsonConfigSchema,
  tr as MCPManagerSingleton,
  sr as MCPOptionsSchema,
  S as MalformedTokenError,
  qe as MetricNamespace,
  B as MetricReporter,
  dr as Metrics,
  Ce as MissingCodeError,
  Pe as MissingPortError,
  De as MissingStateError,
  m as MissingTokenError,
  U as NetworkIssueError,
  Me as ServerIssueError,
  Le as ServerListenError,
  _e as ServerTimeoutError,
  D as SignInBlockedError,
  Be as Telemetry,
  Ge as TelemetryAttributes,
  f as TelemetryNamespace,
  $e as Tool,
  je as ToolRecorder,
  Fe as TrustedError,
  W as UnexpectedIssueError,
  H as UserEnvironmentError,
  vr as addAgentModeHeadersMiddleware,
  or as addMCPToolToAutoApproveConfig,
  Tr as addPrivacyHeadersMiddleware,
  a as authProvider,
  ur as createCounter,
  gr as createHistogram,
  ir as findConfigFileForServer,
  nr as formatToolName,
  wr as getActiveMcpConfigLocation,
  pr as getHomeKiroPath,
  lr as getJourneyTracker,
  Ir as getMachineId,
  kr as getWorkspaceKiroPath,
  ze as initializeBaggagePropagation,
  Ve as initializeTelemetry,
  be as isAbortError,
  E as isBadAuthIssue,
  Ye as isInitialized,
  ar as loadMcpConfig,
  h as logger,
  xe as mapUnknownToErrorType,
  Ne as mcpLogger,
  G as recordAuthFromSource,
  d as recordOnboardingStep,
  ke as registerAuthProviderExtension,
  Qe as startActiveSpan,
  Er as updateResolvedIDESetting,
  T as withSpan
};
