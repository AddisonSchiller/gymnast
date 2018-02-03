// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid, GridProps } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import asCore from '../core/asCore'
import { configProviderContext } from '../configProvider'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string
): React.ComponentType<GridProps> {
  function Grid({
    align,
    className,
    justify,
    size,
    innerRef,
    ...props
  }: OneResolutionGrid) {
    return (
      <configProviderContext.Consumer>
        {context => {
          const classes = compact([
            styles.grid,
            getCol(size, getValue(context, 'columns')),
            className,
            align && styles[`${align}Align`],
            justify && styles[`${justify}Justify`],
          ])

          return (
            <Component
              {...props}
              ref={innerRef}
              className={classes.join(' ')}
            />
          )
        }}
      </configProviderContext.Consumer>
    )
  }

  return asCore(Grid, resolutionProperties)
}
