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

import i18n from '../../i18n'

import { SelectDataSourceItem } from '../../component'

export function translateTimezone (timezone: string, locale: string): string {
  switch (timezone) {
    // UTC
    case 'Etc/UTC': return i18n('utc', locale)
    
    // Pacific (UTC-12 to UTC-8)
    case 'Pacific/Midway': return i18n('midway', locale)
    case 'Pacific/Honolulu': return i18n('honolulu', locale)
    case 'America/Anchorage': return i18n('anchorage', locale)
    case 'America/Juneau': return i18n('juneau', locale)
    
    // North America West (UTC-8 to UTC-7)
    case 'America/Los_Angeles': return i18n('los_angeles', locale)
    case 'America/Vancouver': return i18n('vancouver', locale)
    case 'America/Tijuana': return i18n('tijuana', locale)
    case 'America/Phoenix': return i18n('phoenix', locale)
    case 'America/Denver': return i18n('denver', locale)
    
    // North America Central (UTC-6)
    case 'America/Chicago': return i18n('chicago', locale)
    case 'America/Mexico_City': return i18n('mexico_city', locale)
    case 'America/Guatemala': return i18n('guatemala', locale)
    
    // North America East (UTC-5 to UTC-4)
    case 'America/New_York': return i18n('new_york', locale)
    case 'America/Toronto': return i18n('toronto', locale)
    case 'America/Bogota': return i18n('bogota', locale)
    case 'America/Lima': return i18n('lima', locale)
    case 'America/Caracas': return i18n('caracas', locale)
    case 'America/Halifax': return i18n('halifax', locale)
    
    // South America (UTC-4 to UTC-3)
    case 'America/Santiago': return i18n('santiago', locale)
    case 'America/La_Paz': return i18n('la_paz', locale)
    case 'America/Sao_Paulo': return i18n('sao_paulo', locale)
    case 'America/Buenos_Aires': return i18n('buenos_aires', locale)
    case 'America/Montevideo': return i18n('montevideo', locale)
    
    // Atlantic (UTC-3 to UTC-1)
    case 'America/Godthab': return i18n('godthab', locale)
    case 'Atlantic/Azores': return i18n('azores', locale)
    case 'Atlantic/Cape_Verde': return i18n('cape_verde', locale)
    
    // Western Europe (UTC+0 to UTC+1)
    case 'Europe/London': return i18n('london', locale)
    case 'Europe/Dublin': return i18n('dublin', locale)
    case 'Europe/Lisbon': return i18n('lisbon', locale)
    case 'Africa/Casablanca': return i18n('casablanca', locale)
    case 'Europe/Paris': return i18n('paris', locale)
    case 'Europe/Berlin': return i18n('berlin', locale)
    case 'Europe/Amsterdam': return i18n('amsterdam', locale)
    case 'Europe/Brussels': return i18n('brussels', locale)
    case 'Europe/Madrid': return i18n('madrid', locale)
    case 'Europe/Rome': return i18n('rome', locale)
    case 'Europe/Vienna': return i18n('vienna', locale)
    case 'Europe/Warsaw': return i18n('warsaw', locale)
    case 'Africa/Lagos': return i18n('lagos', locale)
    
    // Central Europe (UTC+2)
    case 'Europe/Athens': return i18n('athens', locale)
    case 'Europe/Bucharest': return i18n('bucharest', locale)
    case 'Europe/Helsinki': return i18n('helsinki', locale)
    case 'Europe/Istanbul': return i18n('istanbul', locale)
    case 'Europe/Kiev': return i18n('kiev', locale)
    case 'Africa/Cairo': return i18n('cairo', locale)
    case 'Africa/Johannesburg': return i18n('johannesburg', locale)
    case 'Asia/Jerusalem': return i18n('jerusalem', locale)
    
    // Eastern Europe / Middle East (UTC+3)
    case 'Europe/Moscow': return i18n('moscow', locale)
    case 'Asia/Baghdad': return i18n('baghdad', locale)
    case 'Asia/Kuwait': return i18n('kuwait', locale)
    case 'Asia/Riyadh': return i18n('riyadh', locale)
    case 'Asia/Bahrain': return i18n('bahrain', locale)
    case 'Africa/Nairobi': return i18n('nairobi', locale)
    
    // Middle East (UTC+3:30 to UTC+4)
    case 'Asia/Tehran': return i18n('tehran', locale)
    case 'Asia/Dubai': return i18n('dubai', locale)
    case 'Asia/Muscat': return i18n('muscat', locale)
    case 'Asia/Baku': return i18n('baku', locale)
    
    // Central Asia (UTC+4:30 to UTC+5)
    case 'Asia/Kabul': return i18n('kabul', locale)
    case 'Asia/Karachi': return i18n('karachi', locale)
    case 'Asia/Tashkent': return i18n('tashkent', locale)
    case 'Asia/Ashkhabad': return i18n('ashkhabad', locale)
    
    // South Asia (UTC+5:30 to UTC+6)
    case 'Asia/Kolkata': return i18n('kolkata', locale)
    case 'Asia/Mumbai': return i18n('mumbai', locale)
    case 'Asia/Colombo': return i18n('colombo', locale)
    case 'Asia/Kathmandu': return i18n('kathmandu', locale)
    case 'Asia/Dhaka': return i18n('dhaka', locale)
    case 'Asia/Almaty': return i18n('almaty', locale)
    
    // Southeast Asia (UTC+6:30 to UTC+7)
    case 'Asia/Yangon': return i18n('yangon', locale)
    case 'Asia/Bangkok': return i18n('bangkok', locale)
    case 'Asia/Jakarta': return i18n('jakarta', locale)
    case 'Asia/Ho_Chi_Minh': return i18n('ho_chi_minh', locale)
    
    // East Asia (UTC+8)
    case 'Asia/Shanghai': return i18n('shanghai', locale)
    case 'Asia/Hong_Kong': return i18n('hong_kong', locale)
    case 'Asia/Singapore': return i18n('singapore', locale)
    case 'Asia/Taipei': return i18n('taipei', locale)
    case 'Asia/Manila': return i18n('manila', locale)
    case 'Asia/Kuala_Lumpur': return i18n('kuala_lumpur', locale)
    case 'Australia/Perth': return i18n('perth', locale)
    
    // East Asia (UTC+9)
    case 'Asia/Tokyo': return i18n('tokyo', locale)
    case 'Asia/Seoul': return i18n('seoul', locale)
    case 'Asia/Pyongyang': return i18n('pyongyang', locale)
    
    // Australia (UTC+9:30 to UTC+10)
    case 'Australia/Adelaide': return i18n('adelaide', locale)
    case 'Australia/Darwin': return i18n('darwin', locale)
    case 'Australia/Brisbane': return i18n('brisbane', locale)
    case 'Australia/Sydney': return i18n('sydney', locale)
    case 'Australia/Melbourne': return i18n('melbourne', locale)
    case 'Pacific/Guam': return i18n('guam', locale)
    
    // Pacific (UTC+10 to UTC+12)
    case 'Pacific/Port_Moresby': return i18n('port_moresby', locale)
    case 'Pacific/Norfolk': return i18n('norfolk', locale)
    case 'Pacific/Guadalcanal': return i18n('guadalcanal', locale)
    case 'Pacific/Auckland': return i18n('auckland', locale)
    case 'Pacific/Fiji': return i18n('fiji', locale)
    case 'Pacific/Tongatapu': return i18n('tongatapu', locale)
    case 'Pacific/Apia': return i18n('apia', locale)
    
    // Pakistan
    case 'Asia/Karachi': return i18n('karachi', locale)
    // case 'Asia/Lahore': return i18n('lahore', locale)
  }
  return timezone
}

