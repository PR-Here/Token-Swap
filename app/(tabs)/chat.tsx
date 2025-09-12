import { Text } from '@/components';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useToast } from '@/context/ToastContext';
import { usePermissions } from '@/hooks/usePermissions';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
// import Voice from '@react-native-voice/voice'; // Not compatible with Expo managed workflow
import * as Clipboard from 'expo-clipboard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Portfolio-related query suggestions
const portfolioSuggestions = [
  "How is my portfolio doing?",
];

export default function ChatTab() {
  const [activeTab, setActiveTab] = useState('Answer');
  const [message, setMessage] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const [dislikedMessages, setDislikedMessages] = useState<Set<string>>(new Set());
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([]);
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { showToast } = useToast();
  const { audioPermission, isLoading, requestAudioPermission, showPermissionAlert } = usePermissions();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);


  const initialSuggestions = ['Portfolio'];



  const addAIMessage = useCallback((text: string) => {
    const aiMessage = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'ai',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);

    // Auto-scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const handleSuggestionPress = useCallback((suggestion: string) => {
    // Clear text input
    setMessage('');

    // Add user message to show what they asked
    const userMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      text: suggestion,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Add AI response when suggestion is pressed
    addAIMessage("Your crypto portfolio is currently performing well. Overall, you have a 5% gain in the last 24 hours, with Bitcoin and Ethereum leading the growth. However, some altcoins like OKB have seen slight dips. Would you like a detailed breakdown or suggestions to optimize your holdings?");
  }, [addAIMessage]);

  const handleTextChange = useCallback((text: string) => {
    setMessage(text);

    if (text.length > 0) {
      // Filter portfolio suggestions based on user input
      const filtered = portfolioSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setQuerySuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowQuerySuggestions(true);
    } else {
      setQuerySuggestions([]);
      setShowQuerySuggestions(false);
    }
  }, []);

  const handleQuerySuggestionPress = useCallback((suggestion: string) => {
    // Clear text input
    setMessage('');

    // Add user message to show what they asked
    const userMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      text: suggestion,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Hide suggestions
    setShowQuerySuggestions(false);
    setQuerySuggestions([]);

    // Add AI response directly
    addAIMessage("Your crypto portfolio is currently performing well. Overall, you have a 5% gain in the last 24 hours, with Bitcoin and Ethereum leading the growth. However, some altcoins like OKB have seen slight dips. Would you like a detailed breakdown or suggestions to optimize your holdings?");
  }, [addAIMessage]);



  const renderAnswerHeader = useCallback(() => (
    <View style={styles.responseContainer}>
      <View style={styles.profileContainer}>
        <Image source={IMAGES.CHAT_CONTAINER} style={styles.smallProfileImage} />
        <Text style={styles.headerTitle}>How is my portfolio doing?</Text>

      </View>
      <Text style={[styles.tabText, activeTab === 'Answer' && styles.activeTabText]}>
        Answer
      </Text>
    </View>
  ), [activeTab]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() === '') {
      showToast('Please enter a message');
      return;
    }
    if (message.trim()) {
      // Hide query suggestions and reset text input border radius
      setShowQuerySuggestions(false);
      setQuerySuggestions([]);

      // Add user message
      const userMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'user',
        text: message.trim(),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setMessage('');

      // Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Add AI response automatically
      setTimeout(() => {
        const aiMessage = {
          id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'ai',
          text: "Your crypto portfolio is currently performing well. Overall, you have a 5% gain in the last 24 hours, with Bitcoin and Ethereum leading the growth. However, some altcoins like OKB have seen slight dips. Would you like a detailed breakdown or suggestions to optimize your holdings?",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);

        // Auto-scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);

      }, 500); // Small delay to show user message first
    }
  }, [message]);

  const handleCopyMessage = useCallback(async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      showToast('Message copied to clipboard');
    } catch (error) {
      showToast('Failed to copy message');
    }
  }, [showToast]);

  const handleShareMessage = useCallback(async (text: string) => {
    try {
      const result = await Share.share({
        message: text,
        title: 'AI Response',
      });

      if (result.action === Share.sharedAction) {
        showToast('Message shared successfully');
      }
    } catch (error) {
      showToast('Failed to share message');
    }
  }, [showToast]);

  const handleLikeMessage = useCallback((messageId: string) => {
    setLikedMessages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(messageId)) {
        newLiked.delete(messageId);
        showToast('Message unliked');
      } else {
        newLiked.add(messageId);
        // Remove from disliked if it was there
        setDislikedMessages(prevDisliked => {
          const newDisliked = new Set(prevDisliked);
          newDisliked.delete(messageId);
          return newDisliked;
        });
        showToast('Message liked');
      }
      return newLiked;
    });
  }, [showToast]);

  const handleDislikeMessage = useCallback((messageId: string) => {
    setDislikedMessages(prev => {
      const newDisliked = new Set(prev);
      if (newDisliked.has(messageId)) {
        newDisliked.delete(messageId);
        showToast('Message undisliked');
      } else {
        newDisliked.add(messageId);
        // Remove from liked if it was there
        setLikedMessages(prevLiked => {
          const newLiked = new Set(prevLiked);
          newLiked.delete(messageId);
          return newLiked;
        });
        showToast('Message disliked');
      }
      return newDisliked;
    });
  }, [showToast]);

  const handleRefreshMessage = useCallback((messageId: string) => {
    console.log('handleRefreshMessage', messageId);
    // Find the message to refresh (should be an AI message)
    const messageToRefresh = messages.find(msg => msg.id === messageId);
    console.log('messageToRefresh', messageToRefresh?.type, messageToRefresh?.isTyping);

    if (messageToRefresh && messageToRefresh.type === 'ai' && !messageToRefresh.isTyping) {
      // Add typing indicator
      const typingMessage = {
        id: `typing-${Date.now()}`,
        type: 'ai',
        text: 'Alfred is typing...',
        timestamp: new Date().toISOString(),
        isTyping: true
      };
      setMessages(prev => [...prev, typingMessage]);

      // Scroll to bottom
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 200);

      // After delay, replace typing with a new AI answer
      setTimeout(() => {
        const newAnswer = "Here's a fresh analysis: Your portfolio shows strong performance with Bitcoin up 3.2% and Ethereum gaining 2.8% today. The overall market sentiment is positive, and your diversification strategy is working well. Consider rebalancing if any single asset exceeds 40% of your total holdings.";

        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== typingMessage.id);
          return [...filtered, {
            id: `refreshed-${Date.now()}`,
            type: 'ai',
            text: newAnswer,
            timestamp: new Date().toISOString(),
            isTyping: false
          }];
        });

        // Scroll to bottom with longer delay to ensure message is rendered
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }, 500);

        showToast('Response refreshed');
      }, 2000); // 2 second typing delay
    }
  }, [messages, showToast]);

  const startListening = useCallback(async () => {
    try {
      if (!audioPermission.granted) {
        const granted = await requestAudioPermission();
        if (!granted) {
          return;
        }
      }

      // Simulate voice recording start
      setIsRecording(true);
      showToast('Voice recording started...');

      // Simulate recording for 3 seconds then show input
      setTimeout(() => {
        setIsRecording(false);
        showToast('Voice recording completed');
      }, 3000);

    } catch (err) {
      console.log('Voice recording error:', err);
      showToast('Failed to start voice recording');
      setIsRecording(false);
    }
  }, [audioPermission.granted, requestAudioPermission, showToast]);

  const stopListening = useCallback(async () => {
    try {
      setIsRecording(false);
      showToast('Voice recording stopped');
    } catch (err) {
      console.log('Stop recording error:', err);
      showToast('Failed to stop voice recording');
      setIsRecording(false);
    }
  }, [showToast]);


  const handleMicPress = useCallback(() => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  }, [isRecording, startListening, stopListening]);




  const renderMessageItem = useCallback(({ item }: { item: any }) => {
    if (item.type === 'user') {
      return (
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessageBubble}>
            <Text style={styles.userMessageText}>{item.text}</Text>
          </View>
        </View>
      );
    } else if (item.type === 'ai') {
      // Check if it's a typing message
      if (item.isTyping) {
        return (
          <View style={styles.aiMessageContainer}>
            <View style={styles.aiMessageBubble}>
              <Text style={[styles.aiMessageText, styles.typingText]}>{item.text}</Text>
            </View>
          </View>
        );
      }

      // Regular AI message with action buttons
      return (
        <View style={styles.aiMessageWrapper}>
          <View style={styles.aiMessageContainer}>
            <View style={styles.aiMessageBubble}>
              <Text style={styles.aiMessageText}>{item.text}</Text>
            </View>
          </View>
          <View style={styles.messageActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleCopyMessage(item.text)}>
              <Ionicons name="copy-outline" size={getWidth(14)} color={WHITE} opacity={0.7} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleShareMessage(item.text)}>
              <Ionicons name="share-outline" size={getWidth(14)} color={WHITE} opacity={0.7} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLikeMessage(item.id)}>
              <Ionicons
                name={likedMessages.has(item.id) ? "thumbs-up" : "thumbs-up-outline"}
                size={getWidth(14)}
                color={likedMessages.has(item.id) ? "#4CAF50" : WHITE}
                opacity={likedMessages.has(item.id) ? 1 : 0.7}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleDislikeMessage(item.id)}>
              <Ionicons
                name={dislikedMessages.has(item.id) ? "thumbs-down" : "thumbs-down-outline"}
                size={getWidth(14)}
                color={dislikedMessages.has(item.id) ? "#F44336" : WHITE}
                opacity={dislikedMessages.has(item.id) ? 1 : 0.7}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleRefreshMessage(item.id)}>
              <Ionicons name="refresh-outline" size={getWidth(14)} color={WHITE} opacity={0.7} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // Fallback for unknown message types
    return null;
  }, [likedMessages, dislikedMessages, handleCopyMessage, handleShareMessage, handleLikeMessage, handleDislikeMessage, handleRefreshMessage]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Answer Header - Fixed at top */}
        {messages.length > 0 && (
          <View style={styles.fixedAnswerHeader}>
            {renderAnswerHeader()}
          </View>
        )}

        {/* Chat Messages - FlatList */}
        <FlatList
          ref={flatListRef}
          style={styles.chatContainer}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          ListEmptyComponent={() => (
            <View style={styles.initialContainer}>
              <View style={styles.alfredProfile}>
                <Image source={IMAGES.CHAT_CONTAINER} style={styles.alfredImage} />
              </View>
              <Text style={styles.askAnythingText}>Ask anything</Text>
            </View>
          )}
        />

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={showQuerySuggestions ? styles.inputContainerWithSuggestions : styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask Alfred"
              placeholderTextColor="#999"
              value={message}
              onChangeText={handleTextChange}
            />
            <TouchableOpacity
              style={[
                styles.micButton,
                isRecording && styles.micButtonRecording,
                isLoading && styles.micButtonLoading
              ]}
              onPress={handleMicPress}
              disabled={isLoading}
            >
              <Ionicons
                name={
                  isLoading ? "hourglass-outline" :
                    isRecording ? "stop" :
                      audioPermission.granted ? "mic-outline" : "mic-off-outline"
                }
                size={20}
                color={
                  isLoading ? "#666" :
                    isRecording ? WHITE :
                      audioPermission.granted ? "#000" : "#999"
                }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="arrow-forward" size={20} color={WHITE} />
            </TouchableOpacity>
          </View>

          {/* Initial Suggestions - Hide when query suggestions are showing */}
          {!showQuerySuggestions && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.suggestionsContainer}
            >
              {initialSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionButton}
                  onPress={() => handleSuggestionPress(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Query Suggestions - Show when user types */}
          {showQuerySuggestions && querySuggestions.length > 0 && (
            <View style={styles.querySuggestionsContainer}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                style={styles.querySuggestionsScroll}
                contentContainerStyle={styles.querySuggestionsContent}
              >
                {querySuggestions.slice(0, 5).map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.querySuggestionItem}
                    onPress={() => handleQuerySuggestionPress(suggestion)}
                  >
                    <Text style={styles.querySuggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(100), // Space for fixed answer header (20 + 40 + 40)
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: getHeight(120), // Increased padding to account for input section
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: getWidth(0),
    marginBottom: getHeight(10),
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(12),
    borderTopLeftRadius: getWidth(12),
    borderTopRightRadius: getWidth(12),
    borderBottomLeftRadius: getWidth(12),
    borderBottomRightRadius: getWidth(0),
  },
  userMessageText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
  },
  aiMessageWrapper: {
    marginBottom: getHeight(16),
  },
  aiMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  alfredProfileSmall: {
    width: getWidth(32),
    height: getWidth(32),
    borderRadius: getWidth(16),
    marginRight: getWidth(12),
    marginTop: getHeight(4),
  },
  alfredImageSmall: {
    width: '100%',
    height: '100%',
    borderRadius: getWidth(16),
  },
  aiMessageBubble: {
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(12),
    borderTopLeftRadius: getWidth(12),
    borderTopRightRadius: getWidth(12),
    borderBottomLeftRadius: getWidth(0),
    borderBottomRightRadius: getWidth(12),
    maxWidth: '100%',
  },
  aiMessageText: {
    color: BLACK,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    lineHeight: getHeight(16),
  },
  typingText: {
    fontStyle: 'italic',
    opacity: 0.7,
  },
  initialContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeight(48),
  },
  alfredProfile: {
    marginBottom: getHeight(20),
  },
  alfredImage: {
    width: getWidth(80),
    height: getWidth(80),
    borderRadius: getWidth(40),
  },
  askAnythingText: {
    fontSize: getWidth(20),
    color: WHITE,
  },
  responseContainer: {
    paddingTop: getHeight(20),
  },

  profileContainer: {
    flexDirection: 'row',
    marginBottom: getHeight(0),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
  },
  smallProfileImage: {
    width: getWidth(40),
    height: getWidth(40),
    borderRadius: getWidth(20),
    marginRight: getWidth(12),
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: getWidth(12),
    color: WHITE,
    fontFamily: FontName.NewsreaderSemiBold,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: getWidth(24),
    paddingBottom: getHeight(4),
  },
  activeTab: {
    paddingHorizontal: getWidth(12),
    borderRadius: getWidth(16),
    borderBottomWidth: getWidth(1),
    borderBottomColor: WHITE,
  },
  tabText: {
    fontSize: getWidth(13),
    fontFamily: FontName.NewsreaderSemiBold,
    color: WHITE,
    textDecorationLine: 'underline',
    textDecorationColor: WHITE,
    marginHorizontal: getWidth(30),
    marginBottom: getHeight(4),
    marginTop: getHeight(10),
  },
  activeTabText: {
    color: WHITE,
    fontFamily: FontName.NewsreaderMedium,
  },
  messageContainer: {
    marginBottom: getHeight(16),
  },
  aiMessage: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginBottom: getHeight(8),
    maxWidth: screenWidth * 0.8,
  },
  actionButtonLarge: {
    backgroundColor: WHITE,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderStyle: 'dashed',
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginBottom: getHeight(12),
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: getWidth(14),
    fontFamily: 'System',
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(0),
    marginBottom: getHeight(20),
  },
  actionButton: {
    padding: getWidth(8),
    marginRight: getWidth(8),
  },
  inputSection: {
    paddingHorizontal: getWidth(20),
    paddingBottom: getHeight(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: getWidth(8),
    paddingHorizontal: getWidth(16),
    marginBottom: getHeight(0),
    height: getHeight(60),
  },
  inputContainerWithSuggestions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderTopLeftRadius: getWidth(12),
    borderTopRightRadius: getWidth(12),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: getWidth(16),
    marginBottom: getHeight(0),
  },
  textInput: {
    flex: 1,
    fontSize: getWidth(14),
    fontFamily: 'System',
    color: '#000',
    paddingVertical: getHeight(12),
    fontWeight: '400',
  },
  micButton: {
    padding: getWidth(8),
    marginRight: getWidth(8),
  },
  micButtonRecording: {
    backgroundColor: '#FF4444',
    borderRadius: getWidth(18),
  },
  micButtonLoading: {
    backgroundColor: '#F0F0F0',
    borderRadius: getWidth(18),
  },
  sendButton: {
    backgroundColor: PRIMARY_COLOR,
    width: getWidth(36),
    height: getWidth(36),
    borderRadius: getWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    marginBottom: getHeight(8),
  },
  suggestionButton: {
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: getWidth(8),
    paddingHorizontal: getWidth(16),
    marginRight: getWidth(12),
    marginTop: getHeight(8),
    height: getHeight(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: getWidth(12),
    fontFamily: 'System',
    color: WHITE,
    fontWeight: '500',
  },
  querySuggestionsContainer: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: getWidth(8),
    borderBottomRightRadius: getWidth(8),
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // Match the width of the input container
    width: screenWidth - getWidth(40), // Same as inputContainer width
    alignSelf: 'center',
  },
  querySuggestionsScroll: {
    maxHeight: getHeight(100),
  },
  querySuggestionsContent: {
    paddingRight: getWidth(8),
  },
  querySuggestionItem: {
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  querySuggestionText: {
    fontSize: getWidth(14),
    fontFamily: 'System',
    color: '#333',
    fontWeight: '400',
    lineHeight: getHeight(20),
  },
  fixedAnswerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: PRIMARY_COLOR,
  },
});