/* eslint-disable */
// Amaz
// eslint-disable-next-line no-undef
const Amaz = effect.Amaz;
const used = x => {}; // mark a variable was used, to avoid the optimization of V8 Engine

const defaultEditFrameX = 500;
const defaultEditFrameY = 200;
const twoDMultiplier = 20;
const threeDMultiplier = 20;

function hasRtlCharacters(input) {
  const rtlRegex = /[\u0590-\u083F\u20AA-\u20CF\uFB1D-\uFDFF\uFE70-\uFEFC]/;
  return rtlRegex.test(input);
}

// These enums's values should match the ones declared in TextJSComponentEditor
const WritingDirection = {
  HORIZONTAL: 0,
  VERTICAL: 1,
}

const HorizontalAlignment = {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2,
}

const VerticalAlignment = {
  TOP: 0,
  CENTER: 1,
  BOTTOM: 2,
}

class Text {
  // Implement the old API with getset to avoid invalidating existing graph nodes
  set textTypeSettingKindAlign(newValue) {
    switch (newValue) {
      case 0:
        this.writingDirection = effect.Amaz.TypesettingKind.HORIZONTAL;
        this.verticalAlignment = effect.Amaz.TypesettingAlignVertical.CENTER;
        this.horizontalAlignment = effect.Amaz.TypesettingAlign.LEFT;
        break;
      case 1:
        this.writingDirection =  effect.Amaz.TypesettingKind.HORIZONTAL;
        this.verticalAlignment = effect.Amaz.TypesettingAlignVertical.CENTER;
        this.horizontalAlignment = effect.Amaz.TypesettingAlign.CENTER;
        break;
      case 2:
        this.writingDirection =  effect.Amaz.TypesettingKind.HORIZONTAL;
        this.verticalAlignment = effect.Amaz.TypesettingAlignVertical.CENTER;
        this.horizontalAlignment = effect.Amaz.TypesettingAlign.RIGHT;
        break;
      case 3:
        this.writingDirection =  effect.Amaz.TypesettingKind.VERTICAL;
        this.verticalAlignment = effect.Amaz.TypesettingAlignVertical.UP;
        this.horizontalAlignment = effect.Amaz.TypesettingAlign.CENTER;
        break;
      case 4:
        this.writingDirection = effect.Amaz.TypesettingKind.VERTICAL;
        this.verticalAlignment = effect.Amaz.TypesettingAlignVertical.CENTER;
        this.horizontalAlignment = effect.Amaz.TypesettingAlign.CENTER;
        break;
      case 5:
        this.writingDirection = effect.Amaz.TypesettingKind.VERTICAL;
        this.verticalAlignment = effect.Amaz.TypesettingAlignVertical.DOWN;
        this.horizontalAlignment = effect.Amaz.TypesettingAlign.CENTER;
        break;
    }
  }
  get textTypeSettingKindAlign() {
    let retVal = -1;
    if (this.writingDirection === effect.Amaz.TypesettingKind.HORIZONTAL) {
      if (this.verticalAlignment === effect.Amaz.TypesettingAlignVertical.CENTER) {
        switch (this.horizontalAlignment) {
          case effect.Amaz.TypesettingAlign.LEFT:
            retVal = 0;
            break;
          case effect.Amaz.TypesettingAlign.CENTER:
            retVal = 1;
            break;
          case effect.Amaz.TypesettingAlign.RIGHT:
            retVal = 2;  
            break;
          default:
            retVal = -1;
            break;
        }
      }
    } else {
      if (this.horizontalAlignment === effect.Amaz.TypesettingAlign.CENTER) {
        switch (this.verticalAlignment) {
          case effect.Amaz.TypesettingAlignVertical.UP:
            retVal = 3;
            break;
          case effect.Amaz.TypesettingAlignVertical.CENTER:
            retVal = 4;
            break;
          case effect.Amaz.TypesettingAlignVertical.DOWN:
            retVal = 5;  
            break;
          default:
            retVal = -1;
            break;
        }
    }
    }
    return retVal;
  }
  constructor() {
    // super();
    this.name = 'Text';
    this.textMeshRender = null;
    this.textComponent = null;
    this.bInit = false;
    this.maxRTSize = 4096;
    this.runInEditMode = true;
  }
 updateRTLSetting(enableRTL) {
    console.log('Text updateRTLSetting ', enableRTL);
    if (false === enableRTL) {
      let fallbackFontPaths = new Amaz.Vector();
      this.textComponent.fallbackFontPaths = fallbackFontPaths;
      this.textComponent.textLocale = 0;
    } else {
      let fallbackFontPaths = new Amaz.Vector();
      fallbackFontPaths.pushBack('font/' + 'NotoSansArabic-Regular.ttf');
      fallbackFontPaths.pushBack('font/' + 'NotoSansKhmer-Regular.ttf');
      fallbackFontPaths.pushBack('font/' + 'NotoSansBengali-Regular.ttf');
      fallbackFontPaths.pushBack('font/' + 'NotoSansMyanmar-Regular.ttf');
      fallbackFontPaths.pushBack('font/' + 'NotoSansThai-Regular.ttf');
      fallbackFontPaths.pushBack('font/' + 'NotoSansHebrew-Regular.ttf');
      this.textComponent.fallbackFontPaths = fallbackFontPaths;
      this.textComponent.textLocale = 1;
    }
  }
  onStart() {
    console.log('Text onStart');

    try {
      if (this.entity) {
        let components = this.entity.getComponents("Text");
        for (let i = 0; i < components.size(); i++) {
          let component = components.get(i)
          if (component) {
              this.entity.removeComponentCom(component)
          }
        }
      }
    } catch (error) {
    }

    this.textMeshRender = this.entity.addComponent('MeshRenderer');
    this.textComponent = new Amaz.Text();

    if (this.textMeshRender.setEditorFlag) {
      this.textMeshRender.setEditorFlag(1, true);
      this.textComponent.setEditorFlag(1, true);
      this.textComponent.activeTextStyle.setEditorFlag(1, true);
      this.textComponent.typeSettingParam.setEditorFlag(1, true);
      this.textComponent.canvas.setEditorFlag(1, true);
    }

    // this.entity.components.pushBack(this.textComponent);
    const comps = new Amaz.Vector();
    comps.pushBack(this.textComponent);
    this.entity.components = comps; // In AmazingEngine, will push comps into current comps list

    this.textComponent.typeSettingParam.wordWrapWidth = 15000;
    this.textComponent.typeSettingParam.wordWrapHeight = 15000;

    this.textComponent.activeTextStyle.decorationWidth = 0.04;
    this.textComponent.activeTextStyle.decorationOffset = 0.15;

    this.textComponent.activeTextStyle.italicAngle = 10.0;
    this.textComponent.activeTextStyle.boldValue = 0.008;

    this.textComponent.fixFontSize = true;
    if (this.textComponent.resolutionAdapt !== undefined) {
      this.textComponent.resolutionAdapt = true;
    }

    const DIRTY_NUM = Number.NaN;   // Ensure the first frame is always marked as dirty

    this._input = 'input text';
    this._fontSize = (10.0 * 300) / 72;
    this._fontType = '';
    this._bold = false;
    this._italic = false;
    this._underline = false;
    this._letterColor = new Amaz.Color(1.0, 1.0, 1.0, 1.0);
    this._letterAlpha = 1.0;
    this._backgroundEnable = false;
    this._letterBgColor = new Amaz.Vector4f(0.0, 0.0, 0.0, 1.0);
    this._letterBgAlpha = 0.0;
    this._letterSpacing = 0.0;
    this._textTypeSettingKindAlign = 0;
    this._lineSpacing = 0.0;
    this._outlineEnable = false;
    this._outlineColorRGBA = new Amaz.Color(0.0, 0.0, 0.0, 0.0);
    this._outlineAlpha = 1.0;
    this._outlineWidth = 100.0;
    this._shadowEnable = false;
    this._shadowColorRGBA = null;
    this._shadowAlpha = DIRTY_NUM;
    this._shadowDistance = DIRTY_NUM;
    this._shadowAngle = DIRTY_NUM;
    this._shadowSmooth = DIRTY_NUM;
    this._innerShadowEnable = false;
    this._innerShadowColorRGBA = null;
    this._innerShadowAlpha = DIRTY_NUM;
    this._innerShadowDistance = DIRTY_NUM;
    this._innerShadowAngle = DIRTY_NUM;
    this._innerShadowSmooth = DIRTY_NUM;
    this._enableRTL = false;
    this._artText = null;
    this._writingDirection = DIRTY_NUM;
    this._horizontalAlignment = DIRTY_NUM;
    this._verticalAlignment = DIRTY_NUM;
    this._textAdaptiveCanvasEnabled = false;

    this._canvasSize = this.canvasSize;
    this.setCanvasIfNotInit();    

    this.bInit = true;
    this.textMeshRender.autoSortingOrder = this.autoSortingOrder;
    this.textMeshRender.sortingOrder = this.sortingOrder;
  }

