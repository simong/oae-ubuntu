define(["jquery","bootstrap"],function(e){e.extend(e.fn.modal.Constructor.prototype,{lock:function(){this.$element.data("modal").isShown=!1,e("#"+this.$element.attr("id")+' [data-dismiss="modal"]').attr("disabled","disabled")},unlock:function(){this.$element.data("modal").isShown=!0,e("#"+this.$element.attr("id")+' [data-dismiss="modal"]').removeAttr("disabled","disabled")}})});