import { Image, StyleSheet, View } from "react-native";
import Text from "./common/Text";
import { IMAGES } from "@/utils/images";
import { getHeight } from "@/utils/size";
import { getWidth } from "@/utils/size";
import { FontName } from "@/constant/fontName";
import { WHITE } from "@/constant/colors";
import { PRIMARY_COLOR } from "@/constant/colors";

interface EyeHeartHeaderProps {
    title?: string;
}

const EyeHeartHeader = ({ title = '50 Saved Tokens' }: EyeHeartHeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Image source={IMAGES.EYE_ICON} style={styles.headerImage} resizeMode="contain" />
        </View>
    );
};

export default EyeHeartHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 1,
        borderColor: WHITE,
        marginHorizontal: getWidth(16),
        paddingLeft: getWidth(16),
        borderRadius: getWidth(4),
        height: getHeight(40),
        marginVertical: getHeight(16),
    },
    headerTitle: {
        fontSize: getWidth(12),
        fontFamily: FontName.NewsreaderMedium,
        color: WHITE,
    },
    headerImage: {
        width: getWidth(84),
        height: getWidth(38),
        marginRight: getWidth(-2),
    },
});