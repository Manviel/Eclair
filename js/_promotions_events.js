jsRequire("/JSComponents/Data/MasterEventTopBet.js");
function PromotionEventBet(initArray) {
    initArray = [
        initArray[0],
        1,
        "",
        [
            initArray[0],
            initArray[1],
            initArray[2],
            initArray[3],
            initArray[4],
            initArray[5],
        ],
        initArray[8],
        1,
        0
    ];
    MasterEventTopBet.call(this, initArray);
}
$.extend(PromotionEventBet.prototype, MasterEventTopBet.prototype);
function PromotionEvents(target) {
    this.RawEvents = function(events) {
        var rawEvents = {};
        events = events.split(',');
        for (var i in events) {
            events[i] = events[i].replace(/^\s+|\s+$/gm, '');
            events[i] = events[i].split(':');
            if (events[i].length == 2) {
                rawEvents[events[i][0]] = events[i][1];
            } else {
                rawEvents[events[i][0]] = 0;
            }
            delete events[i]
        }
        return rawEvents;
    }($(target).text());
    this.Title = ($(target).attr('title').length ? $(target).attr('title') : false);
    this.Target = target;
    this.PromotionEventBet = [];
    this.Events = [];
    this.Lines = [];
    this.TotNumItems = 0;
    this.REFRESH_DATA_TIME_IN_SECONDS = 360;
    this.InitThread = null;
    this.RowsToHide = [];
    this.TimeFilter = null;
}
PromotionEvents.prototype = {
    init: function() {
        var ref = this;
        ref.stop();
        ref.clear();
        if (BetSlip)
        {
            BetSlip.betRemoved["UpdatableWindowsManager" + $(ref.Target).html()] = function() {
                ref.loadContent();
            };

            BetSlip.betAdded["UpdatableWindowsManager" + $(ref.Target).html()] = function() {
                ref.loadContent();
            };
        }
        PageMethods.GetMasterEventByIds(function(rawEvents) {
            var events = [];
            for (var i in rawEvents)
                events.push(i);
            return events;
        }(this.RawEvents).join(','), function(result)
        {
            result = eval(result);
            result = result[0];
            for (var i in result) {
                if (typeof ref.RawEvents[result[i][0]] !== 'undefined') {
                    result[i].push(ref.RawEvents[result[i][0]]);
                } else {
                    result[i].push(0);
                }
            }
            ref.PromotionEventBet = ArrayOf(result, PromotionEventBet);
            ref.PromotionEventBet.sort(ref.SortMasterEventsByTime);
            if (Array.isEmpty(ref.PromotionEventBet))
            {
                $(this.Target).css("display", "none");
                return;
            }
            ref.updateEvents();
        }, function(result)
        {
        }, this);
        setOddStyle.listeners["PromotionEvents"] = function() {
            ref.init();
        };
        setTimeZone.listeners["PromotionEvents"] = function() {
            ref.init();
        };
        CenterContentTimeFilter.OnFilterChanged["PromotionEvents"] = function() {
            ref.init();
        };
    }, loadContent: function()
    {
        var _html = [];
        this.buildHtml(_html);
        $(this.Target).html(_html.join(''));
        if (getLength(this.PromotionEventBet) == this.RowsToHide.length)
        {
            $(this.Target).css("display", "none");
            return;
        }
        $(this.Target).css("display", "block");
        this.hideEmptyRows();
    }, hideEmptyRows: function()
    {
        for (var i in this.RowsToHide)
        {
            $("#_me_promotionevents_" + this.RowsToHide[i]).css("display", "none");
        }
    }, updateEvents: function()
    {
        var updatestr = [];
        for (var i in this.PromotionEventBet)
        {
            var me = this.PromotionEventBet[i];
            for (var j in me.Events)
            {
                var event = me.Events[j];
                updatestr.push(event.getUpdateString());
            }
            me.LastUpdate = new Date();
        }
        if (updatestr.length == 0)
            return;
        this.UpdateEventsCall(updatestr);
    }, UpdateEventsCall: function(updatestr)
    {
        var ref = this;
        PageMethods.UpdateEvents(updatestr.join("@"), function(result)
        {
            result = eval(result);
            ref.processUpdates(result);
            ref.loadContent();
            ref.run();
        }, function(result)
        {
        }, this);
    }, processUpdates: function(result)
    {
        var _events = HashtableOf(result, EventInfo);
        for (var k in _events)
        {
            if (_events[k].Deleted)
            {
                delete _events[k];
            }
        }
        for (var k in _events)
        {
            for (var j in this.PromotionEventBet)
            {
                if (this.PromotionEventBet[j].Events[k] != null)
                    this.Events[j] = _events[k];
            }
        }
        for (var k in this.Events)
        {
            for (var j in this.Events[k].Lines)
            {
                if (this.Events[k].Lines[j].IsOptional == false)
                {
                    this.Lines[k] = this.Events[k].Lines[j];
                }
            }
        }
    }, run: function()
    {
        var ref = this;
        this.InitThread = setInterval(function() {
            ref.init();
        }, ref.REFRESH_DATA_TIME_IN_SECONDS * 1000);
    }, stop: function()
    {
        var ref = this;
        clearInterval(this.InitThread);
    }, clear: function()
    {
        this.PromotionEventBet = [];
        this.Events = [];
        this.Lines = [];
    }, link: function()
    {
        var ref = this;
        $("a.showOdds").each(function(index)
        {
            $(this).click(function()
            {
                var row = $(this).attr("row");
                var col = $(this).attr("col");
                if (ref.PromotionEventBet[row] == null)
                {
                    alert("oops...");
                    return;
                }
                addOdd2(ref.PromotionEventBet[row].ID, ref.Events[row].ID, ref.Lines[row], col);
                cancelBubble(event);
                return false;
            });
        });
    }, clearRowToHide: function()
    {
        for (var i in this.RowsToHide)
        {
            delete this.RowsToHide[i];
        }
        this.RowsToHide = [];
    }, SortMasterEventsByTime: function(a, b)
    {
        return a.MasterEventDate.getTime() - b.MasterEventDate.getTime();
    }, buildHtml: function(__html) {
        this.clearRowToHide();
        __html.push("        <div class=\"r_content_header\">");
        if(this.Title !== false) {
            __html.push("   <h2>");
            __html.push(this.Title);
            __html.push("</h2>");
        } else {
            $(this.Target).css('padding-top', 0);
        }
        __html.push("  </div>");
        __html.push("  <h2>  ");
        __html.push("      <a href=\"javascript:;\" onclick=\"javascript:return false;\"></a>");
        __html.push("  </h2>");
        __html.push("  <div class=\"inr\">");
        __html.push("      <table class=\"live_betting_table\">");
        __html.push("       <tbody>");
        __html.push("           ");
        var masterEventsLength = getLength(this.PromotionEventBet);
        var index = 0;
        this.TimeFilter = CenterContentTimeFilter.getTimeFilter();
        for (var row in this.PromotionEventBet)
        {
            if (index >= masterEventsLength)
                break;
            if (this.TimeFilter != -1 && (this.PromotionEventBet[row].MasterEventDate - this.TimeFilter) > 0)
                continue;
            var url = this.PromotionEventBet[row].Link ? this.PromotionEventBet[row].Link : "/sports/bets/";
            __html.push("                      <tr id=\"_me_promotionevents_");
            __html.push(row);
            __html.push("\">");
            __html.push("                       ");
            this.drowLineInfo(__html, row, url);
            __html.push("                       ");
            this.drowOddsInfo(__html, row, url);
            __html.push("                       ");
            __html.push("                                <td class=\"more\">");
            __html.push("                                    <img src=\"/i/graph_ico.png\" onclick=\"OpenStatsMID(");
            __html.push(this.PromotionEventBet[row].ID);
            __html.push(")\">");
            __html.push("                                </td>");
            __html.push("                      </tr> ");
            __html.push("              ");
            index++;
        }
        __html.push("      ");
        __html.push("          </tbody>");
        __html.push("      </table> ");
        __html.push("  </div>");
        __html.push("  ");
    }, getEventsLength: function(row) {
        var length = 0;
        for (var i in this.PromotionEventBet[row].Events) {
            length++;
        }
        return length;
    }, drowOddsInfo: function(__html, row) {
        if (this.Lines[row] == null) {
            this.RowsToHide.push(row);
            return;
        }
        switch (this.PromotionEventBet[row].LineTypeID) {
            case eDisplayType.ML:
                this.buildML(__html, row);
                break;
            case eDisplayType.HC:
                this.buildHC(__html, row);
                break;
            case eDisplayType.OU:
                this.buildOU(__html, row);
                break;
            default:
                this.RowsToHide.push(row);
                break;
        }
    }, buildML: function(__html, row) {
        var mlg = this.Lines[row];
        if (!mlg || !mlg.ML) {
            this.RowsToHide.push(row);
            return;
        }
        var ml = mlg.ML;
        __html.push("        <td class=\"bet_name\">");
        __html.push("        ");
        var isOk = ml.buildCell(__html, this.PromotionEventBet[row], this.Events[row], mlg, 1);
        isOk = isOk && ml.buildCell(__html, this.PromotionEventBet[row], this.Events[row], mlg, 2);
        isOk = isOk && ml.buildCell(__html, this.PromotionEventBet[row], this.Events[row], mlg, 3);
        __html.push("        </td>");
        __html.push("        ");
        if (!isOk) {
            this.RowsToHide.push(row);
        }
    }, buildHC: function(__html, row) {
        var lg = this.Lines[row];
        if (lg.length == 0 || !lg.Spread) {
            this.RowsToHide.push(row);
            return;
        }
        __html.push("        <td class=\"bet_name\">");
        __html.push("        ");
        var isOk = lg.Spread.buildCell(__html, this.PromotionEventBet[row], this.Events[row], lg, 1);
        isOk = isOk && lg.Spread.buildCell(__html, this.PromotionEventBet[row], this.Events[row], lg, 3);
        __html.push("        </td>");
        __html.push("        ");
        if (!isOk) {
            this.RowsToHide.push(row);
        }
    }, buildOU: function(__html, row) {
        var lg = this.Lines[row];
        if (lg.length == 0)
            return;
        if (!lg.Spread) {
            this.RowsToHide.push(row);
            return;
        }
        __html.push("        <td class=\"bet_name\">");
        __html.push("        ");
        var isOk = lg.OU.buildCell(__html, this.PromotionEventBet[row], this.Events[row], lg, 1);
        isOk = isOk && lg.OU.buildCell(__html, this.PromotionEventBet[row], this.Events[row], lg, 3);
        __html.push("        </td>");
        __html.push("        ");
        if (!isOk) {
            this.RowsToHide.push(row);
        }
    }, get_m_i_odds: function(col, i) {
        switch (col) {
            case 1:
                var ml_i_odds = (this.Lines[i] == null) ? null : (this.Lines[i].OU == null) ? null : this.Lines[i].OU.Odds1;
                break;
            case 2:
                var ml_i_odds = (this.Lines[i] == null) ? null : (this.Lines[i].OU == null) ? null : this.Lines[i].OU.Odds3;
                break;
            case 3:
                var ml_i_odds = (this.Lines[i] == null) ? null : (this.Lines[i].OU == null) ? null : this.Lines[i].OU.Points1;
                break;
        }
        return ml_i_odds;
    }, drowLineInfo: function(__html, i, url) {
        __html.push("    ");
        __html.push("            <td class=\"game_icon\">");
        __html.push("                <span class=\"b_");
        __html.push(this.PromotionEventBet[i].BranchID);
        __html.push("\"></span>");
        __html.push("            </td>");
        __html.push("            <td class=\"game_score_time\">");
        __html.push("                <span class=\"game_score\">");
        __html.push("                    ");
        __html.push(getDataTime(this.PromotionEventBet[i].MasterEventDate).toStringEx("dd.MM"));
        __html.push("                </span>|");
        __html.push("                <span class=\"game_time\">");
        __html.push("                    ");
        __html.push(getDataTime(this.PromotionEventBet[i].MasterEventDate).toStringEx("HH:mm"));
        __html.push("                </span>");
        __html.push("            </td>");
        __html.push("    ");
    }
};
$(document).ready(function() {
    $('.promotionevents').each(function() {
        var promotionEvents = new PromotionEvents(this);
        promotionEvents.init();
    })
});