export function createTimezoneSelectOptions (locale: string): SelectDataSourceItem[] {
  return [
    // UTC
    { key: 'Etc/UTC', text: `(UTC+0:00) ${i18n('utc', locale)}` },
    
    // Pacific (UTC-12 to UTC-8)
    { key: 'Pacific/Midway', text: `(UTC-11:00) ${i18n('midway', locale)}` },
    { key: 'Pacific/Honolulu', text: `(UTC-10:00) ${i18n('honolulu', locale)}` },
    { key: 'America/Anchorage', text: `(UTC-9:00) ${i18n('anchorage', locale)}` },
    { key: 'America/Juneau', text: `(UTC-9:00) ${i18n('juneau', locale)}` },
    
    // North America West (UTC-8 to UTC-7)
    { key: 'America/Los_Angeles', text: `(UTC-8:00) ${i18n('los_angeles', locale)}` },
    { key: 'America/Vancouver', text: `(UTC-8:00) ${i18n('vancouver', locale)}` },
    { key: 'America/Tijuana', text: `(UTC-8:00) ${i18n('tijuana', locale)}` },
    { key: 'America/Phoenix', text: `(UTC-7:00) ${i18n('phoenix', locale)}` },
    { key: 'America/Denver', text: `(UTC-7:00) ${i18n('denver', locale)}` },
    
    // North America Central (UTC-6)
    { key: 'America/Chicago', text: `(UTC-6:00) ${i18n('chicago', locale)}` },
    { key: 'America/Mexico_City', text: `(UTC-6:00) ${i18n('mexico_city', locale)}` },
    { key: 'America/Guatemala', text: `(UTC-6:00) ${i18n('guatemala', locale)}` },
    
    // North America East (UTC-5 to UTC-4)
    { key: 'America/New_York', text: `(UTC-5:00) ${i18n('new_york', locale)}` },
    { key: 'America/Toronto', text: `(UTC-5:00) ${i18n('toronto', locale)}` },
    { key: 'America/Bogota', text: `(UTC-5:00) ${i18n('bogota', locale)}` },
    { key: 'America/Lima', text: `(UTC-5:00) ${i18n('lima', locale)}` },
    { key: 'America/Caracas', text: `(UTC-4:00) ${i18n('caracas', locale)}` },
    { key: 'America/Halifax', text: `(UTC-4:00) ${i18n('halifax', locale)}` },
    
    // South America (UTC-4 to UTC-3)
    { key: 'America/Santiago', text: `(UTC-4:00) ${i18n('santiago', locale)}` },
    { key: 'America/La_Paz', text: `(UTC-4:00) ${i18n('la_paz', locale)}` },
    { key: 'America/Sao_Paulo', text: `(UTC-3:00) ${i18n('sao_paulo', locale)}` },
    { key: 'America/Buenos_Aires', text: `(UTC-3:00) ${i18n('buenos_aires', locale)}` },
    { key: 'America/Montevideo', text: `(UTC-3:00) ${i18n('montevideo', locale)}` },
    
    // Atlantic (UTC-3 to UTC-1)
    { key: 'America/Godthab', text: `(UTC-3:00) ${i18n('godthab', locale)}` },
    { key: 'Atlantic/Azores', text: `(UTC-1:00) ${i18n('azores', locale)}` },
    { key: 'Atlantic/Cape_Verde', text: `(UTC-1:00) ${i18n('cape_verde', locale)}` },
    
    // Western Europe (UTC+0 to UTC+1)
    { key: 'Europe/London', text: `(UTC+0:00) ${i18n('london', locale)}` },
    { key: 'Europe/Dublin', text: `(UTC+0:00) ${i18n('dublin', locale)}` },
    { key: 'Europe/Lisbon', text: `(UTC+0:00) ${i18n('lisbon', locale)}` },
    { key: 'Africa/Casablanca', text: `(UTC+0:00) ${i18n('casablanca', locale)}` },
    { key: 'Europe/Paris', text: `(UTC+1:00) ${i18n('paris', locale)}` },
    { key: 'Europe/Berlin', text: `(UTC+1:00) ${i18n('berlin', locale)}` },
    { key: 'Europe/Amsterdam', text: `(UTC+1:00) ${i18n('amsterdam', locale)}` },
    { key: 'Europe/Brussels', text: `(UTC+1:00) ${i18n('brussels', locale)}` },
    { key: 'Europe/Madrid', text: `(UTC+1:00) ${i18n('madrid', locale)}` },
    { key: 'Europe/Rome', text: `(UTC+1:00) ${i18n('rome', locale)}` },
    { key: 'Europe/Vienna', text: `(UTC+1:00) ${i18n('vienna', locale)}` },
    { key: 'Europe/Warsaw', text: `(UTC+1:00) ${i18n('warsaw', locale)}` },
    { key: 'Africa/Lagos', text: `(UTC+1:00) ${i18n('lagos', locale)}` },
    
    // Central Europe (UTC+2)
    { key: 'Europe/Athens', text: `(UTC+2:00) ${i18n('athens', locale)}` },
    { key: 'Europe/Bucharest', text: `(UTC+2:00) ${i18n('bucharest', locale)}` },
    { key: 'Europe/Helsinki', text: `(UTC+2:00) ${i18n('helsinki', locale)}` },
    { key: 'Europe/Istanbul', text: `(UTC+2:00) ${i18n('istanbul', locale)}` },
    { key: 'Europe/Kiev', text: `(UTC+2:00) ${i18n('kiev', locale)}` },
    { key: 'Africa/Cairo', text: `(UTC+2:00) ${i18n('cairo', locale)}` },
    { key: 'Africa/Johannesburg', text: `(UTC+2:00) ${i18n('johannesburg', locale)}` },
    { key: 'Asia/Jerusalem', text: `(UTC+2:00) ${i18n('jerusalem', locale)}` },
    
    // Eastern Europe / Middle East (UTC+3)
    { key: 'Europe/Moscow', text: `(UTC+3:00) ${i18n('moscow', locale)}` },
    { key: 'Asia/Baghdad', text: `(UTC+3:00) ${i18n('baghdad', locale)}` },
    { key: 'Asia/Kuwait', text: `(UTC+3:00) ${i18n('kuwait', locale)}` },
    { key: 'Asia/Riyadh', text: `(UTC+3:00) ${i18n('riyadh', locale)}` },
    { key: 'Asia/Bahrain', text: `(UTC+3:00) ${i18n('bahrain', locale)}` },
    { key: 'Africa/Nairobi', text: `(UTC+3:00) ${i18n('nairobi', locale)}` },
    
    // Middle East (UTC+3:30 to UTC+4)
    { key: 'Asia/Tehran', text: `(UTC+3:30) ${i18n('tehran', locale)}` },
    { key: 'Asia/Dubai', text: `(UTC+4:00) ${i18n('dubai', locale)}` },
    { key: 'Asia/Muscat', text: `(UTC+4:00) ${i18n('muscat', locale)}` },
    { key: 'Asia/Baku', text: `(UTC+4:00) ${i18n('baku', locale)}` },
    
    // Central Asia (UTC+4:30 to UTC+5)
    { key: 'Asia/Kabul', text: `(UTC+4:30) ${i18n('kabul', locale)}` },
    { key: 'Asia/Karachi', text: `(UTC+5:00) ${i18n('karachi', locale)}` },
    // { key: 'Asia/Lahore', text: `(UTC+5:00) ${i18n('lahore', locale)}` },
    { key: 'Asia/Tashkent', text: `(UTC+5:00) ${i18n('tashkent', locale)}` },
    { key: 'Asia/Ashkhabad', text: `(UTC+5:00) ${i18n('ashkhabad', locale)}` },
    
    // South Asia (UTC+5:30 to UTC+6)
    { key: 'Asia/Kolkata', text: `(UTC+5:30) ${i18n('kolkata', locale)}` },
    { key: 'Asia/Mumbai', text: `(UTC+5:30) ${i18n('mumbai', locale)}` },
    { key: 'Asia/Colombo', text: `(UTC+5:30) ${i18n('colombo', locale)}` },
    { key: 'Asia/Kathmandu', text: `(UTC+5:45) ${i18n('kathmandu', locale)}` },
    { key: 'Asia/Dhaka', text: `(UTC+6:00) ${i18n('dhaka', locale)}` },
    { key: 'Asia/Almaty', text: `(UTC+6:00) ${i18n('almaty', locale)}` },
    
    // Southeast Asia (UTC+6:30 to UTC+7)
    { key: 'Asia/Yangon', text: `(UTC+6:30) ${i18n('yangon', locale)}` },
    { key: 'Asia/Bangkok', text: `(UTC+7:00) ${i18n('bangkok', locale)}` },
    { key: 'Asia/Jakarta', text: `(UTC+7:00) ${i18n('jakarta', locale)}` },
    { key: 'Asia/Ho_Chi_Minh', text: `(UTC+7:00) ${i18n('ho_chi_minh', locale)}` },
    
    // East Asia (UTC+8)
    { key: 'Asia/Shanghai', text: `(UTC+8:00) ${i18n('shanghai', locale)}` },
    { key: 'Asia/Hong_Kong', text: `(UTC+8:00) ${i18n('hong_kong', locale)}` },
    { key: 'Asia/Singapore', text: `(UTC+8:00) ${i18n('singapore', locale)}` },
    { key: 'Asia/Taipei', text: `(UTC+8:00) ${i18n('taipei', locale)}` },
    { key: 'Asia/Manila', text: `(UTC+8:00) ${i18n('manila', locale)}` },
    { key: 'Asia/Kuala_Lumpur', text: `(UTC+8:00) ${i18n('kuala_lumpur', locale)}` },
    { key: 'Australia/Perth', text: `(UTC+8:00) ${i18n('perth', locale)}` },
    
    // East Asia (UTC+9)
    { key: 'Asia/Tokyo', text: `(UTC+9:00) ${i18n('tokyo', locale)}` },
    { key: 'Asia/Seoul', text: `(UTC+9:00) ${i18n('seoul', locale)}` },
    { key: 'Asia/Pyongyang', text: `(UTC+9:00) ${i18n('pyongyang', locale)}` },
    
    // Australia (UTC+9:30 to UTC+10)
    { key: 'Australia/Adelaide', text: `(UTC+9:30) ${i18n('adelaide', locale)}` },
    { key: 'Australia/Darwin', text: `(UTC+9:30) ${i18n('darwin', locale)}` },
    { key: 'Australia/Brisbane', text: `(UTC+10:00) ${i18n('brisbane', locale)}` },
    { key: 'Australia/Sydney', text: `(UTC+10:00) ${i18n('sydney', locale)}` },
    { key: 'Australia/Melbourne', text: `(UTC+10:00) ${i18n('melbourne', locale)}` },
    { key: 'Pacific/Guam', text: `(UTC+10:00) ${i18n('guam', locale)}` },
    
    // Pacific (UTC+10 to UTC+13)
    { key: 'Pacific/Port_Moresby', text: `(UTC+10:00) ${i18n('port_moresby', locale)}` },
    { key: 'Pacific/Norfolk', text: `(UTC+11:00) ${i18n('norfolk', locale)}` },
    { key: 'Pacific/Guadalcanal', text: `(UTC+11:00) ${i18n('guadalcanal', locale)}` },
    { key: 'Pacific/Auckland', text: `(UTC+12:00) ${i18n('auckland', locale)}` },
    { key: 'Pacific/Fiji', text: `(UTC+12:00) ${i18n('fiji', locale)}` },
    { key: 'Pacific/Tongatapu', text: `(UTC+13:00) ${i18n('tongatapu', locale)}` },
    { key: 'Pacific/Apia', text: `(UTC+13:00) ${i18n('apia', locale)}` }
  ]
}