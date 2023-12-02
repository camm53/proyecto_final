import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LoginFrame {

    private static final String IMAGENES_PATH = "imagenes/";

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                try {
                    UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
                } catch (Exception e) {
                    e.printStackTrace();
                }

                // Configuración del JFrame
                JFrame loginFrame = new JFrame("Inicio de Sesión en Cineflix");
                loginFrame.setSize(400, 150);
                loginFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                loginFrame.setLocationRelativeTo(null);

                // Cargar las propiedades desde el archivo
                Properties properties = new Properties();
                try {
                    properties.load(new FileInputStream("config.properties"));
                } catch (IOException e) {
                    e.printStackTrace();
                }

                // Creación de componentes
                JLabel usernameLabel = new JLabel("Usuario:");
                JLabel passwordLabel = new JLabel("Contraseña:");

                JTextField usernameField = new JTextField(20);
                JPasswordField passwordField = new JPasswordField(20);

                JButton loginButton = new JButton("Ingresar");
                JButton registerButton = new JButton("Registrar Usuario");

                // Configuración del layout
                loginFrame.setLayout(new BorderLayout());

                // Panel para los campos de usuario y contraseña
                JPanel inputPanel = new JPanel(new GridLayout(2, 2));
                inputPanel.add(usernameLabel);
                inputPanel.add(usernameField);
                inputPanel.add(passwordLabel);
                inputPanel.add(passwordField);

                // Panel para los botones de ingreso y registro
                JPanel buttonPanel = new JPanel();
                buttonPanel.add(loginButton);
                buttonPanel.add(registerButton);

                // Agregar componentes al JFrame
                loginFrame.add(inputPanel, BorderLayout.CENTER);
                loginFrame.add(buttonPanel, BorderLayout.SOUTH);

                // Configuración del ActionListener para el botón de ingresar
                loginButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        // Verificar que los campos estén llenos para iniciar sesión
                        if (validateLoginFields(usernameField, passwordField)) {
                            // Obtener los valores de usuario y contraseña ingresados
                            String enteredUsername = usernameField.getText();
                            char[] enteredPassword = passwordField.getPassword();

                            // Verificar si el usuario existe y la contraseña es correcta
                            if (properties.containsKey(enteredUsername) &&
                                    verifyPassword(enteredPassword, properties.getProperty(enteredUsername))) {
                                // Si es correcto, mostrar mensaje de bienvenida
                                JOptionPane.showMessageDialog(loginFrame, "¡Bienvenido, " + enteredUsername + "!");
                                // Abrir la ventana del catálogo de películas
                                openCatalogWindow(properties);
                            } else {
                                // Si no es correcto, mostrar mensaje de error
                                JOptionPane.showMessageDialog(loginFrame, "Usuario o contraseña incorrectos. Intente nuevamente.");
                            }

                            // Limpiar los campos después del intento de inicio de sesión
                            usernameField.setText("");
                            passwordField.setText("");
                        }
                    }
                });

                // Configuración del ActionListener para el botón de registro
                registerButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        // Mostrar ventana de registro
                        showRegistrationWindow(loginFrame, properties);
                    }
                });

                // Hacer visible la ventana de inicio de sesión
                loginFrame.setVisible(true);
            }
        });
    }

    private static boolean validateLoginFields(JTextField usernameField, JPasswordField passwordField) {
        String username = usernameField.getText();
        char[] password = passwordField.getPassword();

        if (username.isEmpty() || password.length == 0) {
            JOptionPane.showMessageDialog(usernameField, "Por favor, complete todos los campos.");
            return false;
        }

        return true;
    }

    private static boolean verifyPassword(char[] enteredPassword, String storedPassword) {
        // Convertir el campo de contraseña a cadena antes de comparar
        return storedPassword.equals(String.valueOf(enteredPassword));
    }

    private static void openCatalogWindow(Properties properties) {
        JFrame catalogFrame = new JFrame("Catálogo de Películas");
        catalogFrame.setSize(800, 600);
        catalogFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        List<Movie> movies = new ArrayList<>();
        movies.add(new Movie("Interstellar", "interstellar.jpg"));
        movies.add(new Movie("Inception", "inception.jpg"));
        movies.add(new Movie("Minions", "minions.jpg"));
        movies.add(new Movie("Matrix", "matrix.jpg"));
        movies.add(new Movie("BeeMovie", "BeeMovie.jpg"));
       

        DefaultListModel<Movie> movieListModel = new DefaultListModel<>();
        for (Movie movie : movies) {
            movieListModel.addElement(movie);
        }

        JList<Movie> movieList = new JList<>(movieListModel);
        movieList.setCellRenderer(new MovieListRenderer());

        movieList.addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                Movie selectedMovie = movieList.getSelectedValue();
                new DescripcionPeliculas(selectedMovie.getName());
            }
        });

        catalogFrame.add(new JScrollPane(movieList));
        catalogFrame.setVisible(true);
    }

    static class MovieListRenderer extends DefaultListCellRenderer {
        @Override
        public Component getListCellRendererComponent(JList<?> list, Object value, int index,
                                                      boolean isSelected, boolean cellHasFocus) {
            JLabel label = (JLabel) super.getListCellRendererComponent(list, value, index, isSelected, cellHasFocus);

            Movie movie = (Movie) value;
            try {
                ImageIcon icon = new ImageIcon(LoginFrame.class.getResource(IMAGENES_PATH + movie.getImageName()));
                icon.setImage(icon.getImage().getScaledInstance(50, 70, Image.SCALE_DEFAULT));
                label.setIcon(icon);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return label;
        }
    }

    static class Movie {
        private String name;
        private String imageName;

        public Movie(String name, String imageName) {
            this.name = name;
            this.imageName = imageName;
        }

        public String getName() {
            return name;
        }

        public String getImageName() {
            return imageName;
        }

        @Override
        public String toString() {
            return name;
        }
    }

    private static void showRegistrationWindow(JFrame parentFrame, Properties properties) {
        // Configuración del JFrame
        JFrame registroFrame = new JFrame("Registro de Usuario");
        registroFrame.setSize(400, 250);
        registroFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        registroFrame.setLocationRelativeTo(parentFrame);

        // Creación de componentes
        JTextField nombreField = new JTextField(20);
        JTextField correoField = new JTextField(20);
        JPasswordField contraseniaField = new JPasswordField(20);
        JTextField paisField = new JTextField(20);
        JTextField metodoPagoField = new JTextField(20);

        JLabel nombreLabel = new JLabel("Nombre:");
        JLabel correoLabel = new JLabel("Correo Electrónico:");
        JLabel contraseniaLabel = new JLabel("Contraseña:");
        JLabel paisLabel = new JLabel("País:");
        JLabel metodoPagoLabel = new JLabel("Método de Pago:");

        JButton confirmarButton = new JButton("Confirmar");
        JButton cancelarButton = new JButton("Cancelar");

        // Configuración del layout
        registroFrame.setLayout(new BorderLayout());

        // Panel para los campos de registro
        JPanel inputPanel = new JPanel(new GridLayout(5, 2));
        inputPanel.add(nombreLabel);
        inputPanel.add(nombreField);
        inputPanel.add(correoLabel);
        inputPanel.add(correoField);
        inputPanel.add(contraseniaLabel);
        inputPanel.add(contraseniaField);
        inputPanel.add(paisLabel);
        inputPanel.add(paisField);
        inputPanel.add(metodoPagoLabel);
        inputPanel.add(metodoPagoField);

        // Panel para los botones de confirmar y cancelar
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(confirmarButton);
        buttonPanel.add(cancelarButton);

        // Agregar componentes al JFrame
        registroFrame.add(inputPanel, BorderLayout.CENTER);
        registroFrame.add(buttonPanel, BorderLayout.SOUTH);

        // Configuración del ActionListener para el botón de confirmar
        confirmarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Verificar que todos los campos estén llenos y que el correo sea válido
                if (validateRegistrationFields(nombreField, correoField, contraseniaField, paisField, metodoPagoField)) {
                    // Obtener nuevos valores de usuario, correo, contraseña, país y método de pago
                    String nuevoNombre = nombreField.getText();
                    String nuevoCorreo = correoField.getText();
                    char[] nuevaContrasenia = contraseniaField.getPassword();
                    String nuevoPais = paisField.getText();
                    String nuevoMetodoPago = metodoPagoField.getText();

                    // Guardar el nuevo usuario y sus datos en el archivo config.properties
                    try {
                        properties.setProperty(nuevoNombre, String.valueOf(nuevaContrasenia));
                        properties.setProperty(nuevoNombre + "_email", nuevoCorreo);
                        properties.setProperty(nuevoNombre + "_pais", nuevoPais);
                        properties.setProperty(nuevoNombre + "_metodo_pago", nuevoMetodoPago);
                        properties.store(new FileOutputStream("config.properties"), null);
                        JOptionPane.showMessageDialog(registroFrame, "Usuario registrado con éxito");
                        // Cerrar la ventana de registro
                        registroFrame.dispose();
                    } catch (IOException ex) {
                        ex.printStackTrace();
                        JOptionPane.showMessageDialog(registroFrame, "Error al guardar el usuario");
                    }
                }
            }
        });

        // Configuración del ActionListener para el botón de cancelar
        cancelarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Cerrar la ventana de registro
                registroFrame.dispose();
            }
        });

        // Hacer visible la ventana de registro
        registroFrame.setVisible(true);
    }

    private static boolean validateRegistrationFields(JTextField nombreField, JTextField correoField,
                                                      JPasswordField contraseniaField, JTextField paisField,
                                                      JTextField metodoPagoField) {
        String nombre = nombreField.getText();
        String correo = correoField.getText();
        char[] contrasenia = contraseniaField.getPassword();
        String pais = paisField.getText();
        String metodoPago = metodoPagoField.getText();

        if (nombre.isEmpty() || correo.isEmpty() || contrasenia.length == 0 || pais.isEmpty() || metodoPago.isEmpty()) {
            JOptionPane.showMessageDialog(nombreField, "Por favor, complete todos los campos.");
            return false;
        }

        // Validar el formato del correo electrónico
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(correo);

        if (!matcher.matches()) {
            JOptionPane.showMessageDialog(correoField, "Ingrese un correo electrónico válido.");
            return false;
        }

        // Puedes agregar más validaciones según tus requisitos

        return true;
    }
}
