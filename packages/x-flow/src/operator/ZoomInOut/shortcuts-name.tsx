import React, { memo } from 'react'
import { getKeyboardKeyNameBySystem } from '../../utils'
import cn from 'classnames'

type ShortcutsNameProps = {
  keys: string[]
  className?: string
}
const ShortcutsName = ({
  keys,
  className,
}: ShortcutsNameProps) => {
  return (
    <div className={cn(
      'flex items-center gap-0.5 h-4 text-xs text-gray-400',
      className,
    )}>
      {
        keys.map(key => (
          <div
            key={key}
            className='capitalize'
          >
            {getKeyboardKeyNameBySystem(key)}
          </div>
        ))
      }
    </div>
  )
}

export default memo(ShortcutsName)
