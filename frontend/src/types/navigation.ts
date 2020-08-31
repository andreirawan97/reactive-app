export type NavigationScreenProps = {
  navigation: {
    navigate: (name: string, params?: Record<string, unknown>) => void;
    push: (name: string) => void;
    goBack: () => void;
  };
  route: {
    params: Record<string, unknown>;
  };
};
