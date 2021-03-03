import { fromXmile } from '@system-dynamics/importer';
import { open } from '@system-dynamics/engine';

async function simulateModel(xmileModel: string): Promise<void> {
    const pb = await fromXmile(xmileModel);
    const engine = await open(pb);

    const simError = engine.getSimError();
    if (simError) {
        console.log(`simulation error: ${simError.getDetails()} (code: ${simError.code})`);
        return;
    }

    engine.simRunToEnd();

    let varNames = engine.simVarNames();
    varNames.sort();
    varNames = varNames.filter(n => n !== 'time');
    varNames.unshift('time');

    const time = engine.simSeries('time');
    const data = new Map(varNames.map((ident) => [ident, { name: ident, time, values: engine.simSeries(ident) }]));

    engine.simClose();

    // output a tsv to stdout
    console.log(varNames.join('\t'));
    for (let i = 0; i < time.length; i++) {
        const row = [];
        for (const name of varNames) {
            row.push(data.get(name).values[i]);
        }
        console.log(row.join('\t'));
    }
}

setTimeout(async () => {
    await simulateModel(xmileModel);
});

// contents of 'uitsnede2.xmile' -- fetch using whatever you normally use
const xmileModel = `<?xml version="1.0" encoding="utf-8"?>
<xmile version="1.0" xmlns="http://docs.oasis-open.org/xmile/ns/XMILE/v1.0" xmlns:isee="http://iseesystems.com/XMILE">
	<header>
		<smile version="1.0" namespace="std, isee" uses_submodels=""/>
		<name>uitsnede2</name>
		<uuid>fd1b315c-ff5b-4d85-aa05-31f47931bf20</uuid>
		<vendor>isee systems, inc.</vendor>
		<product version="2.0" isee:build_number="2190" isee:saved_by_v1="true" lang="en">Stella Architect</product>
	</header>
	<sim_specs isee:sim_duration="1.5" isee:simulation_delay="0.125" isee:restore_on_start="false" method="Euler" time_units="Months" isee:instantaneous_flows="false" isee:loop_scores="true" isee:loop_exhaustive_allowed="1000">
		<start>1</start>
		<stop>13</stop>
		<dt reciprocal="true">4</dt>
	</sim_specs>
	<isee:prefs show_module_prefix="true" live_update_on_drag="true" show_restore_buttons="false" layer="model" interface_scale_ui="true" interface_max_page_width="10000" interface_max_page_height="10000" interface_min_page_width="0" interface_min_page_height="0" rerun_on_structure_change="false" saved_runs="5" keep="false" rifp="true"/>
	<isee:multiplayer_settings include_chat="true" allow_observers="false" advance_time_increment="1" observer_start_page="home_page" enabled="false"/>
	<isee:time_formats default_format="Builtin">
		<isee:time_format name="Builtin" type="adaptive"/>
	</isee:time_formats>
	<default_format/>
	<model_units/>
	<model>
		<variables>
			<module name="Module 1" isee:label="">
				<connect to="ghost_module.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte" from="Module_1.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte"/>
				<connect2 to="ghost_module.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte" from="Module_1.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte"/>
			</module>
			<module name="ghost module" isee:label="">
				<connect to="ghost_module.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte" from="Module_1.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte"/>
				<connect2 to="ghost_module.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte" from="Module_1.Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte"/>
			</module>
		</variables>
		<views>
			<style color="black" background="white" font_style="normal" font_weight="normal" text_decoration="none" text_align="center" vertical_text_align="center" font_color="black" font_family="Arial" font_size="10pt" padding="2" border_color="black" border_width="thin" border_style="none">
				<text_box color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
				<isee:loop_indicator color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
				<numeric_display color="blue" background="white" font_size="9pt" isee:transparent="false"/>
				<graph color="black" background="white" font_size="12pt" axis_color="#666666" grid_color="#C8C8C8" isee:graph_area_color="white" legend_position="bottom" isee:transparent="false" isee:hide_border="false" axis_title_font_style="normal" axis_title_font_weight="normal" axis_title_text_decoration="none" axis_title_text_align="center" axis_title_vertical_text_align="center" axis_title_font_color="black" axis_title_font_family="Arial" axis_title_font_size="12pt" axis_title_text_padding="2" axis_title_text_border_color="black" axis_title_text_border_width="thin" axis_title_text_border_style="none" axis_label_font_style="normal" axis_label_font_weight="normal" axis_label_text_decoration="none" axis_label_text_align="center" axis_label_vertical_text_align="center" axis_label_font_color="black" axis_label_font_family="Arial" axis_label_font_size="9pt" axis_label_text_padding="2" axis_label_text_border_color="black" axis_label_text_border_width="thin" axis_label_text_border_style="none">
					<isee:series_styles>
						<isee:series_style color="blue" thickness="1"/>
						<isee:series_style color="red" thickness="1" pen_style="dot_dashed"/>
						<isee:series_style color="fuchsia" thickness="1" pen_style="dotted"/>
						<isee:series_style color="#008F44" thickness="1" pen_style="dashed"/>
						<isee:series_style color="#FF7F00" thickness="1"/>
						<isee:series_style color="#7F00FF" thickness="1" pen_style="dot_dashed"/>
						<isee:series_style color="#0CA0FF" thickness="1" pen_style="dotted"/>
						<isee:series_style color="lime" thickness="1" pen_style="dashed"/>
						<isee:series_style color="#FF007F" thickness="1"/>
						<isee:series_style color="aqua" thickness="1" pen_style="dot_dashed"/>
						<isee:series_style color="#F586FF" thickness="1" pen_style="dotted"/>
						<isee:series_style color="black" thickness="1" pen_style="dashed"/>
						<isee:series_style color="#C8C8C8" thickness="1"/>
					</isee:series_styles>
				</graph>
				<table color="black" background="#E0E0E0" text_align="right" font_size="12pt" orientation="vertical" wrap_text="false" isee:auto_fit="true" isee:use_alternate_row_colors="false" isee:unlimited_table_length="false" blank_column_width="80" column_width="160" interval="1" report_balances="ending" report_flows="summed" header_font_style="normal" header_font_weight="normal" header_text_decoration="none" header_text_align="center" header_vertical_text_align="center" header_font_color="black" header_font_family="Arial" header_font_size="12pt" header_text_padding="2" header_text_border_color="black" header_text_border_width="thin" header_text_border_style="none"/>
				<button color="black" background="#E0E0E0" font_size="12pt" border_width="thin" border_style="solid" transparent="false" corner_radius="0" isee:flat="false" icon_side="top" isee:highlight_on_hover="false" isee:highlight_color="#959595"/>
				<isee:annotation color="black" background="#E0E0E0" font_size="12pt" border_width="thin" border_style="solid" transparent="false" corner_radius="0" isee:flat="false" icon_side="top" isee:highlight_on_hover="false" isee:highlight_color="#959595" popup_corner_radius="0" popup_background_color="#FFFECF"/>
				<slider color="#66CC66" background="#E0E0E0" font_size="12pt" num_ticks="3" label_side="top" wrap_title="true" vertical="false" isee:fancy_appearance="false" isee:show_hover_tip="when_deciding" input_expands="true" input_width="100"/>
				<isee:sim_speed_slider color="black" background="white"/>
				<isee:time_slider color="#E95F74" background="silver"/>
				<isee:pie_input color="black" background="white" font_size="12pt" legend_position="bottom" isee:transparent="false"/>
				<knob color="#66CC66" background="#E0E0E0" font_size="12pt" label_side="bottom" wrap_title="true"/>
				<numeric_input color="black" background="#E0E0E0" font_size="12pt" label_side="left" wrap_title="true" input_expands="false" input_width="100"/>
				<switch color="black" background="#E0E0E0" font_size="12pt" label_side="top" wrap_title="true" isee:appearance="switch" isee:on_color="green"/>
				<options color="black" background="white" appearance="radio-buttons" arrangement="vertical"/>
				<graphical_input color="black" background="#E0E0E0" font_size="12pt" isee:show_hover_tip="true"/>
				<group_input color="black" background="#E0E0E0" font_size="12pt"/>
				<lamp color="black" background="white" font_size="9pt"/>
				<gauge color="black" background="white" font_size="9pt" needle_color="#F09F72" bar_color="#EEEEEE" bar_progress_color="black" appearance="radial" num_major_ticks="11" num_minor_ticks="11" show_numeric_value="true"/>
				<isee:spatial_map color="black" background="white" font_size="12pt"/>
				<isee:animation_object color="black" background="white" font_size="12pt"/>
				<isee:navigation_widget color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt" border_color="#999999" border_width="thin" border_style="solid" item_spacing="6" appearance="tabs" corner_radius="4" selected_item_color="black" selected_item_background="white" item_background="#DDDDDD"/>
				<isee:shape color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt" border_width="thin" border_style="solid" opacity="1" transparent_background="true"/>
				<isee:selector color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
				<isee:iframe color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt" border_width="thin" border_style="solid"/>
				<isee:financial_table color="black" background="#E0E0E0" text_align="right" font_size="12pt" auto_fit="true" first_column_width="250" other_column_width="100" header_font_style="normal" header_font_weight="bold" header_text_decoration="none" header_text_align="center" header_vertical_text_align="center" header_font_color="black" header_font_family="Arial" header_font_size="14pt" header_text_padding="2" header_text_border_color="black" header_text_border_width="thin" header_text_border_style="none"/>
			</style>
			<view isee:show_pages="false" background="white" page_width="1000" page_height="760" isee:page_cols="2" isee:popup_graphs_are_comparative="true" isee:enable_non_negative_highlights="false" type="stock_flow">
				<style color="black" background="white" font_style="normal" font_weight="normal" text_decoration="none" text_align="center" vertical_text_align="center" font_color="black" font_family="Arial" font_size="10pt" padding="2" border_color="black" border_width="thin" border_style="none">
					<stock color="blue" background="white" font_color="blue" font_size="9pt" label_side="top">
						<shape type="rectangle" width="45" height="35"/>
					</stock>
					<flow color="blue" background="white" font_color="blue" font_size="9pt" label_side="bottom"/>
					<isee:placeholder color="#228B22" background="white" font_color="#228B22" font_size="9pt" label_side="bottom"/>
					<module color="blue" background="white" font_color="blue" font_size="9pt" label_side="top">
						<shape type="rectangle" width="55" height="45"/>
					</module>
					<aux color="blue" background="white" font_color="blue" font_size="9pt" label_side="bottom">
						<shape type="circle" radius="18"/>
					</aux>
					<group color="red" background="white" font_color="red" font_size="9pt"/>
					<connector color="#FF007F" background="white" font_color="#FF007F" font_size="9pt" isee:thickness="1"/>
					<text_box color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
					<isee:loop_indicator color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
					<numeric_display color="blue" background="white" font_size="9pt" isee:transparent="false"/>
					<graph color="black" background="white" font_size="12pt" axis_color="#666666" grid_color="#C8C8C8" isee:graph_area_color="white" legend_position="bottom" isee:transparent="false" isee:hide_border="false" axis_title_font_style="normal" axis_title_font_weight="normal" axis_title_text_decoration="none" axis_title_text_align="center" axis_title_vertical_text_align="center" axis_title_font_color="black" axis_title_font_family="Arial" axis_title_font_size="12pt" axis_title_text_padding="2" axis_title_text_border_color="black" axis_title_text_border_width="thin" axis_title_text_border_style="none" axis_label_font_style="normal" axis_label_font_weight="normal" axis_label_text_decoration="none" axis_label_text_align="center" axis_label_vertical_text_align="center" axis_label_font_color="black" axis_label_font_family="Arial" axis_label_font_size="9pt" axis_label_text_padding="2" axis_label_text_border_color="black" axis_label_text_border_width="thin" axis_label_text_border_style="none">
						<isee:series_styles>
							<isee:series_style color="blue" thickness="1"/>
							<isee:series_style color="red" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="fuchsia" thickness="1" pen_style="dotted"/>
							<isee:series_style color="#008F44" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#FF7F00" thickness="1"/>
							<isee:series_style color="#7F00FF" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="#0CA0FF" thickness="1" pen_style="dotted"/>
							<isee:series_style color="lime" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#FF007F" thickness="1"/>
							<isee:series_style color="aqua" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="#F586FF" thickness="1" pen_style="dotted"/>
							<isee:series_style color="black" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#C8C8C8" thickness="1"/>
						</isee:series_styles>
					</graph>
					<table color="black" background="#E0E0E0" text_align="right" font_size="12pt" orientation="vertical" wrap_text="false" isee:auto_fit="true" isee:use_alternate_row_colors="false" isee:unlimited_table_length="false" blank_column_width="80" column_width="160" interval="1" report_balances="ending" report_flows="summed" header_font_style="normal" header_font_weight="normal" header_text_decoration="none" header_text_align="center" header_vertical_text_align="center" header_font_color="black" header_font_family="Arial" header_font_size="12pt" header_text_padding="2" header_text_border_color="black" header_text_border_width="thin" header_text_border_style="none"/>
				</style>
				<module x="698.75" y="266.5" width="79" height="45" name="Module 1"/>
				<module x="738.25" y="406" name="ghost module"/>
				<connector uid="1" isee:thickness="2" angle="295" isee:autocreated="true">
					<from>Module_1</from>
					<to>ghost_module</to>
				</connector>
			</view>
			<view background="white" page_width="1066" page_height="600" home_view="true" type="interface">
				<style/>
			</view>
			<isee:templates>
				<view background="white" page_width="1066" page_height="600" type="template">
					<style/>
				</view>
			</isee:templates>
			<isee:stories/>
		</views>
	</model>
	<model name="ghost_module">
		<variables>
			<aux name="Vervulling basisbehoeften effect op\nBevlogenheid\nGem Sterkte" access="input">
				<eqn>{Enter equation for use when not hooked up to other models}</eqn>
			</aux>
			<aux name="extra">
				<eqn>Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte*variabele</eqn>
			</aux>
			<aux name="variabele">
				<eqn>2</eqn>
			</aux>
		</variables>
		<views>
			<view isee:show_pages="false" background="white" page_width="1000" page_height="760" isee:popup_graphs_are_comparative="true" isee:enable_non_negative_highlights="false" type="stock_flow">
				<style color="black" background="white" font_style="normal" font_weight="normal" text_decoration="none" text_align="center" vertical_text_align="center" font_color="black" font_family="Arial" font_size="10pt" padding="2" border_color="black" border_width="thin" border_style="none">
					<stock color="blue" background="white" font_color="blue" font_size="9pt" label_side="top">
						<shape type="rectangle" width="45" height="35"/>
					</stock>
					<flow color="blue" background="white" font_color="blue" font_size="9pt" label_side="bottom"/>
					<isee:placeholder color="#228B22" background="white" font_color="#228B22" font_size="9pt" label_side="bottom"/>
					<module color="blue" background="white" font_color="blue" font_size="9pt" label_side="top">
						<shape type="rectangle" width="55" height="45"/>
					</module>
					<aux color="blue" background="white" font_color="blue" font_size="9pt" label_side="bottom">
						<shape type="circle" radius="18"/>
					</aux>
					<group color="red" background="white" font_color="red" font_size="9pt"/>
					<connector color="#FF007F" background="white" font_color="#FF007F" font_size="9pt" isee:thickness="1"/>
					<text_box color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
					<isee:loop_indicator color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
					<numeric_display color="blue" background="white" font_size="9pt" isee:transparent="false"/>
					<graph color="black" background="white" font_size="12pt" axis_color="#666666" grid_color="#C8C8C8" isee:graph_area_color="white" legend_position="bottom" isee:transparent="false" isee:hide_border="false" axis_title_font_style="normal" axis_title_font_weight="normal" axis_title_text_decoration="none" axis_title_text_align="center" axis_title_vertical_text_align="center" axis_title_font_color="black" axis_title_font_family="Arial" axis_title_font_size="12pt" axis_title_text_padding="2" axis_title_text_border_color="black" axis_title_text_border_width="thin" axis_title_text_border_style="none" axis_label_font_style="normal" axis_label_font_weight="normal" axis_label_text_decoration="none" axis_label_text_align="center" axis_label_vertical_text_align="center" axis_label_font_color="black" axis_label_font_family="Arial" axis_label_font_size="9pt" axis_label_text_padding="2" axis_label_text_border_color="black" axis_label_text_border_width="thin" axis_label_text_border_style="none">
						<isee:series_styles>
							<isee:series_style color="blue" thickness="1"/>
							<isee:series_style color="red" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="fuchsia" thickness="1" pen_style="dotted"/>
							<isee:series_style color="#008F44" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#FF7F00" thickness="1"/>
							<isee:series_style color="#7F00FF" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="#0CA0FF" thickness="1" pen_style="dotted"/>
							<isee:series_style color="lime" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#FF007F" thickness="1"/>
							<isee:series_style color="aqua" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="#F586FF" thickness="1" pen_style="dotted"/>
							<isee:series_style color="black" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#C8C8C8" thickness="1"/>
						</isee:series_styles>
					</graph>
					<table color="black" background="#E0E0E0" text_align="right" font_size="12pt" orientation="vertical" wrap_text="false" isee:auto_fit="true" isee:use_alternate_row_colors="false" isee:unlimited_table_length="false" blank_column_width="80" column_width="160" interval="1" report_balances="ending" report_flows="summed" header_font_style="normal" header_font_weight="normal" header_text_decoration="none" header_text_align="center" header_vertical_text_align="center" header_font_color="black" header_font_family="Arial" header_font_size="12pt" header_text_padding="2" header_text_border_color="black" header_text_border_width="thin" header_text_border_style="none"/>
				</style>
				<aux font_style="italic" font_weight="bold" x="458" y="210" name="Vervulling basisbehoeften effect op\nBevlogenheid\nGem Sterkte"/>
				<aux x="469" y="327" name="extra"/>
				<aux x="627" y="265" name="variabele"/>
				<connector uid="2" angle="278.13">
					<pts>
						<pt x="459.273" y="218.91"/>
						<pt x="450" y="310"/>
						<pt x="460.414" y="329.7"/>
					</pts>
					<from>Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte</from>
					<to>extra</to>
				</connector>
				<connector uid="3" angle="182.603">
					<from>variabele</from>
					<to>extra</to>
				</connector>
			</view>
		</views>
	</model>
	<model name="Module_1">
		<variables>
			<aux name="Input ondergrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid voor simulatie">
				<eqn>Input_ondergrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid*aanpasfactor</eqn>
			</aux>
			<aux name="Input bovengrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid voor simulatie">
				<eqn>aanpasfactor*Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid</eqn>
			</aux>
			<aux name="Vervulling basisbehoeften effect op\nBevlogenheid\nGem Sterkte" access="output" isee:autocreated="true">
				<eqn>MEAN(Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie, Input_ondergrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie)</eqn>
			</aux>
			<aux name="deviatie voor sterkte\nVervulling basisbehoeften\neffect op\nBevlogenheid" access="output" isee:autocreated="true">
				<eqn>Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie-Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte</eqn>
			</aux>
			<aux name="Input bovengrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid" access="output" isee:autocreated="true">
				<eqn>1</eqn>
			</aux>
			<aux name="Input ondergrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid">
				<eqn>0.3</eqn>
			</aux>
			<aux name="aanpasfactor">
				<eqn>0.7</eqn>
			</aux>
		</variables>
		<views>
			<view isee:show_pages="false" background="white" page_width="1000" page_height="760" isee:page_cols="2" isee:popup_graphs_are_comparative="true" isee:enable_non_negative_highlights="false" type="stock_flow">
				<style color="black" background="white" font_style="normal" font_weight="normal" text_decoration="none" text_align="center" vertical_text_align="center" font_color="black" font_family="Arial" font_size="10pt" padding="2" border_color="black" border_width="thin" border_style="none">
					<stock color="blue" background="white" font_color="blue" font_size="9pt" label_side="top">
						<shape type="rectangle" width="45" height="35"/>
					</stock>
					<flow color="blue" background="white" font_color="blue" font_size="9pt" label_side="bottom"/>
					<isee:placeholder color="#228B22" background="white" font_color="#228B22" font_size="9pt" label_side="bottom"/>
					<module color="blue" background="white" font_color="blue" font_size="9pt" label_side="top">
						<shape type="rectangle" width="55" height="45"/>
					</module>
					<aux color="blue" background="white" font_color="blue" font_size="9pt" label_side="bottom">
						<shape type="circle" radius="18"/>
					</aux>
					<group color="red" background="white" font_color="red" font_size="9pt"/>
					<connector color="#FF007F" background="white" font_color="#FF007F" font_size="9pt" isee:thickness="1"/>
					<text_box color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
					<isee:loop_indicator color="black" background="white" text_align="left" vertical_text_align="top" font_size="12pt"/>
					<numeric_display color="blue" background="white" font_size="9pt" isee:transparent="false"/>
					<graph color="black" background="white" font_size="12pt" axis_color="#666666" grid_color="#C8C8C8" isee:graph_area_color="white" legend_position="bottom" isee:transparent="false" isee:hide_border="false" axis_title_font_style="normal" axis_title_font_weight="normal" axis_title_text_decoration="none" axis_title_text_align="center" axis_title_vertical_text_align="center" axis_title_font_color="black" axis_title_font_family="Arial" axis_title_font_size="12pt" axis_title_text_padding="2" axis_title_text_border_color="black" axis_title_text_border_width="thin" axis_title_text_border_style="none" axis_label_font_style="normal" axis_label_font_weight="normal" axis_label_text_decoration="none" axis_label_text_align="center" axis_label_vertical_text_align="center" axis_label_font_color="black" axis_label_font_family="Arial" axis_label_font_size="9pt" axis_label_text_padding="2" axis_label_text_border_color="black" axis_label_text_border_width="thin" axis_label_text_border_style="none">
						<isee:series_styles>
							<isee:series_style color="blue" thickness="1"/>
							<isee:series_style color="red" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="fuchsia" thickness="1" pen_style="dotted"/>
							<isee:series_style color="#008F44" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#FF7F00" thickness="1"/>
							<isee:series_style color="#7F00FF" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="#0CA0FF" thickness="1" pen_style="dotted"/>
							<isee:series_style color="lime" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#FF007F" thickness="1"/>
							<isee:series_style color="aqua" thickness="1" pen_style="dot_dashed"/>
							<isee:series_style color="#F586FF" thickness="1" pen_style="dotted"/>
							<isee:series_style color="black" thickness="1" pen_style="dashed"/>
							<isee:series_style color="#C8C8C8" thickness="1"/>
						</isee:series_styles>
					</graph>
					<table color="black" background="#E0E0E0" text_align="right" font_size="12pt" orientation="vertical" wrap_text="false" isee:auto_fit="true" isee:use_alternate_row_colors="false" isee:unlimited_table_length="false" blank_column_width="80" column_width="160" interval="1" report_balances="ending" report_flows="summed" header_font_style="normal" header_font_weight="normal" header_text_decoration="none" header_text_align="center" header_vertical_text_align="center" header_font_color="black" header_font_family="Arial" header_font_size="12pt" header_text_padding="2" header_text_border_color="black" header_text_border_width="thin" header_text_border_style="none"/>
				</style>
				<aux x="402.25" y="183.083" width="15" height="15" name="Input ondergrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid voor simulatie"/>
				<aux label_side="bottom" x="645.08" y="209.583" name="Input bovengrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid voor simulatie"/>
				<aux color="black" background="#FF7300" font_color="black" x="811" y="199.75" name="Vervulling basisbehoeften effect op\nBevlogenheid\nGem Sterkte"/>
				<aux color="black" background="#FF7300" font_color="black" label_side="bottom" x="1031.75" y="192.25" width="15" height="15" name="deviatie voor sterkte\nVervulling basisbehoeften\neffect op\nBevlogenheid"/>
				<connector uid="4" angle="0">
					<from>Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte</from>
					<to>deviatie_voor_sterkte_Vervulling_basisbehoeften_effect_op_Bevlogenheid</to>
				</connector>
				<connector uid="5" angle="328.231">
					<from>Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</from>
					<to>deviatie_voor_sterkte_Vervulling_basisbehoeften_effect_op_Bevlogenheid</to>
				</connector>
				<connector uid="6" angle="14.3846">
					<from>Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</from>
					<to>Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte</to>
				</connector>
				<connector uid="7" angle="30.109">
					<from>Input_ondergrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</from>
					<to>Vervulling_basisbehoeften_effect_op_Bevlogenheid_Gem_Sterkte</to>
				</connector>
				<aux background="#AA0000" x="98" y="255.833" width="18" height="18" name="Input bovengrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid"/>
				<connector uid="8" angle="355.828">
					<from>Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid</from>
					<to>Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</to>
				</connector>
				<aux background="#AA0000" x="91.5" y="183.083" width="17.5" height="17.5" name="Input ondergrens sterkte van\nVervulling basisbehoeften\nop Bevlogenheid"/>
				<connector uid="9" angle="0.231403">
					<from>Input_ondergrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid</from>
					<to>Input_ondergrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</to>
				</connector>
				<aux label_side="right" label_angle="315" x="558" y="305" name="aanpasfactor"/>
				<connector uid="10" angle="102.529">
					<from>aanpasfactor</from>
					<to>Input_ondergrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</to>
				</connector>
				<connector uid="11" angle="47.6156">
					<from>aanpasfactor</from>
					<to>Input_bovengrens_sterkte_van_Vervulling_basisbehoeften_op_Bevlogenheid_voor_simulatie</to>
				</connector>
			</view>
		</views>
	</model>
</xmile>
`;
