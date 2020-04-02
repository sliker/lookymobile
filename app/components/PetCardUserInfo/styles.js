import { StyleSheet } from 'react-native';

import { colors, layout } from '../../styles/Theme';

const styles = StyleSheet.create({
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
    width: 140,
  },
});

export default styles;
