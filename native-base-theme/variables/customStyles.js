import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  bgDark: {
    backgroundColor: "#101010",
    color: "#f5f5f5"
  },
  bgWhite: {
    backgroundColor: "#FFF",
    color: "#101010"
  },
  bgOrange: {
    backgroundColor: "#ef6c00"
  },
  bgGrey: {
    backgroundColor: "#EEE"
  },
  orangeText: {
    color: "#ef6c00"
  },
  whiteText: {
    color: "#fff"
  },
  inputField: {
    color: "#666",
    fontSize: 16
  },
  inputLabel: {
    fontSize: 15,
    color: "#666"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  carouselContainer: {
    height: 200,
    padding: 0
  },
  carouselBody: {
    padding: 0
  },
  carouselItem: {
    margin: 0,
    top: 0,
    left: 0,
    height: 200,
    borderColor: "#101010",
    justifyContent: "center",
    alignItems: "center"
  },
  carouselItemImage: {
    height: 200,
    width: null,
    flex: 12,
    position: "relative"
  },
  carouselItemMask: {
    height: 200,
    width: null,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 2,
    position: "absolute",
    backgroundColor: "transparent"
  },
  musicCardContainer: {
    margin: 10,
    width: 135,
    padding: 0
  },
  musicCard: {
    borderColor: "#101010",
    width: 170,
    margin: 10,
    borderRadius: 5,
    padding: 0,
    marginRight: 10
  },
  musicCardTitle: {
    fontSize: 10
  },
  catalogueCardTitle: {
    borderColor: "#101010",
    fontSize: 15
  },
  catalogueCard: {
    padding: 0
  },
  wineGradient: {
    backgroundColor: "#310a11"
  },
  justifyCenter: {
    alignItems: "center",
    justifyContent: "center"
  },
  headerLogo: {
    resizeMode: "stretch"
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: "auto"
  },
  greyText: {
    color: "#eee"
  },
  deepGreyText: {
    color: "#313131"
  },
  redText: {
    color: "#d00e26"
  },
  darkText: {
    color: "#424242"
  },
  darkBg: {
    backgroundColor: "#0e0e0e"
  },
  padTop25: {
    paddingTop: 25
  },
  container: {
    flex: 1
  },

  audioElement: {
    height: 0,
    width: 0
  },

  positionCenter: {
    alignItems: "center",
    justifyContent: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  noBorders: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  listInfoText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    marginLeft: 10
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25
  },
  PdfContainer: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#ddd"
  },
  PdfFooter: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 50
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#ddd"
  },
  // flex
  flexColumn: {
    flex: 1
  },

  flexRow_1: {
    flex: 1,
    flexDirection: "row"
  }
});
