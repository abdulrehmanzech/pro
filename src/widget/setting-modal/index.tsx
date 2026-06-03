/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, createEffect, For, createSignal, onMount, onCleanup } from 'solid-js'
import { Styles, utils, DeepPartial, LineType } from 'klinecharts'

import lodashSet from 'lodash/set'

import { Modal, Select, Switch } from '../../component'
import type { SelectDataSourceItem } from '../../component'

import i18n from '../../i18n'
import { getOptions } from './data'

export interface SettingModalProps {
  locale: string
  currentStyles: Styles
  defaultStyles?: Styles
  currentBackgroundColor?: string
  defaultBackgroundColor?: string
  onClose: () => void
  onChange: (style: DeepPartial<Styles>) => void
  onSaveChartStyle?: (style: ChartStyleUpdate) => void
  onResetChartStyle?: () => void
  onRestoreDefault: (options: SelectDataSourceItem[]) => void
}

type ModalTab = 'settings' | 'chartStyle'
type ChartStyleTab = 'symbol' | 'background'
type ChartStyleUpdate = DeepPartial<Styles> & { chart?: { backgroundColor?: string } }

const chartBackgroundColorKey = 'chart.backgroundColor'
const fallbackBackgroundColor = '#171a27'

const colorPalette = [
  '#f6465d', '#f59e0b', '#fcd535', '#2ebd85', '#4098a8', '#22c1dc', '#3861fb', '#7b3fe4',
  '#ec8aa4', '#f7c56b', '#fff0a3', '#9ed4a4', '#83c7bb', '#8bdce6', '#8bb9f7', '#b7a1dc',
  '#c9343e', '#e76f20', '#f0b93a', '#3f8d3a', '#236e5a', '#237c88', '#1d3fbf', '#3a209f',
  '#ffffff', '#cbd5e1', '#9ca3af', '#6b7280', '#374151', '#111827', '#000000'
]

const lineStyleOptions: SelectDataSourceItem[] = [
  { key: LineType.Solid, text: 'Solid' },
  { key: LineType.Dashed, text: 'Dashed' }
]

const lineWidthOptions = [1, 2, 3, 4]

const chartStyleRestoreOptions: SelectDataSourceItem[] = [
  { key: 'candle.type', text: 'Candle Type' },
  { key: 'candle.bar.upColor', text: 'Up Color' },
  { key: 'candle.bar.downColor', text: 'Down Color' },
  { key: 'candle.bar.noChangeColor', text: 'No Change Color' },
  { key: 'candle.bar.upBorderColor', text: 'Border Up Color' },
  { key: 'candle.bar.downBorderColor', text: 'Border Down Color' },
  { key: 'candle.bar.noChangeBorderColor', text: 'Border No Change Color' },
  { key: 'candle.bar.upWickColor', text: 'Wick Up Color' },
  { key: 'candle.bar.downWickColor', text: 'Wick Down Color' },
  { key: 'candle.bar.noChangeWickColor', text: 'Wick No Change Color' },
  { key: chartBackgroundColorKey, text: 'Background Color' },
  { key: 'grid.horizontal.show', text: 'Horizontal Grids' },
  { key: 'grid.horizontal.color', text: 'Horizontal Grid Color' },
  { key: 'grid.horizontal.style', text: 'Horizontal Grid Style' },
  { key: 'grid.horizontal.size', text: 'Horizontal Grid Size' },
  { key: 'grid.horizontal.dashedValue', text: 'Horizontal Grid Dash' },
  { key: 'grid.vertical.show', text: 'Vertical Grids' },
  { key: 'grid.vertical.color', text: 'Vertical Grid Color' },
  { key: 'grid.vertical.style', text: 'Vertical Grid Style' },
  { key: 'grid.vertical.size', text: 'Vertical Grid Size' },
  { key: 'grid.vertical.dashedValue', text: 'Vertical Grid Dash' }
]

