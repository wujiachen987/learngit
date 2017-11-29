/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.grid.CellSelectionModel=function(A){Ext.apply(this,A);this.selection=null;this.addEvents("beforecellselect","cellselect","selectionchange");Ext.grid.CellSelectionModel.superclass.constructor.call(this)};Ext.extend(Ext.grid.CellSelectionModel,Ext.grid.AbstractSelectionModel,{initEvents:function(){this.grid.on("cellmousedown",this.handleMouseDown,this);this.grid.getGridEl().on(Ext.isIE||Ext.isSafari3?"keydown":"keypress",this.handleKeyDown,this);var A=this.grid.view;A.on("refresh",this.onViewChange,this);A.on("rowupdated",this.onRowUpdated,this);A.on("beforerowremoved",this.clearSelections,this);A.on("beforerowsinserted",this.clearSelections,this);if(this.grid.isEditor){this.grid.on("beforeedit",this.beforeEdit,this)}},beforeEdit:function(A){this.select(A.row,A.column,false,true,A.record)},onRowUpdated:function(A,B,C){if(this.selection&&this.selection.record==C){A.onCellSelect(B,this.selection.cell[1])}},onViewChange:function(){this.clearSelections(true)},getSelectedCell:function(){return this.selection?this.selection.cell:null},clearSelections:function(B){var A=this.selection;if(A){if(B!==true){this.grid.view.onCellDeselect(A.cell[0],A.cell[1])}this.selection=null;this.fireEvent("selectionchange",this,null)}},hasSelection:function(){return this.selection?true:false},handleMouseDown:function(B,D,A,C){if(C.button!==0||this.isLocked()){return }this.select(D,A)},select:function(F,C,B,E,D){if(this.fireEvent("beforecellselect",this,F,C)!==false){this.clearSelections();D=D||this.grid.store.getAt(F);this.selection={record:D,cell:[F,C]};if(!B){var A=this.grid.getView();A.onCellSelect(F,C);if(E!==true){A.focusCell(F,C)}}this.fireEvent("cellselect",this,F,C);this.fireEvent("selectionchange",this,this.selection)}},isSelectable:function(C,B,A){return !A.isHidden(B)},handleKeyDown:function(F){if(!F.isNavKeyPress()){return }var E=this.grid,J=this.selection;if(!J){F.stopEvent();var I=E.walkCells(0,0,1,this.isSelectable,this);if(I){this.select(I[0],I[1])}return }var B=this;var H=function(M,K,L){return E.walkCells(M,K,L,B.isSelectable,B)};var C=F.getKey(),A=J.cell[0],G=J.cell[1];var D;switch(C){case F.TAB:if(F.shiftKey){D=H(A,G-1,-1)}else{D=H(A,G+1,1)}break;case F.DOWN:D=H(A+1,G,1);break;case F.UP:D=H(A-1,G,-1);break;case F.RIGHT:D=H(A,G+1,1);break;case F.LEFT:D=H(A,G-1,-1);break;case F.ENTER:if(E.isEditor&&!E.editing){E.startEditing(A,G);F.stopEvent();return }break}if(D){this.select(D[0],D[1]);F.stopEvent()}},acceptsNav:function(C,B,A){return !A.isHidden(B)&&A.isCellEditable(B,C)},onEditorKey:function(E,D){var B=D.getKey(),F,C=this.grid,A=C.activeEditor;if(B==D.TAB){if(D.shiftKey){F=C.walkCells(A.row,A.col-1,-1,this.acceptsNav,this)}else{F=C.walkCells(A.row,A.col+1,1,this.acceptsNav,this)}D.stopEvent()}else{if(B==D.ENTER){A.completeEdit();D.stopEvent()}else{if(B==D.ESC){D.stopEvent();A.cancelEdit()}}}if(F){C.startEditing(F[0],F[1])}}});