import React from "react";
import {
    SafeAreaView,
    SectionList,
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";
import { accountData } from "@/dummyData/accountData";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

interface ModalEditProps {
    visible: boolean;
    title: string;
    value: string;
    onSave: (newValue: string) => void;
    onClose: () => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
    visible,
    title,
    value,
    onSave,
    onClose,
}) => {
    const [text, setText] = React.useState(value);

    React.useEffect(() => {
        setText(value);
    }, [value]);

    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit {title}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={text}
                        onChangeText={setText}
                    />
                    <View style={styles.modalButtons}>
                        <Button title="Batal" onPress={onClose} />
                        <Button
                            title="Simpan"
                            onPress={() => {
                                onSave(text);
                                onClose();
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const EditProfilePages = () => {
    const user = accountData[0];

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalField, setModalField] = React.useState<{
        key: string;
        label: string;
        value: string;
    } | null>(null);

    // data untuk SectionList
    const sections = [
        {
            title: "Ubah Biodata Diri",
            data: [
                { key: "name", label: "Nama", value: user.name },
                { key: "birthDate", label: "Tanggal Lahir", value: user.birthDate },
                { key: "gender", label: "Jenis Kelamin", value: user.gender },
            ],
        },
        {
            title: "Ubah Kontak",
            data: [
                {
                    key: "email",
                    label: "Email",
                    value: user.email,
                    badge: "Terverifikasi",
                },
                {
                    key: "phone",
                    label: "Nomor HP",
                    value: user.phone,
                    badge: "Terverifikasi",
                },
            ],
        },
    ];

    const handleOpenModal = (item: typeof sections[0]["data"][0]) => {
        setModalField(item);
        setModalVisible(true);
    };

    const handleSave = (newValue: string) => {
        // Di sini kamu update state / panggil API untuk simpan perubahan
        console.log(`Simpan ${modalField?.key}:`, newValue);
    };

    const renderSectionHeader = ({
        section: { title },
    }: {
        section: { title: string };
    }) => <Text style={styles.sectionHeader}>{title}</Text>;

    const renderItem = ({
        item,
    }: {
        item: {
            key: string;
            label: string;
            value: string;
            badge?: string;
        };
    }) => (
        <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
                <Text>{item.label}</Text>
                <Text style={styles.itemValue}>{item.value}</Text>
            </View>

            {item.badge && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
            )}

            <TouchableOpacity onPress={() => handleOpenModal(item)}>
                <Text style={styles.editText}>Ubah</Text>
            </TouchableOpacity>
        </View>
    );

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Header Profile */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Image
                        source={user.profilePicture}
                        style={styles.avatar}
                    />
                    <Text style={styles.choosePhoto}>Pilih Foto</Text>
                </View>
            </View>

            {/* SectionList */}
            <View style={{ flex: 3, padding: 20 }}>
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.key}
                    renderSectionHeader={renderSectionHeader}
                    renderItem={renderItem}
                />
            </View>

            {/* Modal Edit */}
            {
                modalField && (
                    <ModalEdit
                        visible={modalVisible}
                        title={modalField.label}
                        value={modalField.value}
                        onClose={() => setModalVisible(false)}
                        onSave={handleSave}
                    />
                )
            }
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({

    header: {
        backgroundColor: 'rgb(60, 147, 203)',
        padding: 20,
        height: 250,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
    },
    headerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    backButton: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '600',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    choosePhoto: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600"
    },
    sectionHeader: {
        marginTop: 20,
        marginBottom: 8,
        fontWeight: "bold",
        fontSize: 18,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    itemInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    itemValue: {
        fontWeight: "600"
    },
    badge: {
        backgroundColor: "#D4F5E9",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 12,
    },
    badgeText: {
        fontSize: 12
    },
    editText: {
        color: "rgb(60,147,203)"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "#00000066",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default EditProfilePages;