const createChartStyleDraft = (styles: Styles, backgroundColor = fallbackBackgroundColor): Styles => {
  const draft = utils.clone(styles)
  const upColor = utils.formatValue(draft, 'candle.bar.upColor') as string
  const downColor = utils.formatValue(draft, 'candle.bar.downColor') as string
  const noChangeColor = utils.formatValue(draft, 'candle.bar.noChangeColor') as string

  lodashSet(draft, 'candle.bar.upBorderColor', utils.formatValue(draft, 'candle.bar.upBorderColor', upColor))
  lodashSet(draft, 'candle.bar.downBorderColor', utils.formatValue(draft, 'candle.bar.downBorderColor', downColor))
  lodashSet(draft, 'candle.bar.noChangeBorderColor', utils.formatValue(draft, 'candle.bar.noChangeBorderColor', noChangeColor))
  lodashSet(draft, 'candle.bar.upWickColor', utils.formatValue(draft, 'candle.bar.upWickColor', upColor))
  lodashSet(draft, 'candle.bar.downWickColor', utils.formatValue(draft, 'candle.bar.downWickColor', downColor))
  lodashSet(draft, 'candle.bar.noChangeWickColor', utils.formatValue(draft, 'candle.bar.noChangeWickColor', noChangeColor))
  lodashSet(draft, chartBackgroundColorKey, backgroundColor)

  return draft
}

const getDefaultChartStyleValue = (
  styles: Styles,
  key: string,
  defaultBackgroundColor?: string
) => {
  if (key === chartBackgroundColorKey) {
    return defaultBackgroundColor ?? fallbackBackgroundColor
  }

  const fallbackByKey: Record<string, string> = {
    'candle.bar.upBorderColor': 'candle.bar.upColor',
    'candle.bar.downBorderColor': 'candle.bar.downColor',
    'candle.bar.noChangeBorderColor': 'candle.bar.noChangeColor',
    'candle.bar.upWickColor': 'candle.bar.upColor',
    'candle.bar.downWickColor': 'candle.bar.downColor',
    'candle.bar.noChangeWickColor': 'candle.bar.noChangeColor'
  }
  const fallbackKey = fallbackByKey[key]
  if (fallbackKey) {
    return utils.formatValue(styles, fallbackKey)
  }
  return utils.formatValue(
    styles,
    key,
    utils.formatValue(createChartStyleDraft(styles), key)
  )
}

