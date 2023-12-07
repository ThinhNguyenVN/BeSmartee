import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        fontSize: 25,
        fontWeight: "500",
    },
    listOrderItem: {
        paddingTop: 16,
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 16,
        marginHorizontal: 16,
    },
    noteTitle: {
        backgroundColor: "white",
        padding: 4,
        position: "absolute",
        top: -18,
        left: 16,
    },

    detailContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
    },
    noteInput: {
        height: 120,
        backgroundColor: "white",
    },
    productItemView: {
        flexDirection: "row",
        marginVertical: 16,
        height: 40,
        alignItems: "center",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        height: 32,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        marginBottom: 16,
    },
    headerBack: {
        position: "absolute",
        left: 0,
        zIndex: 10,
    },
    headerTitle: {
        width: "100%",
        top: 0,
        textAlign: "center",
    },
});

export default styles;
