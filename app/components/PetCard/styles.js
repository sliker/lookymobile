import { StyleSheet } from 'react-native';

import { colors, layout } from '../../styles/Theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginTop: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    shadowOpacity: .2,
    shadowRadius: 0,
  },
  petImage: {
    height: 200,
    width: '100%',
  },
  userImage: {
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  userInfoHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: layout.padding,
    paddingVertical: 8,
  },
  userInfoName: {
    flex: 1,
    marginHorizontal: 6,
  },
  publishDate: {
    color: colors.grey600,
    fontWeight: '300',
    marginLeft: 'auto',
    textAlign: 'right',
    width: 110,
  },
  cardFooter: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: layout.padding,
    paddingRight: 8,
    paddingVertical: 8,
  },
  petDate: {
    alignItems: 'center',
    width: 30,
  },
  petDateDay: {
    fontSize: 24,
  },
  petDateMonth: {
    color: colors.primary,
    marginTop: -5,
  },
  petName: {
    fontSize: 20,
  },
  petAddress: {
    fontWeight: '300',
  },
  verticalDivider: {
    backgroundColor: colors.grey300,
    marginHorizontal: 8,
    width: 1,
  },
});

export default styles;
