function closeWindow(){
  overwolf.windows.getCurrentWindow(function(result){
    if (result.status === "success"){
      overwolf.windows.close(result.window.id);
    }
  });
  Analytics.reportCloseClicked();
}
