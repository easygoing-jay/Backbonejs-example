function htmlEncode(value){
      return $('<div/>').text(value).html();
    }
  (function(){
    
    $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };

    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
    });

	var CriticalAlert = Backbone.Model.extend({
      defaults: {
            id: "Not specified",
            duedate: "Not specified",
			customer: "Not specified",
			reason: "Not specified"
        },
        initialize: function(){
            
        }
    });
	
    var CriticalAlerts = Backbone.Collection.extend({
	  model: CriticalAlert,
      initialize: function(){
            
        }
    });
	
	var criticalAlert1 = new CriticalAlert({ id:1, duedate: "1/1/1", customer: "OMC", reason: "Cancel" });
    var criticalAlert2 = new CriticalAlert({ id:2, duedate: "1/1/1", customer: "OMC", reason: "Cancel"});
    var criticalAlert3 = new CriticalAlert({ id:3, duedate: "1/1/1", customer: "OMC", reason: "Cancel"});
    var criticalAlert4 = new CriticalAlert({ id:4, duedate: "1/1/1", customer: "OMC", reason: "Cancel"});
    var criticalAlert5 = new CriticalAlert({ id:5, duedate: "1/1/1", customer: "OMC", reason: "Cancel"});

    var criticalAlerts = new CriticalAlerts([ criticalAlert1, criticalAlert2, criticalAlert3]);
	var processedcriticalAlerts = new CriticalAlerts([ criticalAlert4, criticalAlert5]);
	var ar =[criticalAlerts, processedcriticalAlerts];
	
	var Alertactioninfo = Backbone.Model.extend({
		idAttribute:"_id",
		defaults: {
            id: "Not specified",
            mobile: "Not specified",
			customer: "Not specified",
			home: "Not specified",
			account : "Not specified"
        },
        initialize: function(){
            
        }
    });
	
    var Alertactioninfocol = Backbone.Collection.extend({
	  model: Alertactioninfo,
      initialize: function(){
            
        }
    });
	var alertactioninfo1 = new Alertactioninfo({ id:1, mobile: "123123123", customer: "OMC1", home: "123123123", account: "asdf"});
    var alertactioninfo2 = new Alertactioninfo({ id:2, mobile: "123123123", customer: "OMC2", home: "12123123", account: "dfg"});
	var alertactioninfo3 = new Alertactioninfo({ id:3, mobile: "123123123", customer: "OMC3", home: "123123123", account: "asdf"});
    var alertactioninfo4 = new Alertactioninfo({ id:4, mobile: "123123123", customer: "OMC4", home: "12123123", account: "dfg"});
	var alertactioninfo5 = new Alertactioninfo({ id:5, mobile: "123123123", customer: "OMC5", home: "12123123", account: "dfg"});
	var alertactioninfocol = new Alertactioninfocol([ alertactioninfo1, alertactioninfo2, alertactioninfo3, alertactioninfo4, alertactioninfo5]);
    var CriticalAlertsListView = Backbone.View.extend({
      el: '.criticalalertssection',
	  events: {
        'click .criticalalertslink': 'criticalalerts',
        'click .lesscriticalalertslink': 'lesscriticalalerts'
      },
	  criticalalerts: function(){
	  		var template = _.template($('#criticalAlerts-list-template').html(), {criticalAlerts: ar[0].models});
            $('.criticalalertssection .criticalalerts').html(template);
			return false;
	  },
	  lesscriticalalerts: function(){
			var template = _.template($('#criticalAlerts-list-template').html(), {criticalAlerts: ar[1].models});
            $('.criticalalertssection .criticalalerts').html(template);
			return false;
	  },
	  
      render: function () {
			$('.criticalalertslink').html(ar[0].length);
			$('.lesscriticalalertslink').html(ar[1].length);
            this.criticalalerts();
      }
    });
	var MoreInfoView = Backbone.View.extend({ 
		render: function(id){
			$( ".info"+id.id ).mouseout(function(event){
				event.stopImmediatePropagation();
					return false;
			});
			$( ".info"+id.id ).tooltip({
				items: "a",
				position: {
                    my: "center bottom-20",
                    at: "center left",
                    using: function( position, feedback ) {
                        $( this ).css( position );
                        $( "<div>" )
                                .addClass( "arrow" )
                                .addClass( feedback.vertical )
                                .addClass( feedback.horizontal )
                                .appendTo( this );
                    }
                },
				show: { effect: "blind", duration: 100 },
				content: function() {
					return _.template($('#alert-actions-template').html(), {alertactioninfo: alertactioninfocol.at(id.id-1)});
				},
				open: function( event, ui ) {
					$(".closehover").click(function(){
						$( ".info"+$(this).attr("id" )).tooltip( "close" );			
					});  
				}
			});
			$( ".info"+id.id ).tooltip( "open" );
		}
	});
    var Router = Backbone.Router.extend({
        routes: {
          "": "home", 
		  "moreinfo/:id" :  "moreinfo"
        }
    });

    var router = new Router;
    router.on('route:home', function() {
      (new CriticalAlertsListView()).render();
    })
	router.on('route:moreinfo', function(id) {
      // render user list
      (new MoreInfoView()).render({id: id});
    })

    Backbone.history.start();
	})();