import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const COMPANY_NAME = 'AIDAS';

const slides = [
  {
    type: 'splash',
    logoOnly: true
  },
  {
    type: 'onboarding',
    title: '"노력을 디지털 자산으로,\n성공을 전세계와 함께"',
    subtitle: '작은 시작이 큰 가치로 이어집니다.\n당신의 실적과 성취가 곧 자신이 되고,\n그에 따른 보상이 지속적으로 쌓입니다.',
    currentDot: 0,
    showStartButton: true
  },
  {
    type: 'onboarding',
    title: '"성장과 성공, 전세계인과\n함께하는 디지털 자산의 미래"',
    subtitle: '파트너와 함께 성장하며\n더 큰 기회를 만들어가는 혁신적인 플랫폼.\n당신의 노력은 곧 관계 없는 보상으로 돌아옵니다.',
    currentDot: 1,
    showStartButton: true
  },
  {
    type: 'onboarding',
    title: '"Web 3.0에서 디지털 자산으로,\n수익과 성장을 잡다"',
    subtitle: '당신의 성취가 나의 보상이 되는 공간,\n새로운 성장의 기준을 제시합니다.',
    currentDot: 2,
    showStartButton: true
  },
  {
    type: 'onboarding',
    title: '======',
    subtitle: 'Loading',
    currentDot: 3,
    showStartButton: true
  }
];

const StartScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = React.useRef(null);

  const handleIndexChanged = (index) => {
    setActiveIndex(index);
  };

  const handleStartPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderSlide = (slide) => {
    if (slide.type === 'splash') {
      return (
        <View style={styles.slide}>
          <View style={styles.contentContainer}>
            <Image
              source={require('../../assets/images/poten-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>{COMPANY_NAME}</Text>
            <Text style={styles.bottomText}>
              Being protected by <Text style={styles.italicText}>{COMPANY_NAME}</Text> certified security tech usage
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
        {slide.showStartButton && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartPress}
            >
              <Text style={styles.buttonText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={true}
        loop={false}
        onIndexChanged={handleIndexChanged}
        showsPagination={true}
        scrollEnabled={true}
        index={0}
        buttonWrapperStyle={styles.buttonWrapper}
        nextButton={<Text style={styles.navButtonText}>›</Text>}
        prevButton={<Text style={styles.navButtonText}>‹</Text>}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slideWrapper}>
            {renderSlide(slide)}
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A7C7C',
  },
  wrapper: {},
  slideWrapper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingTop: 60,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  italicText: {
    fontStyle: 'italic',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#0A7C7C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: '300',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  pagination: {
    bottom: 120,
  },
});

export default StartScreen;