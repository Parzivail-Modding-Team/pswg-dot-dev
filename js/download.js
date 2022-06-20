/**
 * Created by Colby on 2/14/2018.
 */

$(document).ready(function () {
	// create sidebar and attach to menu open
	$('.ui.sidebar').sidebar('attach events', '.toc.item');
	
	$.ajaxSetup({
		async: false
	});
	
	function openInNewTab(url) {
		var win = window.open(url, '_blank');
	}

	Vue.component("pswg-release", {
		template: '<tr><td><div v-if="latest" class="ui ribbon label">Latest</div><div v-if="isPswm" class="ui red mini basic label">PSWM (archive)</div><div v-if="prerelease" class="ui yellow mini basic label">Pre-Release</div> {{dlname}}</td><td>{{age}}</td><td><a :href="linkChangelog"><i class="github alternate icon"></i> Changelog</a></td><td><a href="#!" v-bind:loc="linkDownload" v-on:click="download()" class="ui basic label">Download<div class="detail">{{downloads}}</div></a></td></tr>',
		props: ["latest", "dlname", "age", "downloads", "prerelease", "linkChangelog", "isPswm", "linkDownload"],
		data: function () {
			return {
				download: function() {
					openInNewTab(this.linkDownload);
					window.location.assign("thanks.html");
				}
			}
		}
	});

	var app = new Vue({
		el: "#app",
		data: {
			releases: [],
			downloads: {
				mostRecent: 0,
				total: 0
			},
			loadReleases: function () {
				var urls = ["https://api.github.com/repos/Parzivail-Modding-Team/GalaxiesParzisStarWarsMod/releases", "https://api.github.com/repos/Parzivail-Modding-Team/ParziStarWarsMod/releases"];
				for (var urlIdx = 0; urlIdx < urls.length; urlIdx++)
				{
					var url = urls[urlIdx];
					$.getJSON(url, function (data) {
						data = data.filter(function (i) {
							return i.assets && i.assets.length > 0
						});

						data.forEach(function (i) {
							app.downloads.total += i.assets[0].download_count;
						});

						app.releases = app.releases.concat(data.map(function (item, idx) {
							var entry = {
								latest: false,
								dlname: item.name,
								prerelease: item.prerelease,
								downloads: item.assets[0].download_count,
								linkChangelog: item.html_url,
								linkDownload: item.assets[0].browser_download_url,
								age: moment(item.published_at).fromNow(),
								isPswm: item.name.indexOf("PSWM") === 0
							};
							return entry;
						}));
					});
				}
				var latestRelease = app.releases[0];
				latestRelease.latest = true;
				Vue.set(app.downloads, 0, latestRelease);
				app.downloads.mostRecent = app.releases[0].downloads;
			}
		}
	});

	app.loadReleases();

	myParaxify = paraxify('.paraxify');
});