  setCanvasIfNotInit() {
    const notInit = this.textComponent.typeSettingParam.canvasWHFixed.x === -1 && this.textComponent.typeSettingParam.canvasWHFixed.x === -1;

    if (notInit) {
      // make this._canvasSize not equal to this.canvasSize, so canvasWHFixed will be updated to this.canvasSize
      this._canvasSize = new Amaz.Vector2f(-1, -1);
    }
  }

  onUpdate(deltaTime) {
    if (
      !this.bInit ||
      this.textMeshRender === null ||
      this.textMeshRender === undefined ||
      this.textComponent === null ||
      this.textComponent === undefined
    ) {
      return;
    }
    if (this._enableRTL !== this.enableRTL) {
      // console.log("Text onUpdate ", this.enableRTL);
      this._enableRTL = this.enableRTL;
      this.updateRTLSetting(this.enableRTL);
    }
    this.textMeshRender.autoSortingOrder = this.autoSortingOrder;
    this.textMeshRender.sortingOrder = this.sortingOrder;

    if (this._input !== this.input) {
      // console.log("Text update set input", this.input);
      this._input = this.input;
      if (!hasRtlCharacters(this.input)) {
        console.log('Text update set input textDirectionLevel 0');
        this.textComponent.textDirectionLevel = 0;
      } else {
        console.log('Text update set input textDirectionLevel 1');
        this.textComponent.textDirectionLevel = 1;
      }
      this.textComponent.forceTypeSetting();
      this.textComponent.str = ''; // temp fix @lixiaoqi @xujiancong
      this.textComponent.str = this.input;
    }

    if (this._fontSize !== this.fontSize) {
      // console.log("Text update set fontSize", this.fontSize);
      this._fontSize = this.fontSize;
      this.textComponent.activeTextStyle.fontSize = (this.fontSize * 300.0) / 72;
    }

    if (this._fontType !== this.fontType) {
      // console.log("Text update set fontType", "AmazingFeature/font/" + this.fontType);
      this._fontType = this.fontType;
      this.textComponent.activeTextStyle.fontfamily = 'font/' + this.fontType;
    }

    if (this._artText !== this.artText) {
      if (this.artText) {
        if (this.artText.resPath === "") {
          console.log("Text onUpdate clear artText");
          this._artText = this.artText;
          this.textComponent.applyArtTextAsset(this.artText);
        }
      }
    }

    if (this._bold !== this.bold || this._italic !== this.italic) {
      // console.log("Text update set bold", this.bold);
      // console.log("Text update set italic", this.italic);
      this._bold = this.bold;
      this._italic = this.italic;
      if (this.bold === false && this.italic === false) {
        this.textComponent.activeTextStyle.fontStyle = Amaz.FontStyle.NORMAL;
      } else if (this.bold === true && this.italic === false) {
        this.textComponent.activeTextStyle.fontStyle = Amaz.FontStyle.BOLD;
      } else if (this.bold === false && this.italic === true) {
        this.textComponent.activeTextStyle.fontStyle = Amaz.FontStyle.ITALIC;
      } else {
        this.textComponent.activeTextStyle.fontStyle = Amaz.FontStyle.BOLD_ITALIC;
      }
    }
    if (this._underline !== this.underline) {
      // console.log("Text update set underline", this.underline);
      this._underline = this.underline;
      if (this.underline === true) {
        this.textComponent.activeTextStyle.fontDecoration = Amaz.FontDecorationType.UNDERLINE;
      } else {
        this.textComponent.activeTextStyle.fontDecoration = Amaz.FontDecorationType.NONE;
      }
    }

    if (this._letterColor !== this.letterColor || this._letterAlpha !== this.letterAlpha) {
      // console.log("Text update set letterColor", this.letterColor);
      this._letterAlpha = this.letterAlpha;
      this._letterColor = this.letterColor;
      this.textComponent.activeTextStyle.letterColorRGBA = new Amaz.Color(
        this.letterColor.r,
        this.letterColor.g,
        this.letterColor.b,
        this.letterColor.a * this.letterAlpha
      );
    }

    if (this._backgroundEnable !== this.backgroundEnable) {
      // console.log("Text update set backgroundEnable", this.backgroundEnable);
      this._backgroundEnable = this.backgroundEnable;
      this.textComponent.canvas.canvasEnabled = this.backgroundEnable;
    }
    if (this._letterBgColor !== this.letterBgColor || this._letterBgAlpha !== this.letterBgAlpha) {
      // console.log("Text update set letterBgColor", this.letterBgColor);
      // console.log("Text update set letterBgAlpha", this.letterBgAlpha);
      this._letterBgColor = this.letterBgColor;
      this._letterBgAlpha = this.letterBgAlpha;
      this.textComponent.canvas.canvasColor = new Amaz.Vector4f(
        this.letterBgColor.r,
        this.letterBgColor.g,
        this.letterBgColor.b,
        this.letterBgColor.a * this.letterBgAlpha
      );
    }
    if (this._letterSpacing !== this.letterSpacing) {
      // console.log("Text update set letterSpacing", this.letterSpacing);
      this._letterSpacing = this.letterSpacing;
      this.textComponent.typeSettingParam.letterSpacing = this.letterSpacing;
    }

    this.setAlignment();
    this.setCanvas();
    this.setTextAdaptiveCanvasEnabled();

    if (this._lineSpacing !== this.lineSpacing) {
      // console.log("Text update set lineSpacing", this.lineSpacing);
      this._lineSpacing = this.lineSpacing;
      this.textComponent.typeSettingParam.lineSpacing = this.lineSpacing;
    }

    if (this._outlineEnable !== this.outlineEnable) {
      // console.log("Text update set outlineEnable", this.outlineEnable);
      this._outlineEnable = this.outlineEnable;
      // outline settings will miss when outline disabled, set once again
      this.textComponent.activeTextStyle.outlineEnabled = this.outlineEnable;
      this.textComponent.activeTextStyle.outlineColorRGBA = this.outlineColorRGBA;
      this.textComponent.activeTextStyle.outlineAlpha = this.outlineAlpha;
      this.textComponent.activeTextStyle.outlineWidth = (this.outlineWidth / 500.0) * 0.9;
    }
    if (this._outlineColorRGBA !== this.outlineColorRGBA) {
      // console.log("Text update set outlineColorRGBA", this.outlineColorRGBA);
      this._outlineColorRGBA = this.outlineColorRGBA;
      this.textComponent.activeTextStyle.outlineColorRGBA = this.outlineColorRGBA;
    }
    if (this._outlineAlpha !== this.outlineAlpha) {
      // console.log("Text update set outlineAlpha", this.outlineAlpha);
      this._outlineAlpha = this.outlineAlpha;
      this.textComponent.activeTextStyle.outlineAlpha = this.outlineAlpha;
    }
    if (this._outlineWidth !== this.outlineWidth) {
      // console.log("Text update set outlineWidth", this.outlineWidth);
      this._outlineWidth = this.outlineWidth;
      this.textComponent.activeTextStyle.outlineWidth = (this.outlineWidth / 500.0) * 0.9;
    }

    this.setShadows();

    let bloomVisible = this.entity.getComponent('Renderer').enabled;

    if (this.bloomOption === 'OutWard' && this.bloomOption !== 'Stroke' && this.glow === true && bloomVisible) {
      // console.log('Text bloom start');

      let bloomMt = this.TextGlowMaterial.instantiate();
      this._textGlow_MatInstance = bloomMt.clone();
      this._textGlow_MatInstance.renderQueue = 3090;
      this._textGlow_MatInstance.xshader.renderQueue = 3090;
      if (this._textGlow_MatInstance) {
        //console.log("bloom instantiate material suc ");
      }

      if (!this.NewScreenRT_3) {
        this.NewScreenRT_3 = this.createRenderTexture('inputTexture', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //1
        this.NewScreenRT2 = this.createRenderTexture('inputTextureX', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //2
        this.NewScreenRT = this.createRenderTexture('u_TextTex', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //main
        this.NewScreenRT_2 = this.createRenderTexture('inputTextureY', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //3
        //console.log("Text bloom createRenderTexture  suc");
      }

      //get pass
      let passes = this._textGlow_MatInstance.xshader.passes;

      let pass1 = passes.get(0);
      let pass2 = passes.get(1);
      let pass3 = passes.get(2);
      let pass4 = passes.get(3);
      let pass5 = passes.get(4);
      //console.log("Text bloom get pass suc");

      let semantics1 = new Amaz.Map();
      semantics1.insert('attPosition', Amaz.VertexAttribType.POSITION);
      semantics1.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      pass1.semantics = semantics1;
      pass1.clearType = effect.Amaz.CameraClearType.COLOR;
      pass1.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let semantics2 = new Amaz.Map();
      semantics2.insert('attPosition', Amaz.VertexAttribType.POSITION);
      semantics2.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      pass2.semantics = semantics2;
      pass2.clearType = effect.Amaz.CameraClearType.COLOR;
      pass2.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let semantics3 = new Amaz.Map();
      semantics3.insert('attPosition', Amaz.VertexAttribType.POSITION);
      semantics3.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      pass3.semantics = semantics3;
      pass3.clearType = effect.Amaz.CameraClearType.COLOR;
      pass3.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let semantics4 = new Amaz.Map();
      semantics4.insert('attPosition', Amaz.VertexAttribType.POSITION);
      semantics4.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      pass4.semantics = semantics4;
      pass4.clearType = effect.Amaz.CameraClearType.COLOR;
      pass4.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let semantics5 = new Amaz.Map();
      semantics5.insert('attPosition', Amaz.VertexAttribType.POSITION);
      semantics5.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      pass5.semantics = semantics5;
      pass5.clearType = effect.Amaz.CameraClearType.COLOR;
      pass5.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      //set rt
      pass1.renderTexture = this.NewScreenRT2;
      pass2.renderTexture = this.NewScreenRT_2;
      pass3.renderTexture = this.NewScreenRT_3;
      pass4.renderTexture = this.NewScreenRT;
      //console.log("Text bloom set rt suc");

      //set uniform
      this._textGlow_MatInstance.setTex('inputTextureX', this.NewScreenRT2);
      this._textGlow_MatInstance.setTex('inputTextureY', this.NewScreenRT_2);
      this._textGlow_MatInstance.setTex('inputTexture', this.NewScreenRT_3);
      this._textGlow_MatInstance.setTex('u_TextTex', this.NewScreenRT);
      //console.log("Text bloom set uniform suc");

      let _bloomIntensity = this.clamp(this.glowIntensity, 0.0, 1.0);
      let _bloomRange = this.clamp(this.glowRange, 0.0, 1.0);
      let _bloomVerticalAngle = this.clamp(this.glowVerticalAngle, -0.5, 0.5) + 0.5;
      let _bloomHorizontalAngle = this.clamp(this.glowHorizontalAngle, -0.5, 0.5) + 0.5;
      let _bloomColor = this.bloomColor;

      this._textGlow_MatInstance.setVec4(
        'v_bloomPara',
        new effect.Amaz.Vector4f(_bloomIntensity, _bloomRange, _bloomVerticalAngle, _bloomHorizontalAngle)
      );
      this._textGlow_MatInstance.setVec4(
        'v_color',
        new effect.Amaz.Vector4f(_bloomColor.r, _bloomColor.g, _bloomColor.b, _bloomColor.a)
      );

      this._textGlow_MatInstance.setFloat('blurscale', 1.0);
      this._textGlow_MatInstance.setFloat('blurscale1', 1.0);
      this._textGlow_MatInstance.setFloat('u_Strength', 2.0);
      this._textGlow_MatInstance.setFloat('u_StrengthX', 1.0);
      this._textGlow_MatInstance.setFloat('u_StrengthY', 1.0);

      this._textGlow_MatInstance.setFloat('u_light', 1.0);
      this._textGlow_MatInstance.setFloat('sizeScale', 2.0);

      this._textGlow_MatInstance.setVec2('u_Center', new effect.Amaz.Vector2f(0.5, 0.5));

      //lua
      this.textComponent.bloomEnable = true;
      for (let i = 0; i < passes.size(); i++) {
        passes.get(i).clearMoment = Amaz.PassClearMoment.CLEAR_ON_RENDERING;
      }
      this.trans = this.entity.getComponent('Transform');
      this.renderer = this.entity.getComponent('MeshRenderer');

      let inputWidth = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
      let inputHeight = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
      inputWidth = inputWidth === 0 ? 720 : inputWidth;
      inputHeight = inputHeight === 0 ? 1280 : inputHeight;

      let w = inputWidth * 2.0;
      let h = inputHeight * 2.0;

      this.textComponent.bloomRtSizeCoeff = 1.0 / 25.0;
      if (w > 16000.0) {
        w = 16000.0;
      }
      if (h > 28500.0) {
        h = 28500.0;
      }

      let blurscaleX = this.trans.worldScale.x;
      let blurscaleY = this.trans.worldScale.y;
      let mainRtSize = this.textComponent.getRectExpanded();
      let main_width = mainRtSize.width * blurscaleX * this.textComponent.bloomRtSizeCoeff;
      let main_height = mainRtSize.height * blurscaleY * this.textComponent.bloomRtSizeCoeff;

      w = w < main_width ? main_width : w;
      h = h < main_height ? main_height : h;

      w = w < this.maxRTSize ? w : this.maxRTSize;
      h = h < this.maxRTSize ? h : this.maxRTSize;

      this.textComponent.bloomRtSize = new Amaz.Vector2f(w, h);
      this.textComponent.forceFlushCommandQueue();

      if (this.textComponent.canvas.renderToRT) {
        this._textGlow_MatInstance.setFloat('blurscale', 1.0);
        if (blurscaleX < 0.5) {
          blurscaleX = 0.5;
        }
        this._textGlow_MatInstance.setFloat('blurscale1', 1.0 / blurscaleX);
      } else {
        blurscaleX = 1.0;
        this._textGlow_MatInstance.setFloat('blurscale', 1.0);
      }

      let scale = 0.3;
      this.NewScreenRT_3.width = w * scale;
      this.NewScreenRT_3.height = h * scale;
      this.NewScreenRT2.width = w * scale;
      this.NewScreenRT2.height = h * scale;
      this.NewScreenRT_2.width = w * scale;
      this.NewScreenRT_2.height = h * scale;
      this.NewScreenRT.width = w * scale;
      this.NewScreenRT.height = h * scale;

      let center1 = new Amaz.Vector2f((this.trans.worldPosition.x * 0.5 * h) / w, this.trans.worldPosition.y * 0.5);
      this._textGlow_MatInstance.setVec2(
        'u_Center',
        new Amaz.Vector2f((this.trans.worldPosition.x * 0.5 * h) / w, this.trans.worldPosition.y * 0.5)
      );
      this.textComponent.setBloomMaterial(this._textGlow_MatInstance);
      //console.log("Text bloom end suc");
    } else {
      this.textComponent.bloomEnable = false;
    }

    if (this.bloomOption === 'Stroke' && this.bloomOption !== 'OutWard' && this.glow === true && bloomVisible) {
      //console.log("Text neon bloom start");

      let neonBloomMt = this.TextNeonGlowMaterial.instantiate();
      this._textNeonGlow_MatInstance = neonBloomMt.clone();
      this._textNeonGlow_MatInstance.renderQueue = 3090;
      this._textNeonGlow_MatInstance.xshader.renderQueue = 3090;

      if (!this.midRT) {
        this.midRT = this.createRenderTexture('u_TurbulentInputTex', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //1
        this.gaussianBlurMidRT = this.createRenderTexture('u_X1InputTex', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //2
        this.midRT4 = this.createRenderTexture('u_BloomTex1', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //3
        this.midRT1 = this.createRenderTexture('screen_Texture', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //4
        this.midRT3 = this.createRenderTexture('u_BloomTex2', 720, 1280, Amaz.PixelFormat.RGBA8Unorm); //6
      }

      let npasses = this._textNeonGlow_MatInstance.xshader.passes;

      let npassSize = this._textNeonGlow_MatInstance.xshader.passes.size();
      //console.log("Text bloom  passsize2 is  ",npassSize);

      let npass1 = npasses.get(0);
      let npass2 = npasses.get(1);
      let npass3 = npasses.get(2);
      let npass4 = npasses.get(3);
      let npass5 = npasses.get(4);
      let npass6 = npasses.get(5);
      let npass7 = npasses.get(6);

      //console.log("Text bloom get pass suc");

      let nsemantics1 = new Amaz.Map();
      nsemantics1.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics1.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass1.semantics = nsemantics1;
      npass1.clearType = effect.Amaz.CameraClearType.COLOR;
      npass1.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let nsemantics2 = new Amaz.Map();
      nsemantics2.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics2.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass2.semantics = nsemantics2;
      npass2.clearType = effect.Amaz.CameraClearType.COLOR;
      npass2.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let nsemantics3 = new Amaz.Map();
      nsemantics3.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics3.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass3.semantics = nsemantics3;
      npass3.clearType = effect.Amaz.CameraClearType.COLOR;
      npass3.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let nsemantics4 = new Amaz.Map();
      nsemantics4.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics4.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass4.semantics = nsemantics4;
      npass4.clearType = effect.Amaz.CameraClearType.COLOR;
      npass4.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let nsemantics5 = new Amaz.Map();
      nsemantics5.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics5.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass5.semantics = nsemantics5;
      npass5.clearType = effect.Amaz.CameraClearType.COLOR;
      npass5.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let nsemantics6 = new Amaz.Map();
      nsemantics6.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics6.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass6.semantics = nsemantics6;
      npass6.clearType = effect.Amaz.CameraClearType.COLOR;
      npass6.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      let nsemantics7 = new Amaz.Map();
      nsemantics7.insert('attPosition', Amaz.VertexAttribType.POSITION);
      nsemantics7.insert('attTexcoord0', Amaz.VertexAttribType.USER_DEFINE1);
      npass7.semantics = nsemantics7;
      npass7.clearType = effect.Amaz.CameraClearType.COLOR;
      npass7.clearColor = new effect.Amaz.Vector4f(0, 0, 0, 0);

      //set rt
      npass1.renderTexture = this.midRT;
      npass2.renderTexture = this.gaussianBlurMidRT;
      npass3.renderTexture = this.midRT4;
      npass4.renderTexture = this.midRT1;
      npass5.renderTexture = this.gaussianBlurMidRT;
      npass6.renderTexture = this.midRT3;

      //set uniform
      this._textNeonGlow_MatInstance.setTex('u_TurbulentInputTex', this.midRT);
      this._textNeonGlow_MatInstance.setTex('u_X1InputTex', this.gaussianBlurMidRT);
      this._textNeonGlow_MatInstance.setTex('u_BloomTex1', this.midRT4);
      this._textNeonGlow_MatInstance.setTex('screen_Texture', this.midRT1);
      this._textNeonGlow_MatInstance.setTex('u_X2InputTex', this.gaussianBlurMidRT);
      this._textNeonGlow_MatInstance.setTex('u_BloomTex2', this.midRT3);

      let _nenoBloomIntensity = this.clamp(this.glowIntensity, 0.0, 1.0);
      let _nenoBloomRange = this.clamp(this.glowRange, 0.0, 1.0);
      let _nenoBloomColor = this.bloomColor;

      this._textNeonGlow_MatInstance.setVec4(
        'v_bloomPara',
        new effect.Amaz.Vector4f(_nenoBloomIntensity, _nenoBloomRange, 0.0, 0.0)
      );
      this._textNeonGlow_MatInstance.setVec4(
        'v_color',
        new effect.Amaz.Vector4f(_nenoBloomColor.r, _nenoBloomColor.g, _nenoBloomColor.b, _nenoBloomColor.a)
      );

      this._textNeonGlow_MatInstance.setFloat('u_BlurScale', 4.0);
      this._textNeonGlow_MatInstance.setFloat('u_Exposure', 2.0);
      this._textNeonGlow_MatInstance.setFloat('blurRadius', 25.0);
      this._textNeonGlow_MatInstance.setFloat('u_Exposure2', 1.0);
      this._textNeonGlow_MatInstance.setFloat('fit_scale', 1.0);
      this._textNeonGlow_MatInstance.setFloat('u_Exposure3', 1.0);
      this._textNeonGlow_MatInstance.setFloat('blurscale', 1.0);
      this._textNeonGlow_MatInstance.setFloat('u_GlowIntensity', 0.75);
      this._textNeonGlow_MatInstance.setFloat('u_GlowIntensity2', 2.0);
      this._textNeonGlow_MatInstance.setFloat('u_GlowIntensity3', 1.0);

      //C++
      this.textComponent.bloomEnable = true;
      for (let i = 0; i < npasses.size(); i++) {
        npasses.get(i).clearMoment = Amaz.PassClearMoment.CLEAR_ON_RENDERING;
      }

      //lua
      this.trans = this.entity.getComponent('Transform');
      this.renderer = this.entity.getComponent('MeshRenderer');

      let inputWidth = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
      let inputHeight = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
      inputWidth = inputWidth === 0 ? 720 : inputWidth;
      inputHeight = inputHeight === 0 ? 1280 : inputHeight;

      let w = inputWidth * 2.0;
      let h = inputHeight * 2.0;
      this.textComponent.bloomRtSizeCoeff = 1.0 / 25.0;

      let blurscaleX = this.trans.worldScale.x;
      let blurscaleY = this.trans.worldScale.y;
      let mainRtSize = this.textComponent.getRectExpanded();
      let main_width = mainRtSize.width * blurscaleX * this.textComponent.bloomRtSizeCoeff;
      let main_height = mainRtSize.height * blurscaleY * this.textComponent.bloomRtSizeCoeff;

      w = w < main_width ? main_width : w;
      h = h < main_height ? main_height : h;

      w = w < this.maxRTSize ? w : this.maxRTSize;
      h = h < this.maxRTSize ? h : this.maxRTSize;

      console.log('Text bloomRTSize.width is ', w);
      console.log('Text bloomRTSize.height is ', h);
      this.textComponent.bloomRtSize = new Amaz.Vector2f(w, h);
      this.textComponent.forceFlushCommandQueue();

      if (this.textComponent.canvas.renderToRT) {
        blurscaleX = 0.5;
        this._textNeonGlow_MatInstance.setFloat('u_BlurScale', 1.75 * 1.3);
      } else {
        blurscaleX = 1.0;
        this._textNeonGlow_MatInstance.setFloat('u_BlurScale', 2.5 * 1.8);
      }

      let scale = 0.3;
      this.gaussianBlurMidRT.width = w * scale; //rt1
      this.gaussianBlurMidRT.height = h * scale;
      this.midRT4.width = w * scale; //rt3
      this.midRT4.height = h * scale;
      this.midRT3.width = w * scale;
      this.midRT3.height = h * scale; //rt4

      this.textComponent.setBloomMaterial(this._textNeonGlow_MatInstance);
    } else if (!this.bloomOption === 'OutWard') {
      this.textComponent.bloomEnable = false;
    }

    if (this._artText !== this.artText) {
      this._artText = this.artText;
      if (this.artText) {
        this.textComponent.applyArtTextAsset(this.artText);
      }
    }
  }

  onEnable() {
    if (
      this.bInit &&
      this.textMeshRender !== null &&
      this.textMeshRender !== undefined &&
      this.textComponent !== null &&
      this.textComponent !== undefined
    ) {
      this.textMeshRender.enabled = true;
      this.textComponent.enabled = true;
    }
    console.log('[OnEnable]', this.name);
  }

  onDisable() {
    if (
      this.bInit &&
      this.textMeshRender !== null &&
      this.textMeshRender !== undefined &&
      this.textComponent !== null &&
      this.textComponent !== undefined
    ) {
      this.textMeshRender.enabled = false;
      this.textComponent.enabled = false;
    }
    console.log('[onDisable]', this.name);
  }

  onDestroy() {
    if (this.NewScreenRT_3) {
      this.NewScreenRT_3.release();
      this.NewScreenRT2.release();
      this.NewScreenRT.release();
      this.NewScreenRT_2.release();
    }
    this.onRelease();
  }

  beforeEditorSave() {
    this.onRelease();
  }

  onRelease() {
    if(this.bInit && this.textComponent !== null && this.textComponent !== undefined)
    {
        this.entity.removeComponent(this.textComponent);
        this.textComponent = undefined;
    }

    if(this.bInit && this.textMeshRender !== null && this.textMeshRender !== undefined)
    {
        this.entity.removeComponent(this.textMeshRender);
        this.textMeshRender = undefined;
    }
    this.bInit = false;
    console.log("[onRelease]",this.name);
  }

  createRenderTexture(name, width, height, colorFormat) {
    let rt = new Amaz.RenderTexture();
    rt.name = name;
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    rt.depth = 1;
    rt.attachment = Amaz.RenderTextureAttachment.NONE;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.NONE;
    rt.width = width;
    rt.height = height;
    rt.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;

    rt.enableMipmap = false;
    rt.maxAnisotropy = 1.0;
    return rt;
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  setShadows() {
    const DISTANCE_FACTOR = 1 / 100;
    const SMOOTH_FACTOR = 1 / 6;
    const activeTextStyle = this.textComponent.activeTextStyle;

    // Outer Shadow

    if (this._shadowEnable !== this.shadowEnable) {
      this._shadowEnable = this.shadowEnable;
      activeTextStyle.shadowEnabled = this.shadowEnable;
      // console.log('activeTextStyle.shadowEnabled ' + this.shadowEnable);
      if (this.shadowEnable) {
        // Force a refresh to prevent the engine from replacing the value
        activeTextStyle.shadowColorRGBA = this.shadowColorRGBA;
        activeTextStyle.shadowAlpha = this.shadowAlpha;
        activeTextStyle.shadowDistance = this.shadowDistance * DISTANCE_FACTOR;
        activeTextStyle.shadowAngle = this.shadowAngle;
        activeTextStyle.shadowSmooth = this.shadowSmooth * SMOOTH_FACTOR;
      }
    }

    if (this.shadowEnable) {
      if (this._shadowColorRGBA !== this.shadowColorRGBA) {
        this._shadowColorRGBA = this.shadowColorRGBA;
        activeTextStyle.shadowColorRGBA = this.shadowColorRGBA;
      }
      if (this._shadowAlpha !== this.shadowAlpha) {
        this._shadowAlpha = this.shadowAlpha;
        activeTextStyle.shadowAlpha = this.shadowAlpha;
      }
      if (this._shadowDistance !== this.shadowDistance) {
        this._shadowDistance = this.shadowDistance;
        activeTextStyle.shadowDistance = this.shadowDistance * DISTANCE_FACTOR;
      }
      if (this._shadowAngle !== this.shadowAngle) {
        this._shadowAngle = this.shadowAngle;
        activeTextStyle.shadowAngle = this.shadowAngle;
      }
      if (this._shadowSmooth !== this.shadowSmooth) {
        this._shadowSmooth = this.shadowSmooth;
        activeTextStyle.shadowSmooth = this.shadowSmooth * SMOOTH_FACTOR;
      }
    }

    // Inner Shadow

    let innerShadow = null;

    if (this._innerShadowEnable !== this.innerShadowEnable) {
      this._innerShadowEnable = this.innerShadowEnable;
      if (this.innerShadowEnable) {
        if (activeTextStyle.innerShadows.empty()) {
          innerShadow = new Amaz.LetterStyleLayer();
          innerShadow.type = Amaz.LetterStyleLayerType.INNER_SHADOW;
          innerShadow.renderType = Amaz.LetterStyleLayerRenderType.SOLID;
          activeTextStyle.innerShadows.pushBack(innerShadow);
          activeTextStyle.innerShadows = activeTextStyle.innerShadows;
        }
      } else if (activeTextStyle.innerShadows.empty()) {
        return;
      }
      innerShadow = activeTextStyle.innerShadows.front();
      innerShadow.enable = this.innerShadowEnable;
    } else if (this.innerShadowEnable) {
      innerShadow = activeTextStyle.innerShadows.front();
    }

    if (innerShadow && innerShadow.enable) {
      if (this._innerShadowColorRGBA !== this.innerShadowColorRGBA) {
        this._innerShadowColorRGBA = this.innerShadowColorRGBA;
        innerShadow.color = this.innerShadowColorRGBA;
      }
      if (this._innerShadowAlpha !== this.innerShadowAlpha) {
        this._innerShadowAlpha = this.innerShadowAlpha;
        innerShadow.alpha = this.innerShadowAlpha;
      }
      if (this._innerShadowDistance !== this.innerShadowDistance) {
        this._innerShadowDistance = this.innerShadowDistance;
        innerShadow.shadowDistance = this.innerShadowDistance * DISTANCE_FACTOR;
      }
      if (this._innerShadowAngle !== this.innerShadowAngle) {
        this._innerShadowAngle = this.innerShadowAngle;
        innerShadow.shadowAngle = this.innerShadowAngle;
      }
      if (this._innerShadowSmooth !== this.innerShadowSmooth) {
        this._innerShadowSmooth = this.innerShadowSmooth;
        innerShadow.shadowFeather = this.innerShadowSmooth * SMOOTH_FACTOR;
      }
    }
  }

  is2DText() {
    return this.hasScreenTransform;
  }

  setTextAdaptiveCanvasEnabled() {
    const needSetTextAdaptiveCanvasEnabled = () => {
      return this._textAdaptiveCanvasEnabled !== this.textAdaptiveCanvasEnabled;
    }

    if (needSetTextAdaptiveCanvasEnabled()) {
      this._textAdaptiveCanvasEnabled = this.textAdaptiveCanvasEnabled;
      this.textComponent.typeSettingParam.textAdaptiveCanvasEnabled = this._textAdaptiveCanvasEnabled;
      this.textComponent.typeSettingDirty = true;
    }
  }

  setCanvas() {
    const needSetCanvas = this._canvasSize.x !== this.canvasSize.x && this._canvasSize.y !== this.canvasSize.y;
    
    if (needSetCanvas) {
      this._canvasSize = this.canvasSize;
      let multiplier = this.hasScreenTransform ? twoDMultiplier : threeDMultiplier;
      const valToSet = new Amaz.Vector2f(this._canvasSize.x * multiplier, this._canvasSize.y * multiplier);
      this.textComponent.typeSettingParam.canvasWHFixed = valToSet;
      this.textComponent.typeSettingDirty = true;
    }
  }

  setAlignment() {
    const needSetAlignment = () => {
      return (
        this._horizontalAlignment !== this.horizontalAlignment ||
        this._verticalAlignment !== this.verticalAlignment ||
        this._writingDirection !== this.writingDirection
      );
    }
    
    if (!needSetAlignment())
    {
      return;
    }
    this._horizontalAlignment = this.horizontalAlignment;
    this._verticalAlignment = this.verticalAlignment;
    this._writingDirection = this.writingDirection;

    this.textComponent.typeSettingParam.typeSettingKind = this.writingDirection;
    if (this.writingDirection === WritingDirection.HORIZONTAL)
    {
      this.textComponent.typeSettingParam.typeSettingAlign = this.horizontalAlignment;
      this.textComponent.typeSettingParam.typeSettingAlignVertical = this.verticalAlignment;
    } else if (this.writingDirection === WritingDirection.VERTICAL)
    {
      switch (this.horizontalAlignment)
      {
        case HorizontalAlignment.LEFT:
          this.textComponent.typeSettingParam.typeSettingAlignVertical = Amaz.TypesettingAlignVertical.DOWN;
          break;
        case HorizontalAlignment.RIGHT:
          this.textComponent.typeSettingParam.typeSettingAlignVertical = Amaz.TypesettingAlignVertical.UP;
          break;
        case HorizontalAlignment.CENTER:
          this.textComponent.typeSettingParam.typeSettingAlignVertical = Amaz.TypesettingAlignVertical.CENTER;
          break;
      }

      switch (this.verticalAlignment)
      {
        case VerticalAlignment.TOP:
          this.textComponent.typeSettingParam.typeSettingAlign = Amaz.TypesettingAlign.UP;
          break;
        case VerticalAlignment.BOTTOM:
          this.textComponent.typeSettingParam.typeSettingAlign = Amaz.TypesettingAlign.DOWN;
          break;
        case VerticalAlignment.CENTER:
          this.textComponent.typeSettingParam.typeSettingAlign = Amaz.TypesettingAlign.CENTER;
          break;
      }
    }
  }
}

exports.Text = Text;