const SettingModal: Component<SettingModalProps> = props => {
  const [styles, setStyles] = createSignal(props.currentStyles)
  const [draftStyles, setDraftStyles] = createSignal(
    createChartStyleDraft(props.currentStyles, props.currentBackgroundColor ?? fallbackBackgroundColor)
  )
  const [options, setOptions] = createSignal(getOptions(props.locale))
  const [isMobile, setIsMobile] = createSignal(false)
  const [activeTab, setActiveTab] = createSignal<ModalTab>('settings')
  const [activeChartStyleTab, setActiveChartStyleTab] = createSignal<ChartStyleTab>('symbol')
  const [activeColorKey, setActiveColorKey] = createSignal<string | null>(null)
  const [activeLineWidthKey, setActiveLineWidthKey] = createSignal<string | null>(null)

  // Check if device is mobile
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  onMount(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }
      if (
        target.closest('.chart-style-color-picker') ||
        target.closest('.chart-style-width-picker') ||
        target.closest('.klinecharts-pro-select')
      ) {
        return
      }
      setActiveColorKey(null)
      setActiveLineWidthKey(null)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    document.addEventListener('mousedown', handleDocumentMouseDown)

    onCleanup(() => {
      document.removeEventListener('mousedown', handleDocumentMouseDown)
    })
  })

  onCleanup(() => {
    window.removeEventListener('resize', checkMobile)
  })

  createEffect(() => {
    setOptions(getOptions(props.locale))
  })

  const update = (option: SelectDataSourceItem, newValue: any) => {
    const style = {}
    lodashSet(style, option.key, newValue)
    const ss = utils.clone(styles())
    lodashSet(ss, option.key, newValue)
    setStyles(ss)
    setOptions(options().map(op => ({ ...op })))
    props.onChange(style)
  }

  const formatDraftValue = (key: string, fallback?: unknown) => {
    return utils.formatValue(draftStyles(), key, fallback)
  }

  const updateDraft = (key: string, newValue: any) => {
    const nextStyles = utils.clone(draftStyles())
    lodashSet(nextStyles, key, newValue)
    setDraftStyles(nextStyles)
    props.onChange(buildChartStyleUpdate(nextStyles))
  }

  const buildChartStyleUpdate = (source: Styles): ChartStyleUpdate => {
    return {
      chart: {
        backgroundColor: utils.formatValue(source, chartBackgroundColorKey, fallbackBackgroundColor) as string
      },
      candle: {
        type: utils.formatValue(source, 'candle.type') as any,
        bar: {
          upColor: utils.formatValue(source, 'candle.bar.upColor') as string,
          downColor: utils.formatValue(source, 'candle.bar.downColor') as string,
          noChangeColor: utils.formatValue(source, 'candle.bar.noChangeColor') as string,
          upBorderColor: utils.formatValue(source, 'candle.bar.upBorderColor', utils.formatValue(source, 'candle.bar.upColor')) as string,
          downBorderColor: utils.formatValue(source, 'candle.bar.downBorderColor', utils.formatValue(source, 'candle.bar.downColor')) as string,
          noChangeBorderColor: utils.formatValue(source, 'candle.bar.noChangeBorderColor', utils.formatValue(source, 'candle.bar.noChangeColor')) as string,
          upWickColor: utils.formatValue(source, 'candle.bar.upWickColor', utils.formatValue(source, 'candle.bar.upColor')) as string,
          downWickColor: utils.formatValue(source, 'candle.bar.downWickColor', utils.formatValue(source, 'candle.bar.downColor')) as string,
          noChangeWickColor: utils.formatValue(source, 'candle.bar.noChangeWickColor', utils.formatValue(source, 'candle.bar.noChangeColor')) as string
        } as any
      },
      grid: {
        horizontal: {
          show: !!utils.formatValue(source, 'grid.horizontal.show'),
          color: utils.formatValue(source, 'grid.horizontal.color') as string,
          style: utils.formatValue(source, 'grid.horizontal.style') as LineType,
          size: Number(utils.formatValue(source, 'grid.horizontal.size', 1)),
          dashedValue: utils.formatValue(source, 'grid.horizontal.dashedValue', [2, 2]) as number[]
        },
        vertical: {
          show: !!utils.formatValue(source, 'grid.vertical.show'),
          color: utils.formatValue(source, 'grid.vertical.color') as string,
          style: utils.formatValue(source, 'grid.vertical.style') as LineType,
          size: Number(utils.formatValue(source, 'grid.vertical.size', 1)),
          dashedValue: utils.formatValue(source, 'grid.vertical.dashedValue', [2, 2]) as number[]
        }
      }
    }
  }

  const saveChartStyle = () => {
    const updateStyle = buildChartStyleUpdate(draftStyles())
    setStyles(utils.clone(draftStyles()))
    props.onChange(updateStyle)
    props.onSaveChartStyle?.(updateStyle)
    props.onClose()
  }

  const resetChartStyle = () => {
    props.onResetChartStyle?.()
    const defaultStyles = props.defaultStyles
    if (defaultStyles) {
      const nextDraft = utils.clone(draftStyles())
      chartStyleRestoreOptions.forEach(option => {
        lodashSet(
          nextDraft,
          option.key,
          getDefaultChartStyleValue(defaultStyles, option.key, props.defaultBackgroundColor)
        )
      })
      setDraftStyles(nextDraft)
      setStyles(utils.clone(nextDraft))
      props.onChange(buildChartStyleUpdate(nextDraft))
    } else {
      props.onRestoreDefault(chartStyleRestoreOptions)
      setDraftStyles(utils.clone(props.currentStyles))
    }
  }

  const renderColorPicker = (key: string, pickerId = key) => {
    const value = formatDraftValue(key, '#ffffff') as string
    return (
      <div class="chart-style-color-picker">
        <button
          type="button"
          class="chart-style-color-swatch"
          style={{ background: value }}
          onClick={() => {
            setActiveColorKey(activeColorKey() === pickerId ? null : pickerId)
          }}/>
        {activeColorKey() === pickerId && (
          <div class="chart-style-color-popover">
            <div class="chart-style-color-grid">
              <For each={colorPalette}>
                {color => (
                  <button
                    type="button"
                    class="chart-style-palette-color"
                    classList={{ selected: color.toLowerCase() === value.toLowerCase() }}
                    style={{ background: color }}
                    onClick={() => {
                      updateDraft(key, color)
                      setActiveColorKey(null)
                    }}/>
                )}
              </For>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderLineControl = (prefix: string) => {
    const styleKey = `${prefix}.style`
    const colorKey = `${prefix}.color`
    const sizeKey = `${prefix}.size`
    const lineStyle = formatDraftValue(styleKey, LineType.Dashed) as string
    const lineSize = Math.max(1, Number(formatDraftValue(sizeKey, 1)))
    return (
      <div class="chart-style-line-control">
        <Select
          style={{ width: isMobile() ? '100%' : '134px' }}
          value={lineStyle === LineType.Solid ? 'Solid' : 'Dashed'}
          dataSource={lineStyleOptions}
          onSelected={(data) => {
            const newValue = (data as SelectDataSourceItem).key
            updateDraft(styleKey, newValue)
            updateDraft(`${prefix}.dashedValue`, newValue === LineType.Solid ? [] : [2, 2])
          }}/>
        <div class="chart-style-width-picker">
          <button
            type="button"
            class="chart-style-size-button"
            onClick={() => {
              setActiveLineWidthKey(activeLineWidthKey() === sizeKey ? null : sizeKey)
            }}>
            <span style={{ height: `${lineSize}px` }}/>
          </button>
          {activeLineWidthKey() === sizeKey && (
            <div class="chart-style-width-popover">
              <For each={lineWidthOptions}>
                {width => (
                  <button
                    type="button"
                    classList={{ selected: lineSize === width }}
                    onClick={() => {
                      updateDraft(sizeKey, width)
                      setActiveLineWidthKey(null)
                    }}>
                    <span style={{ height: `${width}px` }}/>
                  </button>
                )}
              </For>
            </div>
          )}
        </div>
        {renderColorPicker(colorKey)}
      </div>
    )
  }

  const modalTitle = (
    <div class="klinecharts-pro-setting-modal-title-tabs">
      <button
        type="button"
        classList={{ active: activeTab() === 'settings' }}
        onClick={() => setActiveTab('settings')}>
        {i18n('setting', props.locale)}
      </button>
      <button
        type="button"
        classList={{ active: activeTab() === 'chartStyle' }}
        onClick={() => setActiveTab('chartStyle')}>
        Chart Style
      </button>
    </div>
  )

  return (
    <Modal
      title={modalTitle}
      width={activeTab() === 'chartStyle' ? 760 : 690}
      btnParentStyle={{
        'display': 'flex',
        'justify-content': activeTab() === 'chartStyle' ? 'flex-end' : 'center',
        ...(activeTab() === 'chartStyle'
          ? { 'padding': '12px 20px 18px 20px' }
          : {})
      }}
      minButtonWidth={activeTab() === 'chartStyle' ? 170 : 200}
      isMobile={isMobile()}
      buttons={activeTab() === 'settings'
        ? [
            {
              children: i18n('restore_default', props.locale),
              onClick: () => {
                props.onRestoreDefault(options())
                props.onClose()
              }
            }
          ]
        : [
            {
              type: 'cancel',
              class: 'chart-style-action-button',
              children: 'Reset',
              onClick: resetChartStyle
            },
            {
              class: 'chart-style-action-button',
              children: 'Save',
              onClick: saveChartStyle
            }
          ]}
      onClose={props.onClose}>
      {activeTab() === 'settings'
        ? (
          <div
            class="klinecharts-pro-setting-modal-content"
            classList={{ 'mobile-layout': isMobile() }}>
            <For each={options()}>
              {
                option => {
                  let component
                  const value = utils.formatValue(styles(), option.key)
                  switch (option.component) {
                    case 'select': {
                      const selectWidth = option.key === 'candle.type' ? '170px' : '120px'
                      component = (
                        <Select
                          style={{ width: isMobile() ? '100%' : selectWidth, 'min-width': isMobile() ? 'auto' : selectWidth }}
                          value={i18n(value as string, props.locale)}
                          dataSource={option.dataSource}
                          onSelected={(data) => {
                            const newValue = (data as SelectDataSourceItem).key
                            update(option, newValue)
                          }}/>
                      )
                      break
                    }
                    case 'switch': {
                      const open = !!value
                      component = (
                        <Switch
                          open={open}
                          onChange={() => {
                            const newValue = !open
                            update(option, newValue)
                          }}/>
                      )
                      break
                    }
                  }
                  return (
                    <div class="setting-item" classList={{ 'mobile-item': isMobile() }}>
                      <span class="setting-label">{option.text}</span>
                      <div class="setting-control">{component}</div>
                    </div>
                  )
                }
              }
            </For>
          </div>
          )
        : (
          <div class="klinecharts-pro-chart-style-content" classList={{ 'mobile-layout': isMobile() }}>
            <div class="chart-style-sidebar">
              <button
                type="button"
                classList={{ active: activeChartStyleTab() === 'symbol' }}
                onClick={() => setActiveChartStyleTab('symbol')}>
                Symbol
              </button>
              <button
                type="button"
                classList={{ active: activeChartStyleTab() === 'background' }}
                onClick={() => setActiveChartStyleTab('background')}>
                Background
              </button>
            </div>
            <div class="chart-style-panel">
              {activeChartStyleTab() === 'symbol'
                ? (
                  <>
                    <h3>Symbol</h3>
                    <div class="chart-style-row">
                      <span>Candle Stick</span>
                      <div class="chart-style-color-pair">
                        {renderColorPicker('candle.bar.upColor', 'candle-stick-up')}
                        {renderColorPicker('candle.bar.downColor', 'candle-stick-down')}
                      </div>
                    </div>
                    <div class="chart-style-row">
                      <span>Borders</span>
                      <div class="chart-style-color-pair">
                        {renderColorPicker('candle.bar.upBorderColor', 'border-up')}
                        {renderColorPicker('candle.bar.downBorderColor', 'border-down')}
                      </div>
                    </div>
                    <div class="chart-style-row">
                      <span>Wick</span>
                      <div class="chart-style-color-pair">
                        {renderColorPicker('candle.bar.upWickColor', 'wick-up')}
                        {renderColorPicker('candle.bar.downWickColor', 'wick-down')}
                      </div>
                    </div>
                  </>
                  )
                : (
                  <>
                    <h3>Background</h3>
                    <div class="chart-style-row">
                      <span>Color</span>
                      {renderColorPicker(chartBackgroundColorKey, 'chart-background')}
                    </div>
                    <div class="chart-style-row">
                      <label class="chart-style-check-row">
                        <input
                          type="checkbox"
                          checked={!!formatDraftValue('grid.vertical.show')}
                          onChange={(event) => updateDraft('grid.vertical.show', event.currentTarget.checked)}/>
                        <span class="chart-style-check-box" aria-hidden="true"/>
                        <span>Vert Grid Lines</span>
                      </label>
                      {renderLineControl('grid.vertical')}
                    </div>
                    <div class="chart-style-row">
                      <label class="chart-style-check-row">
                        <input
                          type="checkbox"
                          checked={!!formatDraftValue('grid.horizontal.show')}
                          onChange={(event) => updateDraft('grid.horizontal.show', event.currentTarget.checked)}/>
                        <span class="chart-style-check-box" aria-hidden="true"/>
                        <span>Horz Grid Lines</span>
                      </label>
                      {renderLineControl('grid.horizontal')}
                    </div>
                  </>
                  )}
              <p class="chart-style-note">
                * Chart Style takes precedence over default chart settings. Click Reset to align with the default theme.
              </p>
            </div>
          </div>
          )}
    </Modal>
  )
}

export default SettingModal
