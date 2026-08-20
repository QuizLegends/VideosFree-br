import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Importação com os nomes das suas imagens
const imgCenario = require('./assets/cenario.png');
const imgMale = require('./assets/masculino.png');
const imgFemale = require('./assets/feminino.png');

export default function App() {
  const [genero, setGenero] = useState('male');
  const breathValue = useSharedValue(1);

  useEffect(() => {
    breathValue.value = withRepeat(
      withTiming(1.02, {
        duration: 2200,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true
    );
  }, []);

  const animatedBreathStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scaleY: breathValue.value },
        { translateY: (1 - breathValue.value) * 10 },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Cenário Vazio de Fundo */}
      <Image source={imgCenario} style={styles.background} resizeMode="cover" />

      {/* Personagem Animado com Transição */}
      <View style={styles.characterContainer}>
        {genero === 'male' ? (
          <Animated.Image
            key="male"
            source={imgMale}
            style={[styles.character, animatedBreathStyle]}
            resizeMode="contain"
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          />
        ) : (
          <Animated.Image
            key="female"
            source={imgFemale}
            style={[styles.character, animatedBreathStyle]}
            resizeMode="contain"
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          />
        )}
      </View>

      {/* Seletor de Gênero */}
      <View style={styles.genderSelectorContainer}>
        <TouchableOpacity 
          style={[styles.genderButton, genero === 'male' && styles.genderButtonActive]} 
          onPress={() => setGenero('male')}
        >
          <Text style={styles.buttonText}>MASCULINO</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.genderButton, genero === 'female' && styles.genderButtonActive]} 
          onPress={() => setGenero('female')}
        >
          <Text style={styles.buttonText}>FEMININO</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Finalização */}
      <TouchableOpacity style={styles.finalButton}>
        <Text style={styles.finalButtonText}>[INICIAR PROTOCOLO DE VINGANÇA]</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  characterContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  character: {
    width: width * 0.85,
    height: height * 0.72,
    position: 'absolute',
    bottom: height * 0.12,
  },
  genderSelectorContainer: {
    position: 'absolute',
    bottom: height * 0.14,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    zIndex: 10,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderWidth: 1,
    borderColor: '#333',
  },
  genderButtonActive: {
    borderColor: '#0f0',
    backgroundColor: 'rgba(0, 40, 0, 0.7)',
  },
  buttonText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  finalButton: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: width * 0.85,
    height: 48,
    backgroundColor: '#700',
    borderWidth: 1.5,
    borderColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  finalButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});
