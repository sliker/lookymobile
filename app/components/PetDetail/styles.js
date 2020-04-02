import { StyleSheet } from 'react-native';

import { colors, layout } from '../../styles/Theme';

const styles = StyleSheet.create({
  indicatorViewPager: {
    backgroundColor: colors.white,
    flex: 1,
  },
  tabsIndicatorContainer: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    height: 38,
    paddingBottom: 0,
    paddingTop: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    margin: 0,
    paddingTop: 10,
  },
  selectedTabItem: {
    margin: 0,
    borderBottomWidth: 2,
    borderColor: colors.accent,
    paddingTop: 8,
  },
  tabTxt: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  selectedTabTxt: {
    color: colors.white,
    fontWeight: '700',
  },
  pagerItem: {
    paddingTop: 38
  },
  characteristicsContainer: {
    backgroundColor: colors.blueGrey900,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: layout.padding,
  },
  characteristicsIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  characteristicsIcon: {
    tintColor: colors.white,
  },
  characteristicsText: {
    color: colors.white,
  },
  verticalDivider: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    height: 40,
  },
  date: {
    backgroundColor: colors.grey300,
    padding: layout.padding,
  },
  generalDetailsContainer: {
    padding: layout.padding,
  },
  generalDetailsLabel: {
    fontWeight: '700',
  },
  generalDetails: {
    marginBottom: 8,
  },
  mapAddressContainer: {
    backgroundColor: colors.white,
    padding: layout.padding,
  },
  mapAddressLabel: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  mapAddress: {
    fontWeight: '300'
  },
});

export default styles;
