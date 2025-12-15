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

import { createSignal, Component, JSX, createMemo } from 'solid-js'

export interface SelectDataSourceItem {
  key: string
  text: JSX.Element
}

export interface SelectProps {
  class?: string
  style?: JSX.CSSProperties | string
  value?: JSX.Element
  valueKey?: string
  dataSource?: SelectDataSourceItem[] | string[]
  onSelected?: (data: SelectDataSourceItem | string) => void
  searchable?: boolean
  searchPlaceholder?: string
}

const Select: Component<SelectProps> = props => {
  const [open, setOpen] = createSignal(false)
  const [searchQuery, setSearchQuery] = createSignal('')
  let inputRef: HTMLInputElement | undefined
  let containerRef: HTMLDivElement | undefined

  const filteredDataSource = createMemo(() => {
    if (!props.dataSource || !props.searchable) return props.dataSource
    
    const query = searchQuery().toLowerCase().trim()
    if (!query) return props.dataSource

    const isStringArray = typeof props.dataSource[0] === 'string'
    
    if (isStringArray) {
      return (props.dataSource as string[]).filter((item: string) => 
        item.toLowerCase().includes(query)
      )
    } else {
      return (props.dataSource as SelectDataSourceItem[]).filter((item: SelectDataSourceItem) => {
        const text = item.text?.toString().toLowerCase() || ''
        const key = item.key?.toLowerCase() || ''
        return text.includes(query) || key.includes(query)
      })
    }
  })

  const handleOpen = () => {
    setOpen(true)
    setSearchQuery('')
    if (props.searchable) {
      setTimeout(() => inputRef?.focus(), 10)
    }
  }

  const handleBlur = (e: FocusEvent) => {
    // Check if the new focus target is inside the dropdown
    const relatedTarget = e.relatedTarget as Node
    if (containerRef && relatedTarget && containerRef.contains(relatedTarget)) {
      return
    }
    setOpen(false)
    setSearchQuery('')
  }

  return (
    <div
      ref={containerRef}
      style={props.style}
      class={`klinecharts-pro-select ${props.class ?? ''} ${open() ? 'klinecharts-pro-select-show' : ''}`}
      tabIndex="0"
      onClick={_ => { if (!open()) handleOpen() }}
      onBlur={handleBlur}>
      <div class="selector-container">
        <span class="value">{props.value}</span>
        <i class="arrow"/>
      </div>
      {
        (props.dataSource && props.dataSource.length > 0) &&
        <div 
          class="drop-down-container"
          onMouseDown={e => e.preventDefault()}> {/* Yeh line important hai! */}
          {
            props.searchable &&
            <div style={{ padding: '8px', 'border-bottom': '1px solid #333' }}>
              <input
                ref={inputRef}
                type="text"
                placeholder={props.searchPlaceholder || 'Search...'}
                value={searchQuery()}
                onInput={e => setSearchQuery(e.currentTarget.value)}
                onClick={e => e.stopPropagation()}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #333',
                  'border-radius': '4px',
                  'background-color': '#1a1a1a',
                  color: '#fff',
                  'font-size': '13px',
                  outline: 'none'
                }}
              />
            </div>
          }
          <ul>
            {
              filteredDataSource()?.map(data => {
                const d = data as SelectDataSourceItem
                // @ts-expect-error
                const v = d[props.valueKey ?? 'text'] ?? data
                return (
                  <li
                    onClick={e => {
                      e.stopPropagation()
                      if (props.value !== v) {
                        props.onSelected?.(data)
                      }
                      setOpen(false)
                      setSearchQuery('')
                    }}>
                    {v}
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Select