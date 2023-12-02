import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class DescripcionPeliculas extends JFrame {
    public DescripcionPeliculas(String movieTitle) {
        // Simulación de datos de la película (puedes personalizar esto según tus necesidades)
        String genre = "Acción";
        int releaseYear = 2022;
        String description = "Esta es una emocionante película de acción que te mantendrá al borde de tu asiento.";
        int duration = 120; // en minutos
        String director = "John Director";
        double rating = 4.5;
        String availableLanguages = "Inglés, Español";

        // Crear y mostrar la ventana con la descripción detallada de la película
        JFrame descriptionFrame = new JFrame("Descripción de la Película: " + movieTitle);
        descriptionFrame.setSize(600, 400);
        descriptionFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);  // Cerrar solo esta ventana al salir

        // Crear componentes para mostrar la información detallada
        JTextArea detailsTextArea = new JTextArea();
        detailsTextArea.append("Título: " + movieTitle + "\n");
        detailsTextArea.append("Género: " + genre + "\n");
        detailsTextArea.append("Año de lanzamiento: " + releaseYear + "\n");
        detailsTextArea.append("Descripción: " + description + "\n");
        detailsTextArea.append("Duración: " + duration + " minutos\n");
        detailsTextArea.append("Director: " + director + "\n");
        detailsTextArea.append("Clasificación: " + rating + "\n");
        detailsTextArea.append("Idiomas disponibles: " + availableLanguages + "\n");

        // Panel de desplazamiento para la información detallada
        JScrollPane scrollPane = new JScrollPane(detailsTextArea);

        // Crear botones
        JButton watchButton = new JButton("Empezar a ver");
        JButton backButton = new JButton("Regresar");

        // Configurar el layout
        descriptionFrame.setLayout(new BorderLayout());

        // Agregar componentes a la ventana
        descriptionFrame.add(scrollPane, BorderLayout.CENTER);

        // Panel para los botones
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(watchButton);
        buttonPanel.add(backButton);
        descriptionFrame.add(buttonPanel, BorderLayout.SOUTH);

        // Configurar el manejador de eventos para el botón de regresar
        backButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                descriptionFrame.dispose();  // Cerrar la ventana de descripción al hacer clic en "Regresar"
            }
        });

        // Configurar el manejador de eventos para el botón de empezar a ver
        watchButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(descriptionFrame, "¡Disfruta de la película!");
                descriptionFrame.dispose();  // Cerrar la ventana de descripción después de hacer clic en "Empezar a ver"
            }
        });

        // Mostrar la nueva ventana
        descriptionFrame.setVisible(true);
    }
}
